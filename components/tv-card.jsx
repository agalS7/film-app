import Image from "next/image";
import Star from "./star";
import { Globe, Dna } from "lucide-react";
import Link from "next/link";

export default function TvCard({ show, isWatchlist, dispatch }) {
    const handleWatchlist = () => {
        if (isWatchlist) {
            dispatch({
                type: "REMOVE_WATCHLIST",
                payload: show.id,
            });
        } else {
            dispatch({
                type: "ADD_WATCHLIST",
                payload: show,
            });
        }
    };

    return (
        <div className="overflow-hidden rounded-t-lg shadow-md backdrop-blur-sm">
            <div className="relative flex h-96 flex-col justify-between">
                <Image
                    src={show.image ? show.image.original : "/placeholder.svg"}
                    alt={show.name}
                    fill
                    className="-z-10"
                />
                <div className="flex items-center justify-center gap-2 bg-black/90 p-3">
                    <h2 className="line-clamp-1 text-center text-lg font-bold">
                        {show.name}
                    </h2>
                    <div className="flex items-center gap-1 rounded-full px-2 py-1 text-sm font-bold shadow-md ring-1 ring-[#6C2BD9]">
                        <Star filled={true} size={16} />
                        {show.rating.average ? show.rating.average : "?"}
                    </div>
                </div>
                <div className="bg-black/70">
                    <div className="flex flex-wrap items-center gap-2 p-2">
                        {show.genres.map((genre) => (
                            <div
                                key={genre}
                                className="flex items-center gap-1 rounded-full px-1.5 py-0.5 text-sm shadow-md ring-1 ring-[#3B6AF7]"
                            >
                                <Dna size={16} className="text-[#3B6AF7]" />
                                {genre}
                            </div>
                        ))}
                        {show.language && (
                            <div className="flex items-center gap-1 rounded-full px-1.5 py-0.5 text-sm shadow-md ring-1 ring-[#1FC7FF]">
                                <Globe size={16} className="text-[#1FC7FF]" />
                                {show.language}
                            </div>
                        )}
                    </div>
                    <div
                        dangerouslySetInnerHTML={{ __html: show.summary }}
                        className="mx-2 my-1 line-clamp-2 text-sm"
                    />
                </div>
            </div>
            <div className="flex w-full overflow-hidden rounded-b-lg">
                <Link
                    href={`/${show.id}`}
                    className="w-1/2 bg-gradient-to-r from-[#6C2BD9] via-[#3B6AF7] to-[#1FC7FF] bg-[length:200%_200%] p-2 text-center text-lg font-bold text-white transition-all duration-500 ease-out hover:scale-[1.03] hover:bg-right-bottom"
                >
                    Detay
                </Link>
                <button
                    className={`w-1/2 cursor-pointer p-2 text-center text-lg font-bold text-white transition-all duration-300 ease-out ${
                        isWatchlist
                            ? "bg-gradient-to-r from-[#6FCF97] via-[#27AE60] to-[#219653] shadow-lg shadow-green-400/50 hover:scale-[1.05] hover:brightness-110"
                            : "bg-gradient-to-r from-[#FF7F50] via-[#FFA94D] to-[#FFD56B] bg-[length:200%_200%] hover:scale-[1.03] hover:bg-right-bottom"
                    }`}
                    onClick={handleWatchlist}
                >
                    {isWatchlist ? "Gösterimde" : "Gös. Ekle"}
                </button>
            </div>
        </div>
    );
}
