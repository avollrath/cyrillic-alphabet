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
      <div className={`pt-28 sm:pt-24 ${withSideNav ? "lg:flex" : ""}`}>
        {withSideNav ? <SideNav /> : null}
        <main className={`flex-1 px-6 py-8 ${withSideNav ? "lg:px-12" : ""}`}>{children}</main>
      </div>
      {footer ? (
        <footer className="w-full border-t border-slate-200/20 bg-[#f8f9fa] py-10">
          <div className="mx-auto max-w-7xl px-8 text-center md:text-left">
            <p className="text-xs uppercase tracking-widest text-slate-400">
              Lernstand wird lokal in deinem Browser gespeichert.
            </p>
          </div>
        </footer>
      ) : null}
    </div>
  );
}
