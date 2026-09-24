"use client";

import Image from "next/image";
import { useState } from "react";

function Icon({ name, size }: { name: string; size: number }) {
  return <Image src={`/figma/${name}.svg`} alt="" width={size} height={size} />;
}

export default function ChatPanel({ isRecording = false }: { isRecording?: boolean }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`flex h-dvh shrink-0 flex-col items-center border-l border-[#dfdfdf] bg-white px-3 py-8 transition-[width] duration-200 max-lg:border-t max-lg:border-l-0 ${collapsed ? "w-[72px] max-lg:h-[72px] max-lg:w-full max-lg:items-end max-lg:py-3" : "w-[396px] justify-between max-lg:h-[480px] max-lg:w-full"}`}
      aria-label="Clinical AI Assistant"
    >
      <div className={`flex w-full items-center p-3 ${collapsed ? "justify-center max-lg:w-auto" : "justify-between"}`}>
        <h2 className={collapsed ? "sr-only" : "text-base font-medium"}>Clinical AI Assistant</h2>
        <button
          type="button"
          aria-label={collapsed ? "Expand AI chat" : "Collapse AI chat"}
          aria-expanded={!collapsed}
          onClick={() => setCollapsed((value) => !value)}
          className="flex size-6 shrink-0 items-center justify-center rounded"
        >
          <Icon name="sidebar-collapsed" size={24} />
        </button>
      </div>
      <div className={collapsed ? "hidden" : "flex w-full flex-col items-center gap-2 text-center"}>
        <Icon name="ai-assistant" size={40} />
        <p className="text-base font-bold">How can I help with?</p>
        <p className="text-sm font-medium text-[#808080]">Ask anything related to this session.</p>
      </div>
      <div className={collapsed ? "hidden" : "flex w-full flex-col items-center gap-3"}>
        <div className="flex h-[97px] w-full flex-col justify-between rounded-xl border border-[#dfdfdf] p-3">
          <textarea aria-label="Ask anything" placeholder="Ask anything" className="min-h-0 w-full flex-1 resize-none text-sm outline-none placeholder:text-[#808080]" />
          <div className={`flex w-full items-center ${isRecording ? "justify-between" : "justify-end"}`}>
            {isRecording && <button type="button" aria-label="Attach file" className="flex size-6 items-center justify-center"><Icon name="attach" size={16} /></button>}
            <button type="button" aria-label={isRecording ? "Send message" : "Send voice message"} className="flex size-6 items-center justify-center"><Icon name={isRecording ? "send" : "ask-microphone"} size={16} /></button>
          </div>
        </div>
        <p className="max-w-[317px] text-center text-xs text-[#808080]">The assistant is is not intended to assist with clinical decision-making. You assume responsibility for its use.</p>
      </div>
    </aside>
  );
}
