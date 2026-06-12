
function JerseyCard({ src, name, prix }) {
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-none group cursor-pointer hover:border-white transition-all duration-300">
            <div className="overflow-hidden aspect-square bg-zinc-950">
                <img
                    src={src}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div className="p-4 border-t border-zinc-800">
                <p className="text-zinc-400 text-xs uppercase tracking-widest font-semibold mb-1">{name}</p>
                <p className="text-white font-black text-lg">{prix}$</p>
            </div>
        </div>
    )
}
 
export default JerseyCard