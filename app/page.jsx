import Footer from "@/components/footer";
import TvList from "@/components/tv-list";
import Starfield from "@/components/starfield";
import Header from "@/components/header";

export default function Home() {
    return (
        <div className="relative flex min-h-screen flex-col bg-[#0f0e15]/95 text-white/85">
            <Starfield />
            <Header />
            <div className="z-10 container mx-auto my-8 px-4 flex-1">
                <TvList />
            </div>
            <Footer />
        </div>
    );
}
