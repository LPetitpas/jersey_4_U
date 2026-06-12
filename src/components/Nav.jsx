import { Link, useLocation } from "react-router-dom"

function Nav() {
    const location = useLocation()

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
                        className={`text-xs font-bold uppercase tracking-widest px-4 py-2 border transition-all duration-150 ${
                            location.pathname === '/'
                                ? 'bg-white text-black border-white'
                                : 'text-zinc-500 border-transparent hover:bg-white hover:text-black hover:border-white'
                        }`}
                    >
                        Home
                    </Link>
                    <Link
                        to='/jersey'
                        className={`text-xs font-bold uppercase tracking-widest px-4 py-2 border transition-all duration-150 ${
                            location.pathname === '/jersey'
                                ? 'bg-white text-black border-white'
                                : 'text-zinc-500 border-transparent hover:bg-white hover:text-black hover:border-white'
                        }`}
                    >
                        Chandails
                    </Link>
                    <Link
                        to='/infos'
                        className={`text-xs font-bold uppercase tracking-widest px-4 py-2 border transition-all duration-150 ${
                            location.pathname === '/infos'
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

            {/* Ticker */}
            <div className="bg-zinc-950 border-b border-zinc-800 py-2 overflow-hidden">
                <div className="flex w-max animate-[ticker_20s_linear_infinite]">
                    {[1, 2].map(i => (
                        <span key={i} className="text-zinc-700 text-xs font-bold uppercase tracking-[0.35em] whitespace-nowrap pr-16">
                            STREETWEAR &nbsp;·&nbsp; HOCKEY &nbsp;·&nbsp; SOCCER &nbsp;·&nbsp; BASKETBALL &nbsp;·&nbsp; ÉDITION LIMITÉE &nbsp;·&nbsp; MONTRÉAL &nbsp;·&nbsp; STREETWEAR &nbsp;·&nbsp; HOCKEY &nbsp;·&nbsp; SOCCER &nbsp;·&nbsp; BASKETBALL &nbsp;·&nbsp; ÉDITION LIMITÉE &nbsp;·&nbsp; MONTRÉAL &nbsp;·&nbsp;
                        </span>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Nav