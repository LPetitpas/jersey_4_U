import { useEffect } from "react"
import { useState } from "react"
import { supabase } from "../supabaseClient"
import { useParams } from "react-router"
import { Link } from "react-router"

function DetailJersey() {
    const [jersey, setJersey] = useState([])
    const [loading, setLoading] = useState(true)
    const {id} = useParams()
    
    useEffect(() => {
        async function fetchJersey() {
            const { data, error } = await supabase.from("jersey").select("*").eq('id',id).single()
            if (error) console.error(error)
            else setJersey(data)
            setLoading(false)
        }
        fetchJersey()
    }, [])

     if (!jersey) return <p>Chargement...</p>
   
     return (
        <main className="bg-black min-h-screen px-10 py-12">
            <div className="flex gap-12 max-w-5xl">
                
                <div className="w-80 flex-shrink-0">
                    <img
                        src={jersey.src}
                        alt={jersey.name}
                        className="w-full aspect-[3/4] object-cover border border-zinc-800"
                    />
                </div>
 
                
                <div className="flex-1 flex flex-col pt-2">
                   
 
                    <p className="text-zinc-600 text-xs font-bold uppercase tracking-[0.35em] mb-4">
                        Jersey 4 U — Collection 2025
                    </p>
                    <h1 className="text-white font-black uppercase text-4xl leading-none tracking-tight mb-3">
                        {jersey.name}
                    </h1>
                    <p className="text-white font-black text-3xl mb-8">
                        {jersey.prix}$
                    </p>
 
                    <hr className="border-zinc-800 mb-6" />
 
                    <p className="text-white text-xs font-bold uppercase tracking-[0.3em] mb-4">
                        Tailles disponibles
                    </p>
                    <div className="flex gap-2 flex-wrap mb-8">
                        {["S", "M", "L", "XL", "2XL", "3XL", "4XL"].map(taille => (
                            <div
                                key={taille}
                                className="w-12 h-12 border border-zinc-700 text-white text-xs font-bold flex items-center justify-center"
                            >
                                {taille}
                            </div>
                        ))}
                    </div>
 
                    <Link to={'/infos'} className="bg-white text-black font-black uppercase text-xs tracking-widest py-4 w-full border border-white hover:bg-transparent hover:text-white transition-all duration-150">
                        Contacter pour acheter
                    </Link>
                </div>
            </div>
        </main>
    )



    



}
export default DetailJersey