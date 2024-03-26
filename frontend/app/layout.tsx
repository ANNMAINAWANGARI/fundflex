import type { Metadata } from "next";
import { Roboto,Roboto_Mono,Inter, Pacifico } from 'next/font/google'
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  weight: '500',
 subsets: ['latin'],
 style: 'normal',
})
const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'FundFlex | DeFi',
  description: 'FundFlex is a p2p lending protocol where users can lend/borrow assets.'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       
      <body className="bg-gray-200">
        {children}</body>
    </html>
  );
}
