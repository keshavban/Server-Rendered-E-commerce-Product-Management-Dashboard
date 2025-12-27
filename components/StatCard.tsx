export function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
      <p className="text-sm text-[var(--muted)]">{title}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
