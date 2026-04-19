import { NavLink } from "react-router-dom";

const items = [
  { to: "/learn", label: "Lernen", icon: "menu_book" },
  { to: "/dashboard", label: "Statistiken", icon: "insights" },
  { to: "/achievements", label: "Abzeichen", icon: "military_tech" },
];

export function SideNav() {
  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:bg-[#f3f4f5] lg:p-4">
      <div className="mb-4 px-4 py-6">
        <div className="font-headline text-lg font-bold text-[#2E5BFF]">Willkommen</div>
        <div className="text-xs text-on-surface-variant opacity-70">Russisch Pro</div>
      </div>
      <nav className="flex-1 space-y-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center rounded-lg px-4 py-3 transition-all duration-150 ${
                isActive
                  ? "bg-[#ffffff] font-semibold text-[#2E5BFF]"
                  : "text-slate-600 hover:bg-slate-200/50"
              }`
            }
          >
            <span className="material-symbols-outlined mr-3">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto pt-4">
        <div className="mb-4 rounded-xl bg-primary/5 p-4">
          <p className="mb-2 text-xs font-semibold text-primary">Upgrade verfügbar</p>
          <button type="button" className="w-full rounded-lg bg-primary py-2 text-xs font-bold text-white">
            Premium testen
          </button>
        </div>
      </div>
    </aside>
  );
}
