import { NavLink } from "react-router-dom";

const items = [
  { to: "/learn", label: "Lernen", icon: "menu_book" },
  { to: "/dashboard", label: "Fortschritt", icon: "insights" },
  { to: "/achievements", label: "Erfolge", icon: "military_tech" },
];

export function SideNav() {
  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:bg-[#f3f4f5] lg:p-4">
      <div className="mb-4 px-4 py-6">
        <div className="font-headline text-lg font-bold text-[#2E5BFF]">Russisch A1</div>
        <div className="text-xs text-on-surface-variant opacity-70">Lernen, üben, Fortschritte sehen</div>
      </div>
      <nav aria-label="Seitennavigation" className="flex-1 space-y-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center rounded-lg px-4 py-3 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                isActive ? "bg-[#ffffff] font-semibold text-[#2E5BFF]" : "text-slate-600 hover:bg-slate-200/50"
              }`
            }
          >
            <span className="material-symbols-outlined mr-3" aria-hidden="true">
              {item.icon}
            </span>
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto rounded-2xl bg-surface-container-lowest p-4 text-sm text-on-surface-variant">
        Dein Lernstand, deine Punkte und deine Erfolge werden auf diesem Gerät gespeichert.
      </div>
    </aside>
  );
}
