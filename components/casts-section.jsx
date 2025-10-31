"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function CastsSection({ casts }) {
    const scrollRef = useRef(null);

    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);

    const handleScroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = scrollRef.current.clientWidth * 0.8;

            if (direction === "left") {
                scrollRef.current.scrollBy({
                    left: -scrollAmount,
                    behavior: "smooth",
                });
            } else {
                scrollRef.current.scrollBy({
                    left: scrollAmount,
                    behavior: "smooth",
                });
            }
        }
    };

    const checkScrollPosition = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

            setIsAtStart(scrollLeft <= 0);
            setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
        }
    };

    useEffect(() => {
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            checkScrollPosition();

            scrollElement.addEventListener("scroll", checkScrollPosition);

            return () => {
                scrollElement.removeEventListener(
                    "scroll",
                    checkScrollPosition,
                );
            };
        }
    }, []);

    return (
        <div className="mt-8 p-8">
            <h2 className="text-4xl font-bold">Oyuncular</h2>
            <div className="group relative mt-4">
                {!isAtStart && (
                    <button
                        onClick={() => handleScroll("left")}
                        className="absolute top-1/2 left-4 z-50 -translate-y-1/2 cursor-pointer rounded-full bg-black/40 p-2 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 hover:bg-black/70"
                    >
                        <ChevronLeft size={24} className="text-white" />
                    </button>
                )}
                <div
                    className="scrollbar-hide mt-4 flex items-center gap-8 overflow-x-auto"
                    ref={scrollRef}
                >
                    {casts.map((cast) => (
                        <div
                            key={cast.person.id}
                            className="flex flex-col items-center gap-4"
                        >
                            <div className="relative h-48 w-36">
                                <Image
                                    src={
                                        cast.person.image
                                            ? cast.person.image.original
                                            : "/placeholder.svg"
                                    }
                                    alt={cast.person.name}
                                    fill
                                    className="rounded-lg object-cover"
                                />
                            </div>
                            <h4 className="line-clamp-1 text-gray-400">
                                {cast.person.name}
                            </h4>
                        </div>
                    ))}
                </div>
                {!isAtEnd && (
                    <button
                        onClick={() => handleScroll("right")}
                        className="absolute top-1/2 right-4 z-50 -translate-y-1/2 cursor-pointer rounded-full bg-black/40 p-2 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 hover:bg-black/70"
                    >
                        <ChevronRight size={24} className="text-white" />
                    </button>
                )}
            </div>
        </div>
    );
}
