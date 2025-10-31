import axios from "axios";
import { redirect } from "next/navigation";
import Starfield from "@/components/starfield";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import { Dna, Globe, Calendar, ChartNoAxesGantt } from "lucide-react";
import CastsSection from "@/components/casts-section";
import EpisodesSection from "@/components/episodes-section";

export async function generateMetadata({ params }) {
    const { show_id } = await params;

    let product = {};
    try {
        const res = await axios.get(`https://api.tvmaze.com/shows/${show_id}`);
        product = res.data;
    } catch (_) {}

    if (!product.id) {
        return {
            title: "???",
        };
    } else {
        return {
            title: product.name + " | Film Kulübü",
        };
    }
}

export default async function Show({ params }) {
    const { show_id } = await params;

    let product = {};
    try {
        const res = await axios.get(`https://api.tvmaze.com/shows/${show_id}`);
        product = res.data;
    } catch (_) {}

    if (!product.id) {
        redirect("/");
    }

    let casts = {};
    try {
        const res = await axios.get(
            `https://api.tvmaze.com/shows/${show_id}/cast`,
        );
        casts = res.data;
    } catch (_) {}

    let episodes = {};
    try {
        const res = await axios.get(
            `https://api.tvmaze.com/shows/${show_id}/episodes`,
        );
        episodes = res.data;
    } catch (_) {}

    const seasons = episodes.reduce((acc, episode) => {
        const { season } = episode;
        if (!acc[season]) {
            acc[season] = [];
        }
        acc[season].push(episode);
        return acc;
    }, {});

    return (
        <div className="relative flex min-h-screen flex-col bg-[#0f0e15]/95 text-white/85">
            <Starfield />
            <Header />
            <div className="z-10 container mx-auto my-8 flex flex-1 flex-col items-start gap-4 px-4 sm:flex-row">
                <div className="relative z-10 container mx-auto my-8 rounded-2xl bg-[#09080d]/60 shadow-md sm:w-7/9">
                    <div className="absolute -top-8 -left-8 h-112 w-72">
                        <div className="relative h-full w-full">
                            <Image
                                src={
                                    product.image
                                        ? product.image.original
                                        : "/placeholder.svg"
                                }
                                alt={product.name}
                                fill
                                className="z-30 hidden rounded-xl border-2 border-[#6C2BD9] object-cover opacity-90 md:block"
                            />
                        </div>
                    </div>
                    <div className="p-8 md:ml-72">
                        <h1 className="text-4xl font-extrabold text-white">
                            {product.name}
                        </h1>
                        <div className="mt-4 flex flex-col items-center gap-12 px-12 py-4 lg:flex-row">
                            <div className="flex flex-col items-center gap-1">
                                <div className="flex items-end gap-1">
                                    <span className="text-7xl">
                                        {product.rating.average
                                            ? product.rating.average
                                            : "?"}
                                    </span>
                                    <span className="text-sm text-gray-400">
                                        / 10
                                    </span>
                                </div>
                                <h4 className="text-sm text-gray-400">
                                    TVMaze Puanı
                                </h4>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <div className="flex items-end gap-1">
                                    <span className="text-7xl">
                                        {product.averageRuntime}
                                    </span>
                                    <span className="text-sm text-gray-400">
                                        {" "}
                                        dk
                                    </span>
                                </div>
                                <h4 className="text-sm text-gray-400">
                                    Ortalama Uzunluk
                                </h4>
                            </div>
                        </div>
                        <h4 className="mt-8 text-lg font-bold text-gray-300">
                            Özet
                        </h4>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: product.summary,
                            }}
                            className="mx-2 my-1 line-clamp-4 text-lg"
                        />
                    </div>
                    <CastsSection casts={casts} />
                    <EpisodesSection seasons={seasons} />
                </div>
                <div className="sticky top-8 mt-8 flex flex-col gap-4 rounded-2xl bg-[#09080d]/60 p-4 shadow-md sm:w-2/9">
                    <h4 className="text-sm font-bold text-gray-400">Türler</h4>
                    <div className="flex flex-wrap items-center gap-2 p-2">
                        {product.genres.map((genre) => (
                            <div
                                key={genre}
                                className="flex items-center gap-1 rounded-full px-1.5 py-0.5 text-sm shadow-md ring-1 ring-[#3B6AF7]"
                            >
                                <Dna size={16} className="text-[#3B6AF7]" />
                                {genre}
                            </div>
                        ))}
                    </div>
                    <h4 className="text-sm font-bold text-gray-400">Dil</h4>
                    <div className="flex flex-wrap items-center gap-2 p-2">
                        {product.language && (
                            <div className="flex items-center gap-1 rounded-full px-1.5 py-0.5 text-sm shadow-md ring-1 ring-[#1FC7FF]">
                                <Globe size={16} className="text-[#1FC7FF]" />
                                {product.language}
                            </div>
                        )}
                    </div>
                    <h4 className="text-sm font-bold text-gray-400">
                        Çıkış Tarihi
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 p-2">
                        {product.language && (
                            <div className="flex items-center gap-1 rounded-full px-1.5 py-0.5 text-sm shadow-md ring-1 ring-[#FF7E1F]">
                                <Calendar
                                    size={16}
                                    className="text-[#FF7E1F]"
                                />
                                {product.premiered}
                            </div>
                        )}
                    </div>
                    <h4 className="text-sm font-bold text-gray-400">
                        Bitiş Tarihi
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 p-2">
                        {product.language && (
                            <div className="flex items-center gap-1 rounded-full px-1.5 py-0.5 text-sm shadow-md ring-1 ring-[#D92B6C]">
                                <ChartNoAxesGantt
                                    size={16}
                                    className="text-[#D92B6C]"
                                />
                                {product.ended}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
