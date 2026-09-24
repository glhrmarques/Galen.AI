"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Sidebar from "../Sidebar";
import ChatPanel from "./ChatPanel";
import NotesEditor from "./NotesEditor";
import ProgressiveTranscript, { transcriptCompleteAt } from "./ProgressiveTranscript";
import ProcedureDetails from "./ProcedureDetails";
import TemplatePicker from "./TemplatePicker";

function Icon({ name, width, height }: { name: string; width: number; height: number }) {
  return <Image src={`/figma/${name}.svg`} alt="" width={width} height={height} />;
}

const workingPhrases = [
  "Extracting facts...",
  "Organizing your notes...",
  "Reviewing clinical context...",
];

export default function SessionPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [elapsedMilliseconds, setElapsedMilliseconds] = useState(0);
  const [showTemplatePicker, setShowTemplatePicker] = useState(false);
  const [procedureOpen, setProcedureOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"context" | "procedure">("context");
  const startedAt = useRef<number | null>(null);

  useEffect(() => {
    if (!isRecording) return;
    const timer = window.setInterval(() => {
      if (startedAt.current !== null) {
        setElapsedMilliseconds(Date.now() - startedAt.current);
      }
    }, 80);
    return () => window.clearInterval(timer);
  }, [isRecording]);

  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
  const timerLabel = `${Math.floor(elapsedSeconds / 60)}:${String(elapsedSeconds % 60).padStart(2, "0")}`;
  const workingPhrase = workingPhrases[Math.floor(elapsedSeconds / 3) % workingPhrases.length];
  const revealedCharacters = Math.floor(elapsedMilliseconds * 0.038);
  const isTranscriptComplete = revealedCharacters >= transcriptCompleteAt;

  function startRecording() {
    startedAt.current = Date.now();
    setElapsedMilliseconds(0);
    setHasRecorded(true);
    setIsRecording(true);
  }

  function stopRecording() {
    if (startedAt.current !== null) setElapsedMilliseconds(Date.now() - startedAt.current);
    startedAt.current = null;
    setIsRecording(false);
  }

  function resumeRecording() {
    startedAt.current = Date.now() - elapsedMilliseconds;
    setIsRecording(true);
  }

  function confirmTemplate() {
    stopRecording();
    setProcedureOpen(true);
    setActiveTab("procedure");
    setShowTemplatePicker(false);
  }

  return (
    <div className="flex min-h-dvh w-full bg-white">
      <Sidebar initiallyCollapsed />
      <div className="flex min-w-0 flex-1 max-lg:flex-col">
        <main className="mx-auto flex h-dvh min-w-0 max-w-[1280px] flex-1 flex-col overflow-hidden px-10 pt-8 max-md:px-6">
          <div className="flex shrink-0 flex-col gap-6">
            <header className="flex flex-col gap-3">
              <Link href="/" aria-label="Back to home" className="flex h-8 w-6 items-center justify-center rounded"><Icon name="back" width={24} height={32} /></Link>
              <div className="flex items-center justify-between gap-8 max-sm:flex-col max-sm:items-start max-sm:gap-4">
                <div className="flex min-w-0 flex-col gap-3">
                  <h1 className="font-serif text-[32px] font-semibold leading-normal max-sm:text-[28px]">Guilherme Marques</h1>
                  <div className="flex flex-wrap items-center gap-3 text-base text-[#808080]">
                    <span className="flex items-center gap-2 font-medium"><span className="flex size-8 items-center justify-center rounded-full border border-[#dfdfdf] font-serif text-[10px]">RM</span>Rafael Martins</span>
                    <Icon name="dot" width={4} height={4} />
                    <span>MRN: 55810</span>
                    <Icon name="dot" width={4} height={4} />
                    <span>33 years</span>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  {isRecording && <span className="px-3 text-xs text-[#808080]">Saved 2 min ago</span>}
                  <button type="button" disabled className="h-10 shrink-0 cursor-not-allowed rounded-lg bg-[#ddd] px-3 text-sm font-bold text-[#787878]">Send to ERH</button>
                </div>
              </div>
            </header>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setActiveTab("context")} className="inline-flex items-center rounded-lg bg-[#fcfcfc] px-3 py-2 text-sm font-medium">Context</button>
              {procedureOpen && (
                <div className="inline-flex items-center gap-2 rounded-lg bg-[#fcfcfc] pl-3 pr-2 py-2 text-sm font-medium">
                  <button type="button" onClick={() => setActiveTab("procedure")}>Procedure Details</button>
                  <button type="button" aria-label="Close Procedure Details tab" onClick={() => { setProcedureOpen(false); setActiveTab("context"); }} className="flex size-4 items-center justify-center"><Icon name="close-tab" width={16} height={16} /></button>
                </div>
              )}
            </div>
            <div className="h-px w-full bg-[#dfdfdf]" aria-hidden="true" />
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain pt-6">
            <div className={activeTab === "context" ? "contents" : "hidden"}>
              <section aria-labelledby="notes-heading">
                <h2 id="notes-heading" className="text-base font-medium">My notes</h2>
                <NotesEditor />
              </section>
              {hasRecorded && <ProgressiveTranscript characters={revealedCharacters} isRecording={isRecording} />}
            </div>
            {procedureOpen && <div className={activeTab === "procedure" ? "contents" : "hidden"}><ProcedureDetails /></div>}
            {isRecording && activeTab === "context" && (
              <div className="mt-6 flex items-center gap-1 pb-6 text-sm font-medium text-[#808080]" role="status" aria-live="polite">
                <span className="animate-pulse"><Icon name="extracting-facts" width={14} height={8} /></span>
                <span key={workingPhrase} className="ai-status-text">{workingPhrase}</span>
              </div>
            )}
            {!hasRecorded && (
              <section className="mx-auto mt-auto flex flex-col items-center gap-3 pb-16 pt-20 text-center" aria-labelledby="recording-heading">
                <h2 id="recording-heading" className="text-xl font-bold">Start recording to begin transcribing</h2>
                <p className="text-sm font-medium text-[#808080]">Always review the context before generating documents.</p>
                <div className="flex items-center gap-2 rounded-xl p-2">
                  <button type="button" onClick={startRecording} className="flex h-10 w-[195px] items-center justify-between gap-2 rounded-lg bg-[#1a9607] px-3 text-sm font-medium text-white hover:bg-[#167f06]">
                    <span>Start recording</span><Icon name="microphone" width={16} height={16} />
                  </button>
                  <button type="button" aria-label="Recording settings" className="flex size-10 items-center justify-center rounded-lg hover:bg-black/5"><Icon name="recording-settings" width={16} height={16} /></button>
                </div>
              </section>
            )}
          </div>

          {hasRecorded && <div className="-mx-10 flex shrink-0 items-center justify-between gap-4 border-t border-[#dfdfdf] bg-white px-10 py-3 max-md:-mx-6 max-md:px-6 max-sm:flex-wrap">
              <div className="flex items-center gap-2">
                {isRecording ? (
                  <button type="button" aria-label={`Stop recording, ${timerLabel} elapsed`} onClick={stopRecording} className="flex h-10 w-[195px] items-center justify-between gap-2 rounded-lg bg-[#b84d4d] px-3 text-sm font-medium text-white hover:bg-[#a43e3e]">
                    <span role="timer" aria-live="off">{timerLabel}</span><Icon name="stop-recording" width={16} height={16} />
                  </button>
                ) : (
                  <button type="button" onClick={resumeRecording} className="flex h-10 w-[195px] items-center justify-between gap-2 rounded-lg border border-[#dfdfdf] bg-white px-3 text-sm font-medium text-black hover:bg-[#f8f8f8]">
                    <span>Resume transcribing</span><Icon name="resume-transcribing" width={16} height={16} />
                  </button>
                )}
                <button type="button" aria-label="Recording settings" className="flex size-10 items-center justify-center rounded-lg hover:bg-black/5"><Icon name="recording-settings-active" width={16} height={16} /></button>
              </div>
              <button type="button" disabled={!isTranscriptComplete} onClick={() => setShowTemplatePicker(true)} className={`flex h-10 items-center gap-2.5 rounded-lg px-3 text-sm font-medium ${isTranscriptComplete ? "assistant-button text-white" : "cursor-not-allowed bg-[#ddd] text-[#787878]"}`}>
                Create document <Icon name={isTranscriptComplete ? "create-document-ready" : "create-document"} width={16} height={16} />
              </button>
          </div>}
        </main>

        <ChatPanel isRecording={isRecording} />
      </div>
      {showTemplatePicker && <TemplatePicker onClose={() => setShowTemplatePicker(false)} onConfirm={confirmTemplate} />}
    </div>
  );
}
