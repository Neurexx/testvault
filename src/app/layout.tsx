// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
import { Manrope, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import QueryProvider from "@/context/QueryClientProvider";

const fontBody=Inter({subsets: ["latin"],variable:"--font-body"})
const fontHeading=Inter({subsets: ["latin"],variable:"--font-heading"})


// const fontHeading = Inter({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-heading",
// });

// const fontBody = Inter({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-body",
// });

//@ts-ignore
export default function Layout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn("antialiased", fontHeading.variable, fontBody.variable)}
      >
        <ThemeProvider attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange>
          <AuthProvider>
            <QueryProvider>{children}</QueryProvider>
            </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
