import { Drama } from "lucide-react";
import Image from "next/image";

export default function WatchlistPanel({ watchlist, dispatch }) {
    return (
        <div className="sticky top-8 flex flex-col backdrop-blur-sm md:w-2/9">
            <div className="flex flex-col items-center justify-center gap-2 rounded-t-2xl border-t-2 border-[#3B6AF7] bg-[#09080d]/60 p-2 text-lg font-extrabold">
                Gösterime Girecekler
                <div className="flex items-center gap-2">
                    <div className="rounded-full px-4 py-0.5 text-sm ring-1 ring-[#6C2BD9] select-none">
                        {watchlist.length}
                    </div>
                    <button
                        onClick={() => dispatch({ type: "CLEAR_WATCHLIST" })}
                        className="cursor-pointer rounded-full px-4 py-0.5 text-sm ring-1 ring-[#6C2BD9] transition duration-300 hover:bg-[#6C2BD9]"
                    >
                        Listeyi Temizle
                    </button>
                </div>
            </div>
            <div className="flex-1 rounded-b-2xl bg-[#09080d]/60 p-2">
                {watchlist.length === 0 ? (
                    <div className="flex items-center justify-center gap-2 text-lg font-bold">
                        <Drama size={32} className="text-blue-400" />
                        Gösterim yok...
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        {watchlist.map((show) => (
                            <div
                                key={show.id}
                                className="flex flex-col gap-0.5"
                            >
                                <div className="relative grid h-16 w-full place-items-center overflow-hidden rounded-t-lg p-2 text-lg font-bold">
                                    <Image
                                        src={
                                            show.image
                                                ? show.image.original
                                                : "/placeholder.svg"
                                        }
                                        alt={show.name}
                                        fill
                                        className="-z-10 object-cover opacity-50"
                                    />
                                    <p className="line-clamp-1">{show.name}</p>
                                </div>
                                <button
                                    onClick={() =>
                                        dispatch({
                                            type: "REMOVE_WATCHLIST",
                                            payload: show.id,
                                        })
                                    }
                                    className="w-full cursor-pointer rounded-b-lg bg-gradient-to-r from-[#D92B6C] via-[#F73B6A] to-[#FF7E1F] bg-[length:200%_200%] p-2 text-center font-bold text-white transition-all duration-500 ease-out hover:bg-right-bottom"
                                >
                                    Kaldır
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
