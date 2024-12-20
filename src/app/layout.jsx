
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionProviderWrapper>
        <body className={`flex flex-col min-h-screen ${inter.className}`}>
          <main className="p-4 ">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          </main>
          <Toaster />
        </body>
      </SessionProviderWrapper>
    </html>
  );
}
