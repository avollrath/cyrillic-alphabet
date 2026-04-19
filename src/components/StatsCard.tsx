import React from "react";

type StatsCardProps = {
  icon: string;
  value: string;
  label: string;
  accent?: "primary" | "secondary" | "tertiary" | "gradient";
  meta?: string;
};

export function StatsCard({ icon, value, label, accent = "primary", meta }: StatsCardProps) {
  if (accent === "gradient") {
    return (
      <div className="bg-primary-gradient rounded-2xl p-6 text-white shadow-lg">
        <div className="mb-4 flex items-start justify-between">
          <div className="rounded-xl bg-white/20 p-3">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>
              {icon}
            </span>
          </div>
          {meta ? <span className="text-xs font-bold">{meta}</span> : null}
        </div>
        <div className="mb-1 font-headline text-3xl font-extrabold">{value}</div>
        <div className="text-sm font-medium text-white/80">{label}</div>
      </div>
    );
  }

  const tone =
    accent === "secondary"
      ? "bg-secondary/10 text-secondary"
      : accent === "tertiary"
        ? "bg-tertiary/10 text-tertiary"
        : "bg-primary/10 text-primary";

  return (
    <div className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm">
      <div className="mb-4 flex items-start justify-between">
        <div className={`rounded-xl p-3 ${tone}`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        {meta ? <span className="text-xs font-bold text-on-surface-variant">{meta}</span> : null}
      </div>
      <div className="mb-1 font-headline text-3xl font-extrabold">{value}</div>
      <div className="text-sm font-medium text-on-surface-variant">{label}</div>
    </div>
  );
}
