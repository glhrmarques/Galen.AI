import Image from "next/image";
import Link from "next/link";
import Sidebar from "../Sidebar";

function Icon({ name, width, height }: { name: string; width: number; height: number }) {
  return <Image src={`/figma/${name}.svg`} alt="" width={width} height={height} />;
}

export default function SessionPage() {
  return (
    <div className="flex min-h-dvh w-full bg-white">
      <Sidebar initiallyCollapsed />
      <div className="flex min-w-0 flex-1 max-lg:flex-col">
        <main className="mx-auto flex min-h-dvh min-w-0 max-w-[1280px] flex-1 flex-col px-10 py-8 max-md:px-6">
          <div className="flex flex-col gap-6">
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
                <button type="button" className="h-10 shrink-0 rounded-lg bg-black px-3 text-sm font-bold text-white hover:bg-neutral-800">Send to ERH</button>
              </div>
            </header>
            <div>
              <span className="inline-flex items-center rounded-lg bg-[#fcfcfc] px-3 py-2 text-sm font-medium">Context</span>
            </div>
            <div className="h-px w-full bg-[#dfdfdf]" aria-hidden="true" />
          </div>

          <section className="mt-6" aria-labelledby="notes-heading">
            <h2 id="notes-heading" className="text-base font-medium">My notes</h2>
            <ul className="mt-3 list-disc pl-[21px] text-sm font-medium text-[#808080]"><li>Write something</li></ul>
          </section>

          <section className="mx-auto mt-auto flex flex-col items-center gap-3 pb-16 pt-20 text-center" aria-labelledby="recording-heading">
            <h2 id="recording-heading" className="text-xl font-bold">Start recording to begin transcribing</h2>
            <p className="text-sm font-medium text-[#808080]">Always review the context before generating documents.</p>
            <div className="flex items-center gap-2 rounded-xl p-2">
              <button type="button" className="flex h-10 w-[195px] items-center justify-between gap-2 rounded-lg bg-[#1a9607] px-3 text-sm font-medium text-white hover:bg-[#167f06]">
                <span>Start recording</span><Icon name="microphone" width={16} height={16} />
              </button>
              <button type="button" aria-label="Recording settings" className="flex size-10 items-center justify-center rounded-lg hover:bg-black/5"><Icon name="recording-settings" width={16} height={16} /></button>
            </div>
          </section>
        </main>

        <aside className="flex h-dvh w-[396px] shrink-0 flex-col items-center justify-between border-l border-[#dfdfdf] px-3 py-8 max-lg:h-[480px] max-lg:w-full max-lg:border-t max-lg:border-l-0" aria-label="Clinical AI Assistant">
          <div className="flex w-full items-center justify-between p-3">
            <h2 className="text-base font-medium">Clinical AI Assistant</h2>
            <Icon name="sidebar-collapsed" width={24} height={24} />
          </div>
          <div className="flex w-full flex-col items-center gap-2 text-center">
            <Icon name="ai-assistant" width={40} height={40} />
            <p className="text-base font-bold">How can I help with?</p>
            <p className="text-sm font-medium text-[#808080]">Ask anything related to this session.</p>
          </div>
          <div className="flex w-full flex-col items-center gap-3">
            <div className="flex h-[97px] w-full flex-col justify-between rounded-xl border border-[#dfdfdf] p-3">
              <textarea aria-label="Ask anything" placeholder="Ask anything" className="min-h-0 w-full flex-1 resize-none text-sm outline-none placeholder:text-[#808080]" />
              <button type="button" aria-label="Send voice message" className="ml-auto flex size-6 items-center justify-center"><Icon name="ask-microphone" width={16} height={16} /></button>
            </div>
            <p className="max-w-[317px] text-center text-xs text-[#808080]">The assistant is is not intended to assist with clinical decision-making. You assume responsibility for its use.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
