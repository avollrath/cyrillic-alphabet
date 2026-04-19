import { NavLink } from "react-router-dom";

const navItemClass = ({ isActive }: { isActive: boolean }) =>
  [
    "rounded-full px-4 py-2 text-sm font-medium tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
    isActive ? "bg-primary-fixed text-primary" : "text-slate-500 hover:text-slate-900",
  ].join(" ");

export function TopNav() {
  return (
    <header className="fixed top-0 z-50 w-full bg-[#f8f9fa]/80 premium-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <NavLink
          to="/"
          className="font-headline text-xl font-extrabold tracking-tighter text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          Russisch lernen
        </NavLink>

        <nav aria-label="Hauptnavigation" className="flex flex-wrap items-center gap-2 font-headline">
          <NavLink to="/learn" className={navItemClass}>
            Lernen
          </NavLink>
          <NavLink to="/dashboard" className={navItemClass}>
            Fortschritt
          </NavLink>
          <NavLink to="/achievements" className={navItemClass}>
            Erfolge
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
