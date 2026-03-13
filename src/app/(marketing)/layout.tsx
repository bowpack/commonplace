import { Nav } from "@/components/landing/nav";
import { Footer } from "@/components/landing/footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-stone-50">
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
