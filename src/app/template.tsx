import { SiteFooter } from "@/components/site-footer";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-transition">
      {children}
      <SiteFooter />
    </div>
  );
}
