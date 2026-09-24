"use client";

import { useEffect, useState } from "react";

export default function TemplatePicker({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  const [selected, setSelected] = useState("Procedure Details");

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#97979766] p-4 backdrop-blur-[15px]" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div role="dialog" aria-modal="true" aria-labelledby="template-picker-title" className="flex h-[424px] w-full max-w-[708px] overflow-hidden rounded-xl border border-[#dfdfdf] bg-white shadow-sm max-sm:flex-col">
        <div className="flex w-[236px] shrink-0 flex-col gap-6 border-r border-[#dfdfdf] px-3 py-6 max-sm:w-full max-sm:border-r-0 max-sm:border-b">
          <h2 id="template-picker-title" className="text-xl font-semibold">Select the template</h2>
          <div className="flex flex-col gap-1">
            <p className="mb-1 text-xs font-semibold text-[#808080]">Templates</p>
            {["Procedure Details", "Pacient Summary"].map((name) => (
              <button key={name} type="button" onClick={() => setSelected(name)} className={`flex h-10 items-center rounded-lg px-3 text-left text-sm font-medium ${selected === name ? "bg-[#eaeae0]" : "hover:bg-[#f7f7f4]"}`}>
                {name}
              </button>
            ))}
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col bg-[#fcfcfc]">
          <div className="flex flex-1 flex-col gap-3 px-10 pt-[74px] max-sm:px-6 max-sm:pt-6">
            {(selected === "Procedure Details" ? ["Suggested plan", "Relevant history", "Clinical concern"] : ["Patient overview", "Relevant history", "Clinical concern"]).map((label, index) => (
              <div key={label} className="flex flex-col gap-3">
                <span className="text-xs font-semibold">{label}</span>
                <div className={`h-6 rounded ${index === 0 ? "bg-[#d1ebe2]" : "bg-[#f0f0e8]"}`} />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-[#dfdfdf] bg-white px-6 py-3">
            <button type="button" onClick={onClose} className="px-3 py-2 text-xs font-medium underline">Cancel</button>
            <button type="button" onClick={onConfirm} disabled={selected !== "Procedure Details"} className="h-10 rounded-lg bg-black px-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-[#ddd] disabled:text-[#787878]">Confirm template</button>
          </div>
        </div>
      </div>
    </div>
  );
}
