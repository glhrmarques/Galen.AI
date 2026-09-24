const sections = [
  {
    heading: "Past Medical History",
    facts: [
      "Underwent laparoscopic cholecystectomy in 2014, complicated by bile leakage.",
      "Bile leakage managed with a transabdominal drain and an ERCP stent.",
    ],
  },
  {
    heading: "History of Present Illness",
    facts: [
      "Reports episodes of abdominal pain that occur suddenly and become excruciating within minutes.",
      "Pain lasts several hours before passing.",
      "Pain resembles previous gallstone pain despite gallbladder removal.",
    ],
  },
  {
    heading: "Normal Physical Findings",
    facts: [
      "Abdomen is not distended, with small scars from laparoscopic surgery.",
      "No tenderness, palpable masses, or hernias detected during examination.",
    ],
  },
];

const revealPlan = (() => {
  let position = 0;
  return sections.map((section) => {
    const start = position;
    const facts = section.facts.map((text) => {
      const fact = { text, start: position };
      position += text.length + 8;
      return fact;
    });
    position += 12;
    return { heading: section.heading, start, facts };
  });
})();

const finalFact = revealPlan.at(-1)?.facts.at(-1);
export const transcriptCompleteAt = finalFact ? finalFact.start + finalFact.text.length : 0;

export default function ProgressiveTranscript({ characters, isRecording }: { characters: number; isRecording: boolean }) {
  if (characters === 0) return null;

  return (
    <div className="mt-9 flex flex-col gap-7 pb-8 text-sm leading-5 text-black" aria-label="Simulated transcription">
      {revealPlan.map((section) => characters > section.start && (
        <section key={section.heading}>
          <h3 className="mb-2 font-semibold">{section.heading}</h3>
          <ul className="list-disc space-y-2 pl-5">
            {section.facts.map((fact) => {
              const visible = Math.max(0, Math.min(fact.text.length, characters - fact.start));
              if (visible === 0) return null;
              const active = isRecording && visible < fact.text.length && characters < fact.start + fact.text.length;
              return (
                <li key={fact.text}>
                  {fact.text.slice(0, visible)}
                  {active && <span className="transcript-cursor" aria-hidden="true" />}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
