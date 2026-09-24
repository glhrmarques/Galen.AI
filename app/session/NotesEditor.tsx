"use client";

import { useRef, useState } from "react";

export default function NotesEditor() {
  const [notes, setNotes] = useState([""]);
  const [hasBullet, setHasBullet] = useState(true);
  const fields = useRef<(HTMLTextAreaElement | null)[]>([]);

  function updateNote(index: number, value: string) {
    if (value === "" && notes[index] !== "") {
      removeBullet(index);
      return;
    }
    if (value !== "" && !hasBullet) setHasBullet(true);
    setNotes((current) => current.map((note, noteIndex) => noteIndex === index ? value : note));
  }

  function removeBullet(index: number) {
    if (notes.length === 1) {
      setNotes([""]);
      setHasBullet(false);
      return;
    }

    setNotes((current) => current.filter((_, noteIndex) => noteIndex !== index));
    const previousIndex = Math.max(0, index - 1);
    requestAnimationFrame(() => {
      const previousField = fields.current[previousIndex];
      previousField?.focus();
      previousField?.setSelectionRange(previousField.value.length, previousField.value.length);
    });
  }

  function addBullet(index: number, field: HTMLTextAreaElement) {
    const start = field.selectionStart;
    const end = field.selectionEnd;
    setNotes((current) => [
      ...current.slice(0, index),
      current[index].slice(0, start),
      current[index].slice(end),
      ...current.slice(index + 1),
    ]);
    setHasBullet(true);
    requestAnimationFrame(() => fields.current[index + 1]?.focus());
  }

  return (
    <ul className={`mt-3 space-y-1 text-sm font-medium text-[#808080] ${hasBullet ? "list-disc pl-[21px]" : "list-none pl-0"}`}>
      {notes.map((note, index) => (
        <li key={index}>
          <textarea
            ref={(element) => { fields.current[index] = element; }}
            aria-label={`Note ${index + 1}`}
            placeholder={index === 0 ? "Write something" : undefined}
            rows={1}
            value={note}
            onChange={(event) => {
              updateNote(index, event.target.value);
              event.target.style.height = "auto";
              event.target.style.height = `${event.target.scrollHeight}px`;
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                addBullet(index, event.currentTarget);
              } else if (event.key === "Backspace" && note === "") {
                event.preventDefault();
                removeBullet(index);
              }
            }}
            className="min-h-[20px] w-full resize-none overflow-hidden align-top text-sm font-medium leading-5 text-black outline-none placeholder:text-[#808080]"
          />
        </li>
      ))}
    </ul>
  );
}
