import type {Metadata} from 'next';
import {Space_Mono} from 'next/font/google';
import './globals.css';

const spaceMono = Space_Mono({
    variable: '--font-space-mono',
    weight: ['400', '700'],
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'A Tip Calculator App',
    description: 'A tip calculator app with unit testing.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${spaceMono.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}
