import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";

export default function Pagination({ totalPages, page, dispatch }) {
    let pages = [];
    for (let i = -1; i < 2; i++) {
        const actualPageNumber = page + i;
        if (actualPageNumber < 0 || actualPageNumber >= totalPages) continue;
        pages.push(actualPageNumber);
    }

    return (
        <div className="flex w-full items-stretch justify-center gap-3">
            <button
                onClick={() => dispatch({ type: "SET_PAGE", payload: 0 })}
                className="cursor-pointer rounded-lg bg-gradient-to-r from-[#6C2BD9] to-[#1FC7FF] bg-[length:200%_200%] px-4 py-2 text-xl font-bold shadow-lg transition-all duration-500 ease-out hover:scale-[1.03] hover:bg-right-bottom hover:shadow-xl"
            >
                <ChevronsLeft size={36} className="text-white" />
            </button>
            <button
                onClick={() => {
                    if (page > 0) {
                        dispatch({ type: "SET_PAGE", payload: page - 1 });
                    } else {
                        dispatch({ type: "SET_PAGE", payload: 0 });
                    }
                }}
                className="cursor-pointer rounded-lg bg-gradient-to-r from-[#6C2BD9] to-[#1FC7FF] bg-[length:200%_200%] px-4 py-2 text-xl font-bold shadow-lg transition-all duration-500 ease-out hover:scale-[1.03] hover:bg-right-bottom hover:shadow-xl"
            >
                <ChevronLeft size={36} className="text-white" />
            </button>
            <div className="flex flex-1 items-stretch justify-center gap-2">
                {pages.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() =>
                            dispatch({ type: "SET_PAGE", payload: pageNumber })
                        }
                        className={`cursor-pointer rounded-lg px-5 py-2 text-center text-xl font-bold text-white transition-all duration-300 ease-out ${
                            pageNumber === page
                                ? "bg-gradient-to-r from-[#6FCF97] via-[#27AE60] to-[#219653] shadow-lg shadow-green-400/50 hover:scale-[1.05] hover:brightness-110"
                                : "bg-gradient-to-r from-[#FF7F50] via-[#FFA94D] to-[#FFD56B] bg-[length:200%_200%] hover:scale-[1.03] hover:bg-right-bottom"
                        }`}
                    >
                        {pageNumber + 1}
                    </button>
                ))}
            </div>
            <button
                onClick={() => {
                    if (page < totalPages - 1) {
                        dispatch({ type: "SET_PAGE", payload: page + 1 });
                    } else {
                        dispatch({ type: "SET_PAGE", payload: totalPages - 1 });
                    }
                }}
                className="cursor-pointer rounded-lg bg-gradient-to-r from-[#6C2BD9] to-[#1FC7FF] bg-[length:200%_200%] px-4 py-2 text-xl font-bold shadow-lg transition-all duration-500 ease-out hover:scale-[1.03] hover:bg-right-bottom hover:shadow-xl"
            >
                <ChevronRight size={36} className="text-white" />
            </button>
            <button
                onClick={() =>
                    dispatch({ type: "SET_PAGE", payload: totalPages - 1 })
                }
                className="cursor-pointer rounded-lg bg-gradient-to-r from-[#6C2BD9] to-[#1FC7FF] bg-[length:200%_200%] px-4 py-2 text-xl font-bold shadow-lg transition-all duration-500 ease-out hover:scale-[1.03] hover:bg-right-bottom hover:shadow-xl"
            >
                <ChevronsRight size={36} className="text-white" />
            </button>
        </div>
    );
}
