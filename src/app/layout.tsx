import "@/styles/index.css";
import { Inter, Comfortaa, Lexend_Exa } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ 
	subsets: ["latin"],
	display: "auto",
	preload: true,
	variable: "--font-inter",
});

const comfortaa = Comfortaa({
	subsets: ["latin"],
	display: "auto",
	preload: true,
	variable: "--font-comfortaa",
});

const lexendExa = Lexend_Exa({
	subsets: ["latin"],
	display: "auto",
	preload: true,
	variable: "--font-lexend_exa",
})

export const metadata: Metadata = {
	title: "Activities App",
	description: "Activities managing app",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={`${inter.variable} ${comfortaa.variable} ${lexendExa.variable} ${comfortaa.className}`}>
			<body>
				{children}
			</body>
		</html>
	);
}