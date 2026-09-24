import Image from "next/image";
import Link from "next/link";
import Sidebar from "./Sidebar";
const appointments = [
  { name: "Guilherme Marques", initials: "GM", mrn: "55810", age: 33, time: "8:00 a.m", dateTime: "08:00" },
  { name: "Camila Dachille", initials: "CD", mrn: "72493", age: 28, time: "9:00 a.m", dateTime: "09:00" },
  { name: "Antonio Marques", initials: "AM", mrn: "39167", age: 61, time: "10:00 a.m", dateTime: "10:00" },
];
function Icon({ name }: { name: string }) {
  return <Image src={`/figma/${name}.svg`} alt="" width={24} height={24} className="shrink-0" />;
}
export default function Home() {
  return (
    <div className="flex min-h-dvh w-full bg-background">
      <Sidebar />
      <main className="mx-auto flex min-w-0 max-w-[1280px] flex-1 flex-col gap-14 px-[clamp(32px,10.9375vw,140px)] py-8 max-md:gap-10 max-md:px-6 max-sm:px-4">
        <header className="flex items-center justify-between gap-6 max-sm:flex-col max-sm:items-start max-sm:gap-4">
          <h1 className="font-serif text-[32px] leading-normal font-semibold max-md:text-[28px]">Good morning, Rafael</h1>
        </header>
        <section aria-labelledby="appointments-heading" className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4 max-sm:flex-wrap">
            <h2 id="appointments-heading" className="text-base font-semibold">22 Patients are expected today</h2>
            <button type="button" className="shrink-0 text-sm font-medium underline underline-offset-2">See full shedule</button>
          </div>
          <ul className="flex flex-col gap-3">
            {appointments.map((appointment, index) => (
              <li key={appointment.dateTime}>
                {index > 0 && <div className="mb-3 h-px w-full bg-[#dfdfdf]" aria-hidden="true" />}
                <div className="flex items-center gap-[13px]">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#e5f0f5] font-serif text-base font-semibold">{appointment.initials}</div>
                  <div className="min-w-0 flex-1 text-sm">
                    <p className="font-bold">{appointment.name}</p>
                    <div className="patient-details mt-1 flex flex-wrap gap-x-2 text-[#808080]"><span>MRN: {appointment.mrn}</span><span aria-hidden="true">•</span><span>{appointment.age} years</span></div>
                  </div>
                  {index === 0 ? (
                    <Link href="/session" className="flex h-10 shrink-0 items-center rounded-lg bg-black px-3 text-sm font-bold text-white hover:bg-neutral-800">Start session</Link>
                  ) : (
                    <time dateTime={appointment.dateTime} className="patient-details shrink-0 text-sm text-[#808080]">{appointment.time}</time>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
        <button type="button" aria-label="Open AI assistant" className="assistant-button fixed right-10 bottom-10 flex size-14 items-center justify-center rounded-full max-md:right-6 max-md:bottom-6"><Icon name="assistant" /></button>
      </main>
    </div>
  );
}
