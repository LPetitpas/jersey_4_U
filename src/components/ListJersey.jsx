
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import JerseyCard from "./JerseyCard"
import { supabase } from "../supabaseClient"
import { Link, useLocation, useNavigate } from "react-router-dom"




const CATEGORIES = ["Hockey", "Soccer", "Basketball", "Football", "Baseball", "Formule1"]
const COULEURS = {
    Hockey: "#3b82f6",
    Soccer: "#22c55e",
    Basketball: "#f97316",
    Football: "#a855f7",
    Baseball: "#ef4444",
    Formule1: "#ffff00"
}

function ListJersey() {
    const [jersey, setJersey] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [searchParams] = useSearchParams()
    const categorie = searchParams.get("categorie")
    const location = useLocation()
    const navigate = useNavigate()
    const [hover, setHover] = useState(false)

    function allerCategorie(cat) {
        navigate(`/jersey?categorie=${cat}`)
        setHover(false)
    }
    useEffect(() => {
        async function fetchJersey() {
            setLoading(true)
            let query = supabase.from("jersey").select("*")
            if (categorie) query = query.eq("categorie", categorie)
            const { data, error } = await query
            if (error) console.error(error)
            else setJersey(data)
            setLoading(false)
        }
        fetchJersey()
    }, [categorie])

    const filtered = jersey.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <main className="flex-1 bg-black min-h-screen px-10 py-12">
           


            <div className="border-b border-zinc-800 pb-10 mb-10">
                <p className="text-zinc-600 text-xs font-bold uppercase tracking-[0.35em] mb-3">
                    Inventaire
                </p>
                <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-white font-black uppercase text-5xl tracking-tight">
                        {categorie ? categorie : "Chandails"}
                    </h2>
                    {categorie && (
                        <span className="w-3 h-3 rounded-full mt-2" style={{ background: COULEURS[categorie] }}></span>
                    )}
                </div>

                {/* Barre de recherche */}
                <div className="flex items-center border border-zinc-700 max-w-xl focus-within:border-white transition-colors duration-200">
                    <span className="px-4 text-zinc-500 text-lg select-none">⌕</span>
                    <input
                        type="text"
                        placeholder="Rechercher un chandail..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 bg-transparent border-none outline-none text-white text-xs font-bold uppercase tracking-widest py-4 placeholder:text-zinc-600"
                    />
                </div>
            </div>
             <div className="flex flex-wrap gap-2 mb-10">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => allerCategorie(cat)}
                        className={`flex items-center gap-2 px-4 py-2 border text-xs font-bold uppercase tracking-widest transition-all duration-150 ${categorie === cat
                                ? 'border-white text-black bg-white'
                                : 'border-zinc-700 text-zinc-500 hover:border-white hover:text-white'
                            }`}
                    >
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: COULEURS[cat] }}></span>
                        {cat}
                    </button>
                ))}
                {categorie && (
                    <button
                        onClick={() => navigate('/jersey')}
                        className="px-4 py-2 border border-zinc-800 text-zinc-600 hover:text-white hover:border-white text-xs font-bold uppercase tracking-widest transition-all duration-150"
                    >
                        ✕ Tout voir
                    </button>
                )}
            </div>

            {loading ? (
                <p className="text-zinc-600 text-xs uppercase tracking-widest">Chargement...</p>
            ) : jersey.length === 0 ? (
                <p className="text-zinc-600 text-xs uppercase tracking-widest">Aucun chandail pour l'instant.</p>
            ) : filtered.length === 0 ? (
                <p className="text-zinc-600 text-xs uppercase tracking-widest">Aucun résultat pour "{search}".</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {filtered.map(jersey => (
                        <JerseyCard
                            key={jersey.id}
                            id={jersey.id}
                            src={jersey.src}
                            name={jersey.name}
                            prix={jersey.prix}
                        />
                    ))}
                </div>
            )}
        </main>
    )
}

export default ListJersey