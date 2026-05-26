import type { SpecGroup } from "@/data/types";

export function DynamicSpecTable({ groups }: { groups: SpecGroup[] }) {
  return (
    <div className="space-y-10">
      {groups.map((g) => (
        <section key={g.title}>
          <h3 className="eyebrow mb-4">{g.title}</h3>
          <dl className="divide-y divide-ink/5 border-t border-ink/5">
            {g.rows.map((r) => (
              <div key={r.label} className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm text-ink-muted">{r.label}</dt>
                <dd className="sm:col-span-2">
                  <span className="text-sm text-ink">{r.value}</span>
                  {r.hint && (
                    <span className="ml-2 text-xs text-ink-muted">— {r.hint}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
