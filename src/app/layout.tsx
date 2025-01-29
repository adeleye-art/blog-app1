// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/ui/provider";
import QueryClientProviderWrapper from "@/components/ui/queryClientProvider";
import Header from "@/components/Header";
import NewsletterSection from "@/components/NewsLetter";
import Footer from "@/components/Footer";
// import { ErrorBoundary } from "@/components/ErrorBoundary";

// Configure Geist Sans font
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
//   display: "swap",
// });

// // Configure Geist Mono font
// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
//   display: "swap",
// });

// Enhanced metadata configuration
export const metadata = {
  title: "Your App Name",
  description: "A brief description of your application",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ffffff",
  icons: {
    icon: "/favicon.ico",
  },
  // Open Graph metadata for better social sharing
  openGraph: {
    title: "Your App Name",
    description: "A brief description of your application",
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
  },
};

// Root layout component with TypeScript props
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className= "antialiased font-sans min-h-screen flex flex-col"
      >
          <QueryClientProviderWrapper>
            <Provider>
              <div className="">
                <Header />
                <main className="flex-grow">
                  {children}
                </main>
                <NewsletterSection />
                <Footer />
              </div>
            </Provider>
          </QueryClientProviderWrapper>
      </body>
    </html>
  );
}