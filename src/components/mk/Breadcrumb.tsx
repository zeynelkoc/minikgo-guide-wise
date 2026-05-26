import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  to?: string;
  params?: Record<string, string>;
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="breadcrumb" className="flex flex-wrap items-center gap-1 text-xs text-ink-muted">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="inline-flex items-center gap-1">
            {item.to && !isLast ? (
              <Link to={item.to as any} params={item.params as any} className="hover:text-sage">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-ink" : ""}>{item.label}</span>
            )}
            {!isLast && <ChevronRight className="size-3 opacity-50" />}
          </span>
        );
      })}
    </nav>
  );
}
