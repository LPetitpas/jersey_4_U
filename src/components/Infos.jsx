function Infos() {
    return (
        <div className="bg-black border-t border-zinc-800 px-10 py-12">
            <p className="text-zinc-600 text-xs font-bold uppercase tracking-[0.35em] mb-4">
                Contact
            </p>
            <h3 className="text-white font-black uppercase text-2xl tracking-widest mb-3">
                Pour renseignements & achats
            </h3>
            <a
                href="tel:4382203926"
                className="inline-block text-white font-black text-5xl tracking-tight border-b-2 border-white pb-1 mb-10 hover:text-zinc-400 hover:border-zinc-400 transition-colors duration-200"
            >
                (438) 220-3926
            </a>

            <hr className="border-zinc-800 mb-8" />

            <div className="flex items-center gap-2 mb-5">
                <span className="w-2 h-2 rounded-full bg-red-600 inline-block"></span>
                <p className="text-zinc-600 text-xs font-bold uppercase tracking-[0.3em]">
                    Sponsor officiel
                </p>
            </div>

            <div className="flex flex-col gap-4">
                <a
                    href="https://www.instagram.com/sportmontrealbenfica7/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 text-zinc-600 hover:text-white transition-colors duration-200 group"
                >
                    <span className="w-9 h-9 border border-zinc-800 group-hover:border-white flex items-center justify-center text-xs font-black uppercase tracking-widest transition-colors duration-200">
                        ig
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest">
                        @sportmontrealbenfica7 ↗
                    </span>
                </a>
                <a
                    href="https://www.instagram.com/atown.cityfc"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 text-zinc-600 hover:text-white transition-colors duration-200 group"
                >
                    <span className="w-9 h-9 border border-zinc-800 group-hover:border-white flex items-center justify-center text-xs font-black uppercase tracking-widest transition-colors duration-200">
                        ig
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest">
                        @atown.cityfc ↗
                    </span>
                </a>
            </div>
        </div>
    )
}

export default Infos