import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    subsets: ["latin"],
});

export const metadata = {
    title: "Film Kulübü",
    description:
        "Web Teknolojileri ve Programlama dersi 3. ödevi için hazırlanmış olan Film Uygulaması",
};

export default function RootLayout({ children }) {
    return (
        <html lang="tr">
            <body className={`${geistSans.className} antialiased`}>
                {children}
            </body>
        </html>
    );
}
