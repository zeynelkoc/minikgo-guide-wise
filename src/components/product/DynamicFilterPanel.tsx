import type { FilterDefinition, FilterState, FilterValue } from "@/data/types";
import { cn } from "@/lib/utils";

interface Props {
  definitions: FilterDefinition[];
  value: FilterState;
  onChange: (next: FilterState) => void;
}

/**
 * Tamamen veri-odaklı filtre paneli.
 * Aynı bileşen her kategori için kullanılır; tanım listesi değişir.
 */
export function DynamicFilterPanel({ definitions, value, onChange }: Props) {
  function update(id: string, v: FilterValue) {
    onChange({ ...value, [id]: v });
  }

  function reset() {
    onChange({});
  }

  return (
    <aside className="rounded-3xl bg-canvas p-6 ring-hairline">
      <header className="mb-6 flex items-center justify-between">
        <h3 className="font-serif text-xl">Filtreler</h3>
        <button
          onClick={reset}
          className="text-xs text-ink-muted underline-offset-4 hover:text-sage hover:underline"
        >
          Sıfırla
        </button>
      </header>

      <div className="space-y-7">
        {definitions.map((def) => (
          <section key={def.id}>
            <h4 className="mb-3 text-sm font-medium">{def.label}</h4>

            {def.type === "range" && (
              <RangeFilter def={def} value={value[def.id]} onChange={(v) => update(def.id, v)} />
            )}
            {def.type === "multi" && (
              <MultiFilter def={def} value={value[def.id]} onChange={(v) => update(def.id, v)} />
            )}
            {def.type === "chips" && (
              <ChipsFilter def={def} value={value[def.id]} onChange={(v) => update(def.id, v)} />
            )}
            {def.type === "toggle" && (
              <ToggleFilter def={def} value={value[def.id]} onChange={(v) => update(def.id, v)} />
            )}
          </section>
        ))}
      </div>
    </aside>
  );
}

function RangeFilter({
  def,
  value,
  onChange,
}: {
  def: Extract<FilterDefinition, { type: "range" }>;
  value?: FilterValue;
  onChange: (v: FilterValue) => void;
}) {
  const v =
    value && value.type === "range"
      ? value
      : { type: "range" as const, min: def.min, max: def.max };
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-ink-soft">
        <span>{v.min.toLocaleString("tr-TR")} {def.unit}</span>
        <span>{v.max.toLocaleString("tr-TR")} {def.unit}</span>
      </div>
      <input
        type="range"
        min={def.min}
        max={def.max}
        step={def.step ?? 1}
        value={v.max}
        onChange={(e) => onChange({ type: "range", min: v.min, max: Number(e.target.value) })}
        className="w-full accent-sage"
      />
    </div>
  );
}

function MultiFilter({
  def,
  value,
  onChange,
}: {
  def: Extract<FilterDefinition, { type: "multi" }>;
  value?: FilterValue;
  onChange: (v: FilterValue) => void;
}) {
  const selected = value && value.type === "multi" ? value.values : [];
  function toggle(val: string) {
    onChange({
      type: "multi",
      values: selected.includes(val) ? selected.filter((s) => s !== val) : [...selected, val],
    });
  }
  return (
    <ul className="space-y-2">
      {def.options.map((opt) => {
        const on = selected.includes(opt.value);
        return (
          <li key={opt.value}>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
              <span
                className={cn(
                  "grid h-4 w-4 place-items-center rounded border transition-colors",
                  on ? "border-sage bg-sage text-white" : "border-ink/15",
                )}
              >
                {on && (
                  <svg viewBox="0 0 16 16" className="h-3 w-3 fill-none stroke-current stroke-[2.5]">
                    <path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <input
                type="checkbox"
                className="sr-only"
                checked={on}
                onChange={() => toggle(opt.value)}
              />
              {opt.label}
            </label>
          </li>
        );
      })}
    </ul>
  );
}

function ChipsFilter({
  def,
  value,
  onChange,
}: {
  def: Extract<FilterDefinition, { type: "chips" }>;
  value?: FilterValue;
  onChange: (v: FilterValue) => void;
}) {
  const selected = value && value.type === "chips" ? value.values : [];
  function toggle(val: string) {
    onChange({
      type: "chips",
      values: selected.includes(val) ? selected.filter((s) => s !== val) : [...selected, val],
    });
  }
  return (
    <div className="flex flex-wrap gap-2">
      {def.options.map((opt) => {
        const on = selected.includes(opt.value);
        return (
          <button
            key={opt.value}
            onClick={() => toggle(opt.value)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs transition-all",
              on
                ? "border-sage bg-sage text-white"
                : "border-ink/10 text-ink-soft hover:border-sage hover:text-sage",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function ToggleFilter({
  def,
  value,
  onChange,
}: {
  def: Extract<FilterDefinition, { type: "toggle" }>;
  value?: FilterValue;
  onChange: (v: FilterValue) => void;
}) {
  const on = value && value.type === "toggle" ? value.value : false;
  return (
    <label className="flex cursor-pointer items-start justify-between gap-3">
      <span>
        {def.description ? (
          <span className="block text-xs text-ink-muted">{def.description}</span>
        ) : null}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={() => onChange({ type: "toggle", value: !on })}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
          on ? "bg-sage" : "bg-ink/10",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all",
            on ? "left-[22px]" : "left-0.5",
          )}
        />
      </button>
    </label>
  );
}

/* Filter helpers */
export function applyFilters<T extends { attributes: Record<string, any> }>(
  items: T[],
  state: FilterState,
): T[] {
  return items.filter((item) => {
    for (const [id, val] of Object.entries(state)) {
      const attr = item.attributes[id];
      if (val.type === "range") {
        if (typeof attr !== "number") continue;
        if (attr < val.min || attr > val.max) return false;
      } else if (val.type === "multi" || val.type === "chips") {
        if (val.values.length === 0) continue;
        if (typeof attr === "string") {
          if (!val.values.includes(attr)) return false;
        }
      } else if (val.type === "toggle") {
        if (val.value && !attr) return false;
      }
    }
    return true;
  });
}
