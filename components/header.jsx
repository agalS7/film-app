import Image from "next/image";
import Logo from "@/public/logo.png";
import Link from "next/link";

export default function Header() {
    return (
        <header className="z-10 mx-8 my-4 flex items-center gap-8">
            <div className="flex flex-1 items-center justify-center rounded-full bg-[#09080d]/70 px-16 py-2 shadow-md sm:justify-between">
                <Image
                    src={Logo}
                    alt="logo"
                    width={96}
                    className="hidden sm:block"
                />
                <Link
                    href="/"
                    className="rounded-full bg-gradient-to-r from-[#6C2BD9] via-[#3B6AF7] to-[#1FC7FF] bg-[length:200%_200%] px-4 py-2 text-xl font-bold shadow-lg transition-all duration-500 ease-out hover:scale-[1.03] hover:bg-right-bottom hover:shadow-xl"
                >
                    Ana Sayfa
                </Link>
            </div>
            <a href="https://github.com/agalS7/film-app" target="_blank">
                <Image src="/github.svg" alt="github" width={40} height={40} />
            </a>
        </header>
    );
}
