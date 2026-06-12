import { useState, useEffect } from "react"
import { supabase } from "../supabaseClient"

const MOT_DE_PASSE = "jersey4u2025"

function Admin() {
    const [connecte, setConnecte] = useState(false)
    const [mdp, setMdp] = useState("")
    const [erreur, setErreur] = useState("")
    const [jerseys, setJerseys] = useState([])
    const [form, setForm] = useState({ name: "", prix: "" })
    const [image, setImage] = useState(null)
    const [apercu, setApercu] = useState(null)
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (connecte) fetchJerseys()
    }, [connecte])

    async function fetchJerseys() {
        const { data } = await supabase.from("jersey").select("*")
        setJerseys(data || [])
    }

    function login() {
        if (mdp === MOT_DE_PASSE) {
            setConnecte(true)
            setErreur("")
        } else {
            setErreur("Mot de passe incorrect.")
        }
    }

    function handleImage(e) {
        const file = e.target.files[0]
        if (!file) return
        setImage(file)
        setApercu(URL.createObjectURL(file))
    }

    async function ajouterJersey() {
        if (!form.name || !form.prix || !image) {
            setMessage("Remplis tous les champs et choisis une image.")
            return
        }
        setLoading(true)
        setMessage("")

        // Upload image dans Supabase Storage
        const nomFichier = `${Date.now()}_${image.name}`
        const { error: uploadError } = await supabase.storage
            .from("jerseyBucket")
            .upload(nomFichier, image)

        if (uploadError) {
            setMessage("Erreur upload : " + uploadError.message)
            setLoading(false)
            return
        }

        // Récupérer l'URL publique
        const { data: urlData } = supabase.storage
            .from("jerseyBucket")
            .getPublicUrl(nomFichier)

        // Sauvegarder dans la base de données
        const { error } = await supabase.from("jersey").insert([{
            name: form.name,
            prix: parseInt(form.prix),
            src: urlData.publicUrl
        }])

        if (error) {
            setMessage("Erreur : " + error.message)
        } else {
            setMessage("Chandail ajouté !")
            setForm({ name: "", prix: "" })
            setImage(null)
            setApercu(null)
            fetchJerseys()
        }
        setLoading(false)
    }

    async function supprimerJersey(id) {
        await supabase.from("jersey").delete().eq("id", id)
        fetchJerseys()
    }

    if (!connecte) {
        return (
            <div className="bg-black min-h-screen flex items-center justify-center px-6">
                <div className="border border-zinc-800 p-10 w-full max-w-sm">
                    <p className="text-zinc-600 text-xs font-bold uppercase tracking-[0.3em] mb-4">Admin</p>
                    <h2 className="text-white font-black uppercase text-3xl tracking-tight mb-8">Connexion</h2>
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={mdp}
                        onChange={e => setMdp(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && login()}
                        className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 text-sm uppercase tracking-widest outline-none focus:border-white transition-colors mb-3"
                    />
                    {erreur && <p className="text-red-500 text-xs uppercase tracking-widest mb-3">{erreur}</p>}
                    <button
                        onClick={login}
                        className="w-full bg-white text-black font-black uppercase text-xs tracking-widest py-3 hover:bg-zinc-200 transition-colors"
                    >
                        Entrer
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-black min-h-screen px-10 py-12">
            <div className="border-b border-zinc-800 pb-6 mb-10">
                <p className="text-zinc-600 text-xs font-bold uppercase tracking-[0.3em] mb-2">Admin</p>
                <h2 className="text-white font-black uppercase text-5xl tracking-tight">Gestion des chandails</h2>
            </div>

            {/* Formulaire ajout */}
            <div className="border border-zinc-800 p-8 mb-12 max-w-lg">
                <p className="text-zinc-600 text-xs font-bold uppercase tracking-[0.3em] mb-6">Ajouter un chandail</p>
                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Nom du chandail"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="bg-zinc-950 border border-zinc-800 text-white px-4 py-3 text-sm tracking-wider outline-none focus:border-white transition-colors"
                    />
                    <input
                        type="number"
                        placeholder="Prix ($)"
                        value={form.prix}
                        onChange={e => setForm({ ...form, prix: e.target.value })}
                        className="bg-zinc-950 border border-zinc-800 text-white px-4 py-3 text-sm tracking-wider outline-none focus:border-white transition-colors"
                    />

                    {/* Upload image */}
                    <label className="border border-dashed border-zinc-700 hover:border-white transition-colors cursor-pointer flex flex-col items-center justify-center py-8 gap-3">
                        <span className="text-zinc-600 text-xs uppercase tracking-widest">
                            {image ? image.name : "Clique pour choisir une image"}
                        </span>
                        <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
                    </label>

                    {/* Aperçu */}
                    {apercu && (
                        <img src={apercu} alt="aperçu" className="w-full max-h-48 object-cover border border-zinc-800" />
                    )}

                    {message && (
                        <p className="text-zinc-400 text-xs uppercase tracking-widest">{message}</p>
                    )}

                    <button
                        onClick={ajouterJersey}
                        disabled={loading}
                        className="bg-white text-black font-black uppercase text-xs tracking-widest py-3 hover:bg-zinc-200 transition-colors disabled:opacity-50"
                    >
                        {loading ? "Envoi en cours..." : "Ajouter"}
                    </button>
                </div>
            </div>

            {/* Liste existante */}
            <p className="text-zinc-600 text-xs font-bold uppercase tracking-[0.3em] mb-6">Chandails existants</p>
            <div className="flex flex-col gap-3 max-w-lg">
                {jerseys.map(jersey => (
                    <div key={jersey.id} className="flex items-center justify-between border border-zinc-800 px-6 py-4">
                        <div className="flex items-center gap-4">
                            <img src={jersey.src} alt={jersey.name} className="w-12 h-12 object-cover border border-zinc-800" />
                            <div>
                                <p className="text-white font-bold text-sm uppercase tracking-widest">{jersey.name}</p>
                                <p className="text-zinc-600 text-xs">{jersey.prix}$</p>
                            </div>
                        </div>
                        <button
                            onClick={() => supprimerJersey(jersey.id)}
                            className="text-red-500 text-xs font-bold uppercase tracking-widest hover:text-red-400 transition-colors"
                        >
                            Supprimer
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Admin
