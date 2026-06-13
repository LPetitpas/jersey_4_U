import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
const CATEGORIES = ["Hockey", "Soccer", "Basketball", "Football", "Baseball","Formule1"]
const COULEURS = {
    Hockey: "#3b82f6",
    Soccer: "#22c55e",
    Basketball: "#f97316",
    Football: "#a855f7",
    Baseball: "#ef4444",
    Formule1: "#ffff00"
}
function Nav() {
    const location = useLocation()
    const navigate = useNavigate()
    const [hover, setHover] = useState(false)

    function allerCategorie(cat) {
        navigate(`/jersey?categorie=${cat}`)
        setHover(false)
    }
    return (
        <>
            <nav className="bg-black border-b border-zinc-800 px-10 h-16 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <span className="text-white font-black text-lg uppercase tracking-widest">
                        Jersey 4 U
                    </span>
                    <span className="text-white border border-white text-xs font-bold tracking-widest px-2 py-0.5 uppercase">
                        MTL
                    </span>
                </div>

                <div className="flex items-center gap-1">
                    <Link
                        to='/'
                        className={`text-xs font-bold uppercase tracking-widest px-4 py-2 border transition-all duration-150 ${location.pathname === '/'
                            ? 'bg-white text-black border-white'
                            : 'text-zinc-500 border-transparent hover:bg-white hover:text-black hover:border-white'
                            }`}
                    >
                        Home
                    </Link>
                    {/* Chandails avec dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                    >
                        <Link
                            to='/jersey'
                            className={`text-xs font-bold uppercase tracking-widest px-4 py-2 border transition-all duration-150 inline-block ${location.pathname === '/jersey'
                                ? 'bg-white text-black border-white'
                                : 'text-zinc-500 border-transparent hover:bg-white hover:text-black hover:border-white'
                                }`}
                        >
                            Chandails
                        </Link>

                        {hover && (
                            <div className="absolute top-full left-0 bg-zinc-950 border border-zinc-800 min-w-44 flex flex-col z-50">
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => allerCategorie(cat)}
                                        className="text-zinc-500 hover:text-white hover:bg-zinc-900 text-xs font-bold uppercase tracking-widest px-4 py-3 border-b border-zinc-900 flex items-center gap-3 transition-colors duration-150 text-left"
                                    >
                                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: COULEURS[cat] }}></span>
                                        {cat}
                                    </button>
                                ))}
                                <button
                                    onClick={() => { navigate('/jersey'); setHover(false) }}
                                    className="text-white hover:bg-zinc-900 text-xs font-bold uppercase tracking-widest px-4 py-3 flex items-center gap-3 transition-colors duration-150 border-t border-zinc-800"
                                >
                                    Tout voir
                                </button>
                            </div>
                        )}
                    </div>

                    <Link
                        to='/infos'
                        className={`text-xs font-bold uppercase tracking-widest px-4 py-2 border transition-all duration-150 ${location.pathname === '/infos'
                            ? 'bg-white text-black border-white'
                            : 'text-zinc-500 border-transparent hover:bg-white hover:text-black hover:border-white'
                            }`}
                    >
                        Infos
                    </Link>
                    <Link
                        to='/jersey'
                        className="ml-3 bg-white text-black text-xs font-black uppercase tracking-widest px-5 py-2 border border-white hover:bg-transparent hover:text-white transition-all duration-150"
                    >
                        Shop Now
                    </Link>
                </div>



                
            </nav>

        </>


    )






}
export default Nav




