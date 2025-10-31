import Image from "next/image";

export default function Footer() {
    return (
        <footer className="relative z-10 overflow-hidden rounded-t-4xl p-6 text-center text-lg text-white/85 shadow-md ring-1 ring-[#3B6AF7]">
            <Image
                src="/agals_banner.jpg"
                alt="agalS Banner"
                fill
                className="object-cover opacity-10"
            />
            <div className="relative z-20 font-bold">
                Ramazan &quot;agalS&quot; Bodur tarafından ❤️&apos;le
                geliştirildi
            </div>
        </footer>
    );
}
