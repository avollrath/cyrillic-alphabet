import { NavLink } from "react-router-dom";

export function TopNav() {
  return (
    <header className="fixed top-0 z-50 w-full bg-[#f8f9fa]/80 premium-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        <div className="font-headline text-xl font-extrabold tracking-tighter text-slate-900">Kognitive Galerie</div>
        <nav className="hidden items-center gap-8 md:flex font-headline font-medium tracking-tight">
          <NavLink
            to="/learn"
            className={({ isActive }) =>
              isActive ? "border-b-2 border-[#2E5BFF] pb-1 text-[#2E5BFF]" : "text-slate-500 transition-colors hover:text-slate-900"
            }
          >
            Lernen
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "border-b-2 border-[#2E5BFF] pb-1 text-[#2E5BFF]" : "text-slate-500 transition-colors hover:text-slate-900"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/achievements"
            className={({ isActive }) =>
              isActive ? "border-b-2 border-[#2E5BFF] pb-1 text-[#2E5BFF]" : "text-slate-500 transition-colors hover:text-slate-900"
            }
          >
            Erfolge
          </NavLink>
        </nav>
        <div className="flex items-center gap-4">
          <button type="button" className="material-symbols-outlined text-on-surface-variant transition-opacity hover:opacity-80">
            notifications
          </button>
          <button type="button" className="material-symbols-outlined text-on-surface-variant transition-opacity hover:opacity-80">
            settings
          </button>
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-surface-container-highest text-sm font-bold text-primary">
            Я
          </div>
        </div>
      </div>
    </header>
  );
}
