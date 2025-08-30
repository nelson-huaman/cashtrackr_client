import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from 'next/font/google';

const roboto = Roboto({
   subsets: ['latin'],
   weight: ['100', '300', '400', '500', '700', '900'],
   display: 'swap'
})

export const metadata: Metadata = {
   title: "CashTracks",
   description: "CashTracks",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body
            className={roboto.className}
         >
            {children}
         </body>
      </html>
   );
}