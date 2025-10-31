"use client";

import { useState, useId } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Star from "@/components/star";

const animatedComponents = makeAnimated();
const stars = Array.from({ length: 10 }, (_, i) => i);
const selectClasses = {
    container: () => "group",
    control: ({ isFocused, menuIsOpen }) =>
        `!transition-all !duration-300 bg-[#1A1A27] px-4 py-2 rounded-2xl hover:bg-[#1A1A27]/80 backdrop-blur-sm ${isFocused ? "ring-2 ring-[#3B6AF7]" : ""} ${menuIsOpen ? "rounded-b-none" : ""}`,
    menu: () =>
        `bg-[#1A1A27] hover:bg-[#1A1A27]/80 rounded-b-xl shadow-md border-t-2 border-[#3B6AF7] p-2 mt-2 animate-slide-from-bottom backdrop-blur-sm`,
    menuList: () => "flex flex-col gap-1",
    dropdownIndicator: ({ isFocused }) =>
        `opacity-50 group-hover:opacity-100 !transition-opacity !duration-300 ${isFocused ? "opacity-100" : ""}`,
    clearIndicator: () =>
        `opacity-50 hover:opacity-100 !transition-opacity !duration-300 cursor-pointer`,
    indicatorSeparator: () => "bg-slate-700/60 mx-2",
    option: ({ isFocused, isSelected }) =>
        `relative py-2 pr-2 pl-10 rounded-md !cursor-pointer !transition-all !duration-300
        before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:size-5 before:rounded-full before:!transition-all 
        ${isFocused ? "bg-black/50" : ""} 
        ${
            isSelected
                ? "bg-black/50 font-bold before:bg-white before:flex before:items-center before:justify-center before:text-black before:text-[10px] before:content-['✔']"
                : "before:border before:border-gray-400 before:content-['']"
        }`,
    multiValue: () =>
        "bg-black/50 rounded-md px-2 py-1 flex gap-2 border-1 border-[#3B6AF7]/40",
    multiValueRemove: () =>
        "text-white/50 hover:text-white cursor-pointer hover:bg-[#6C2BD9]/40 rounded-md px-1 transition-all duration-200",
    valueContainer: () => "flex flex-wrap gap-1.5",
};

export default function Filters({
    filters,
    dispatch,
    allGenres,
    allLanguages,
}) {
    const genreInstanceId = useId();
    const languageInstanceId = useId();
    const [hoverRating, setHoverRating] = useState(null);

    return (
        <div className="flex flex-col gap-4">
            <Select
                instanceId={genreInstanceId}
                closeMenuOnSelect={false}
                components={animatedComponents}
                value={filters.genres.map((genre) =>
                    allGenres.find((d) => d.value === genre),
                )}
                onChange={(e) =>
                    e
                        ? dispatch({
                              type: "SET_FILTERS",
                              payload: {
                                  ...filters,
                                  genres: e.map((d) => d.value),
                              },
                          })
                        : dispatch({
                              type: "SET_FILTERS",
                              payload: { ...filters, genres: [] },
                          })
                }
                isMulti
                placeholder="Tür(leri) seçin..."
                noOptionsMessage={() => "Tür bulunamadı"}
                options={allGenres}
                classNames={selectClasses}
                unstyled
            />
            <Select
                instanceId={languageInstanceId}
                components={animatedComponents}
                value={
                    filters.language === "all"
                        ? null
                        : allLanguages.find((d) => d.value === filters.language)
                }
                onChange={(e) =>
                    e
                        ? dispatch({
                              type: "SET_FILTERS",
                              payload: { ...filters, language: e.value },
                          })
                        : dispatch({
                              type: "SET_FILTERS",
                              payload: { ...filters, language: "all" },
                          })
                }
                placeholder="Dil seçin..."
                noOptionsMessage={() => "Dil bulunamadı"}
                options={allLanguages}
                isClearable
                classNames={selectClasses}
                unstyled
            />
            <div className="flex flex-wrap items-center justify-center">
                {stars.map((star) => (
                    <button
                        key={star}
                        onClick={() =>
                            dispatch({
                                type: "SET_FILTERS",
                                payload: { ...filters, minimumRating: star },
                            })
                        }
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="cursor-pointer px-0.5"
                    >
                        <Star
                            filled={
                                hoverRating !== null
                                    ? star <= hoverRating
                                    : star <= filters.minimumRating
                            }
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
