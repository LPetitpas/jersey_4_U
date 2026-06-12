
import { Link } from "react-router-dom"

function Main() {
    return (
        <main className="flex-1 bg-black">
            {/* Hero */}
            <section className="px-10 pt-24 pb-20 border-b border-zinc-800">
                <p className="text-zinc-600 text-xs font-semibold uppercase tracking-[0.3em] mb-6">
                    Collection — 2025
                </p>
                <h1 className="text-white font-black uppercase text-7xl md:text-9xl leading-none tracking-tight mb-10">
                    Des maillots<br />
                    <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>
                        uniques
                    </span>
                </h1>
                <Link
                    to='/jersey'
                    className="inline-block px-10 py-4 bg-white text-black font-black text-sm uppercase tracking-widest hover:bg-black hover:text-white hover:outline hover:outline-1 hover:outline-white transition-all duration-200"
                >
                    Voir les chandails →
                </Link>
            </section>

            {/* Ticker */}
            <div className="bg-zinc-950 border-b border-zinc-800 py-4 overflow-hidden">
                <p className="text-zinc-700 text-xs font-semibold uppercase tracking-[0.4em] whitespace-nowrap">
                    STREETWEAR &nbsp;·&nbsp; HOCKEY &nbsp;·&nbsp; SOCCER &nbsp;·&nbsp; BASKETBALL &nbsp;·&nbsp; ÉDITION LIMITÉE &nbsp;·&nbsp; STREETWEAR &nbsp;·&nbsp; HOCKEY &nbsp;·&nbsp; SOCCER
                </p>
            </div>
        </main>
    )
}

export default Main