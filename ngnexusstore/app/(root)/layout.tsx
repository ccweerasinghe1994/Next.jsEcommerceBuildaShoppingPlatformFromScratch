import Footer from "@/components/footer";
import Header from "@/components/ui/shared/header";
import { Toaster } from "@/components/ui/toaster";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1 wrapper">{children}</main>
      <Toaster />
      <Footer />
    </div>
  );
}
