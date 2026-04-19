type ProgressBarProps = {
  value: number;
  color?: "primary" | "secondary";
  thin?: boolean;
};

export function ProgressBar({ value, color = "secondary", thin = true }: ProgressBarProps) {
  return (
    <div className={`w-full overflow-hidden rounded-full bg-surface-variant ${thin ? "h-1.5" : "h-3"}`}>
      <div
        className={`${thin ? "h-1.5" : "h-3"} rounded-full transition-all duration-300 ${
          color === "secondary" ? "bg-secondary" : "bg-primary-gradient"
        }`}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}
