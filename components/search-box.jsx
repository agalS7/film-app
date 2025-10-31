"use client";

export default function SearchBox({ searchQuery, handleSearch }) {
    return (
        <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Film ara..."
            className="w-full rounded-2xl bg-[#1A1A27] px-5 py-3 text-white placeholder-gray-400 shadow-md transition-all duration-300 outline-none hover:bg-[#1A1A27]/80 focus:ring-2 focus:ring-[#3B6AF7]"
        />
    );
}
