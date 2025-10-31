export default function SkeletonCard() {
    return (
        <div className="overflow-hidden rounded-t-lg bg-[#1a1722]/60">
            <div className="flex h-96 flex-col justify-between">
                <div className="h-12 w-full animate-pulse rounded-t-lg bg-[#2a2633]"></div>
                <div className="bg-black/50">
                    <div className="flex items-center justify-center gap-2 p-3">
                        <div className="h-6 w-1/2 animate-pulse rounded bg-[#2a2633]"></div>
                        <div className="h-4 w-4 animate-pulse rounded-full bg-[#2a2633]"></div>
                    </div>
                    <div className="m-2 h-10 animate-pulse rounded-md bg-[#2a2633]"></div>
                </div>
            </div>
            <div className="flex w-full overflow-hidden rounded-b-lg">
                <div className="h-12 w-1/2 animate-pulse bg-gradient-to-r from-[#2a2633] via-[#3b3746] to-[#2a2633]"></div>
                <div className="h-12 w-1/2 animate-pulse bg-gradient-to-r from-[#2a2633] via-[#3b3746] to-[#2a2633]"></div>
            </div>
        </div>
    );
}
