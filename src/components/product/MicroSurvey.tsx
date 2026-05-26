import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface SurveyStep {
  question: string;
  options: string[];
}

const defaultSteps: SurveyStep[] = [
  {
    question: "Bu ürünü tekrar alır mıydın?",
    options: ["Kesinlikle evet", "Büyük ihtimalle evet", "Kararsızım", "Hayır"],
  },
  {
    question: "Kaç ay kullandın?",
    options: ["0-3 ay", "3-6 ay", "6-12 ay", "12+ ay"],
  },
  {
    question: "En büyük problemi neydi?",
    options: ["Ağırlık", "Katlanma", "Tekerlek/zemin", "Tente / kumaş", "Yok"],
  },
  {
    question: "Bu ürün kim için uygun değildi?",
    options: ["Çok dar koridor", "Engebeli arazi", "İkiz bebek", "Sık seyahat", "Uygundu"],
  },
];

export function MicroSurvey({ steps = defaultSteps }: { steps?: SurveyStep[] }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const done = index >= steps.length;

  function pick(opt: string) {
    setAnswers((a) => [...a, opt]);
    setIndex((i) => i + 1);
  }

  function restart() {
    setAnswers([]);
    setIndex(0);
  }

  return (
    <div className="rounded-3xl bg-sage-tint/60 p-6 ring-hairline sm:p-8">
      <div className="mb-5 flex items-center justify-between">
        <span className="eyebrow">Hızlı geri bildirim</span>
        <span className="text-xs text-ink-muted tabular-nums">
          {Math.min(index + 1, steps.length)} / {steps.length}
        </span>
      </div>

      {!done ? (
        <div key={index} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <h3 className="font-serif text-2xl leading-tight">{steps[index].question}</h3>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {steps[index].options.map((opt) => (
              <button
                key={opt}
                onClick={() => pick(opt)}
                className={cn(
                  "rounded-full border border-ink/10 bg-canvas px-4 py-3 text-left text-sm transition-all",
                  "hover:border-sage hover:bg-sage hover:text-white",
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in duration-300">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-sage px-3 py-1 text-xs text-white">
            <Check className="size-3" /> Teşekkürler
          </div>
          <h3 className="font-serif text-2xl">Yanıtınız diğer ebeveynlere yardım edecek.</h3>
          <p className="mt-2 text-sm text-ink-soft">
            Anonim olarak yorum havuzuna eklendi.
          </p>
          <button onClick={restart} className="mt-5 text-xs text-sage underline underline-offset-4">
            Tekrar yanıtla
          </button>
        </div>
      )}
    </div>
  );
}
