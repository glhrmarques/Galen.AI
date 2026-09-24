"use client";

import { useEffect, useState } from "react";

const initialText = {
  plan1: "Avoid diclofenac due to history of duodenal ulcer.",
  plan2: "Consider paracetamol for pain relief.",
  next1: "MRCP to evaluate the common bile duct for stones or other biliary abnormalities.",
  next2: "Follow up after imaging.",
  pain: "Epigastric",
  onset: "Sudden",
  duration: "Several hours",
  frequency: "Per week",
  severity: "Severe",
  history: "Prior laparoscopic cholecystectomy in 2014 complicated by bile leakage; managed with transabdominal drain and ERCP stent",
  concern: "Possible retained/recurrent stone in the common bile duct",
};

type Field = keyof typeof initialText;

export default function ProcedureDetails() {
  const [text, setText] = useState(initialText);
  const [visibleBlocks, setVisibleBlocks] = useState(1);

  useEffect(() => {
    if (visibleBlocks >= 4) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setVisibleBlocks((count) => reducedMotion ? 4 : count + 1), reducedMotion ? 0 : 650);
    return () => window.clearTimeout(timer);
  }, [visibleBlocks]);

  function edit(field: Field, value: string) {
    setText((current) => ({ ...current, [field]: value }));
  }

  function field(field: Field, label: string, className = "") {
    return <textarea
      aria-label={label}
      value={text[field]}
      onChange={(event) => edit(field, event.target.value)}
      rows={1}
      className={`w-full resize-none overflow-hidden bg-transparent outline-none [field-sizing:content] ${className}`}
    />;
  }

  return (
    <article className="flex flex-col gap-8 pb-8 text-sm text-black" aria-label="Procedure Details document">
      {visibleBlocks >= 1 && <section className="procedure-block flex flex-col gap-6 rounded-xl bg-[#e1ece8] p-6">
        <div className="flex flex-col gap-3">
          <h2 className="font-serif text-xl font-semibold">Suggested Plan</h2>
          <ul className="list-disc space-y-1 pl-5 leading-[1.5]">
            <li>{field("plan1", "Suggested plan item 1")}</li>
            <li>{field("plan2", "Suggested plan item 2")}</li>
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="font-serif text-base font-semibold">Next step suggestion</h3>
          <ul className="list-disc space-y-1 pl-5 leading-[1.5]">
            <li>{field("next1", "Next step item 1")}</li>
            <li>{field("next2", "Next step item 2")}</li>
          </ul>
        </div>
        <p className="text-xs text-[#808080]">• &nbsp;The assistant is not intended to assist with clinical decision-making. You assume responsibility for its use.</p>
      </section>}

      {visibleBlocks >= 2 && <section className="procedure-block rounded-xl border border-[#dfdfdf] px-3" aria-label="Symptoms">
        {([
          ["Pain location", "pain"],
          ["Onset / duration", "onset"],
          ["Duration", "duration"],
          ["Frequency of episodes", "frequency"],
          ["Severity", "severity"],
        ] as [string, Field][]).map(([label, key], index) => (
          <div key={key} className={`flex min-h-10 items-center justify-between gap-4 py-2 text-xs ${index > 0 ? "border-t border-[#dfdfdf]" : ""}`}>
            <span className="font-medium">{label}</span>
            <div className="w-1/2 text-right">{field(key, label, "text-right")}</div>
          </div>
        ))}
      </section>}

      {visibleBlocks >= 3 && <section className="procedure-block flex flex-col gap-3">
        <h3 className="font-semibold">Relevant history</h3>
        {field("history", "Relevant history", "leading-[1.5]")}
      </section>}
      {visibleBlocks >= 4 && <section className="procedure-block flex flex-col gap-3">
        <h3 className="font-semibold">Clinical concern</h3>
        {field("concern", "Clinical concern", "leading-[1.5]")}
      </section>}
    </article>
  );
}
