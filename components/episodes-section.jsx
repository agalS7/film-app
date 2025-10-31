"use client";

import { useState } from "react";
import Image from "next/image";
import Star from "./star";

export default function EpisodesSection({ seasons }) {
    const [selectedSeason, setSelectedSeason] = useState(
        Object.keys(seasons)[0],
    );

    return (
        <div className="mt-4 p-8">
            <h2 className="text-4xl font-bold">Bölümler</h2>
            <div className="flex flex-wrap items-center gap-4 p-4">
                {Object.keys(seasons).map((season) => (
                    <button
                        key={season}
                        onClick={() => setSelectedSeason(season)}
                        className="cursor-pointer rounded-full px-4 py-0.5 text-lg font-bold ring-1 ring-[#6C2BD9] transition duration-300 hover:bg-[#6C2BD9]"
                    >
                        Sezon {season}
                    </button>
                ))}
            </div>
            <div className="mt-4 p-4">
                <h3 className="text-2xl font-bold">
                    Sezon {selectedSeason} Bölümleri
                </h3>
                <div className="flex flex-col divide-y divide-gray-600/30">
                    {seasons[selectedSeason] &&
                        seasons[selectedSeason].map((episode) => (
                            <div
                                key={episode.id}
                                className="flex flex-col items-center py-2 sm:flex-row"
                            >
                                <div className="relative h-28 w-50 shrink-0">
                                    <Image
                                        src={
                                            episode.image
                                                ? episode.image.original
                                                : "/placeholder.svg"
                                        }
                                        alt={episode.name}
                                        fill
                                        className="rounded-lg object-cover"
                                    />
                                </div>
                                <div className="ml-4 flex flex-col">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-lg font-bold">
                                            S{episode.season}.E{episode.number}{" "}
                                            ∙ {episode.name}
                                        </h4>
                                        <p className="text-sm text-gray-400">
                                            {episode.airdate}
                                        </p>
                                    </div>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: episode.summary,
                                        }}
                                        className="line-clamp-2 text-gray-200"
                                    />
                                    <div className="mt-1 flex max-w-fit items-center gap-1 rounded-full px-2 py-1 text-sm font-bold shadow-md ring-1 ring-[#3B6AF7]">
                                        <Star filled={true} size={16} />
                                        {episode.rating.average
                                            ? episode.rating.average
                                            : "?"}{" "}
                                        / 10
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
