import { useEffect, useState } from "react"
import JerseyCard from "./JerseyCard"
import { supabase } from "../supabaseClient"

function ListJersey() {
    const [jersey, setJersey] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")

    useEffect(() => {
        async function fetchJersey() {
            const { data, error } = await supabase.from("jersey").select("*")
            if (error) console.error(error)
            else setJersey(data)
            setLoading(false)
        }
        fetchJersey()
    }, [])
    const filtered = jersey.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <main className="flex-1 bg-black min-h-screen px-10 py-12">
            <div className="border-b border-zinc-800 pb-6 mb-10">


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

                <p className="text-zinc-600 text-xs font-semibold uppercase tracking-[0.3em] mb-2">
                    Inventaire
                </p>
                <h2 className="text-white font-black uppercase text-5xl tracking-tight">
                    Chandails
                </h2>
            </div>

            {loading ? (
                <p className="text-zinc-600 text-xs uppercase tracking-widest">Chargement...</p>
            ) : jersey.length === 0 ? (
                <p className="text-zinc-600 text-xs uppercase tracking-widest">Aucun chandail pour l'instant.</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {filtered.map(jersey => (
                        <JerseyCard
                            key={jersey.id}
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