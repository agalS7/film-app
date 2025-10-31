"use client";

import axios from "axios";
import { useEffect, useReducer, useMemo, useEffectEvent } from "react";
import { useDebouncedCallback } from "use-debounce";
import { ShieldMinus, Clapperboard } from "lucide-react";
import filtersReducer, { DEFAULT_QUERY } from "@/lib/filtersReducer";
import showsReducer from "@/lib/showsReducer";
import watchlistReducer from "@/lib/watchlistReducer";
import SearchBox from "@/components/search-box";
import Filters from "@/components/filters";
import TvCard from "@/components/tv-card";
import WatchlistPanel from "@/components/watchlist-panel";
import Pagination from "@/components/pagination";
import SkeletonCard from "@/components/skeleton-card";

export default function TvList() {
    const [showsState, dispatchShows] = useReducer(showsReducer, {
        shows: [],
        page: 0,
        isLoading: false,
        isError: false,
    });
    const [filtersState, dispatchFilters] = useReducer(filtersReducer, {
        query: DEFAULT_QUERY,
        filters: {
            genres: [],
            language: "all",
            minimumRating: 0,
        },
    });
    const [watchlistState, dispatchWatchlist] = useReducer(watchlistReducer, {
        watchlist: [],
    });

    const getShows = async (search) => {
        dispatchShows({ type: "FETCH_INIT" });
        try {
            const res = await axios.get(
                `https://api.tvmaze.com/search/shows?q=${search}`,
            );
            dispatchShows({
                type: "FETCH_SUCCESS",
                payload: res.data,
            });
            dispatchFilters({
                type: "SET_FILTERS",
                payload: {
                    genres: [],
                    language: "all",
                    minimumRating: 0,
                },
            });
        } catch (_) {
            dispatchShows({
                type: "FETCH_FAILURE",
            });
        }
    };

    const reset = () => {
        dispatchFilters({
            type: "RESET",
        });
        getShows(DEFAULT_QUERY);
    };

    const showEvent = useEffectEvent(() => {
        getShows(filtersState.query);
    });

    useEffect(() => {
        showEvent();
        const localWatchlist = localStorage.getItem("watchlist");
        if (localWatchlist) {
            dispatchWatchlist({
                type: "SET_WATCHLIST",
                payload: JSON.parse(localWatchlist),
            });
        }
    }, []);

    const debounced = useDebouncedCallback(getShows, 1000);

    const handleSearch = (e) => {
        dispatchFilters({ type: "SET_QUERY", payload: e.target.value });
        debounced(e.target.value);
    };

    const allGenres = useMemo(
        () =>
            [...new Set(showsState.shows.flatMap((d) => d.show.genres))].map(
                (d) => ({ value: d, label: d }),
            ),
        [showsState.shows],
    );
    const allLanguages = useMemo(
        () =>
            [...new Set(showsState.shows.map((d) => d.show.language))].map(
                (d) => ({
                    value: d,
                    label: d,
                }),
            ),
        [showsState.shows],
    );

    const filteredShows = showsState.shows.filter((show) => {
        return (
            filtersState.filters.genres.every((genre) =>
                show.show.genres.includes(genre),
            ) &&
            (filtersState.filters.language === "all" ||
                filtersState.filters.language === show.show.language) &&
            (show.show.rating?.average >= filtersState.filters.minimumRating ||
                filtersState.filters.minimumRating === 0)
        );
    });

    const totalPages = Math.ceil(filteredShows.length / 6);
    const pageShows = filteredShows.slice(
        showsState.page * 6,
        showsState.page * 6 + 6,
    );

    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-start">
            <div className="sticky top-8 flex flex-col gap-4 rounded-2xl bg-[#09080d]/60 p-4 shadow-md backdrop-blur-sm md:w-2/9">
                <SearchBox
                    searchQuery={filtersState.query}
                    handleSearch={handleSearch}
                />
                <Filters
                    filters={filtersState.filters}
                    dispatch={dispatchFilters}
                    allGenres={allGenres}
                    allLanguages={allLanguages}
                />
                <button
                    onClick={reset}
                    className="w-full cursor-pointer rounded-2xl bg-gradient-to-r from-[#D92B6C] via-[#F73B6A] to-[#FF7E1F] bg-[length:200%_200%] px-4 py-2 text-xl font-bold shadow-lg transition-all duration-500 ease-out hover:scale-[1.03] hover:bg-right-bottom hover:shadow-xl"
                >
                    Sıfırla
                </button>
            </div>
            <div className="rounded-2xl bg-[#09080d]/60 p-4 shadow-md backdrop-blur-sm md:w-5/9">
                {showsState.isError ? (
                    <div className="flex items-center justify-center gap-2 text-lg font-bold">
                        <ShieldMinus size={32} className="text-red-500" />
                        Veriler çekilirken bir sorun oluştu...
                    </div>
                ) : showsState.isLoading ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                    </div>
                ) : filteredShows.length === 0 ? (
                    <div className="flex items-center justify-center gap-2 text-lg font-bold">
                        <Clapperboard size={32} className="text-blue-500" />
                        Herhangi bir dizi bulunamadı...
                    </div>
                ) : (
                    <>
                        <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
                            {pageShows.map((show) => (
                                <TvCard
                                    key={show.show.id}
                                    show={show.show}
                                    isWatchlist={watchlistState.watchlist.some(
                                        (w) => w.id === show.show.id,
                                    )}
                                    dispatch={dispatchWatchlist}
                                />
                            ))}
                        </div>
                        <Pagination
                            totalPages={totalPages}
                            page={showsState.page}
                            dispatch={dispatchShows}
                        />
                    </>
                )}
            </div>
            <WatchlistPanel
                watchlist={watchlistState.watchlist}
                dispatch={dispatchWatchlist}
            />
        </div>
    );
}
