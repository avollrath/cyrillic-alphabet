import { ReactNode } from "react";
import { SideNav } from "./SideNav";
import { TopNav } from "./TopNav";

type LayoutProps = {
  children: ReactNode;
  withSideNav?: boolean;
  footer?: boolean;
};

export function Layout({ children, withSideNav = false, footer = true }: LayoutProps) {
  return (
    <div className="min-h-screen bg-surface font-body text-on-surface">
      <TopNav />
      <div className={`pt-20 ${withSideNav ? "lg:flex" : ""}`}>
        {withSideNav ? <SideNav /> : null}
        <main className={`flex-1 px-6 py-8 ${withSideNav ? "lg:px-12" : ""}`}>{children}</main>
      </div>
      {footer ? (
        <footer className="w-full border-t border-slate-200/20 bg-[#f8f9fa] py-12">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-12 md:flex-row">
            <p className="text-xs uppercase tracking-widest text-slate-400">© 2024 Kognitive Galerie. Die Kunst der Sprache.</p>
            <div className="flex gap-8 text-xs uppercase tracking-widest text-slate-500">
              <a href="#">Datenschutz</a>
              <a href="#">Impressum</a>
              <a href="#">Support</a>
            </div>
          </div>
        </footer>
      ) : null}
    </div>
  );
}
