import type { CSSProperties } from "react";
import type { PreviewKind } from "@/data/portfolio";

interface PreviewProps {
  kind: PreviewKind;
  accent: string;
}

const bar = "rounded-full bg-white/10";

function Line({ w, className = "" }: { w: string; className?: string }) {
  return <div className={`h-1.5 ${bar} ${className}`} style={{ width: w }} />;
}

function Dashboard({ accent }: { accent: string }) {
  const bars = [42, 58, 36, 72, 64, 88, 54, 76, 92, 68, 80, 96];
  return (
    <div className="flex h-full">
      <aside className="hidden w-[22%] flex-col gap-2 border-r border-white/5 p-3 sm:flex">
        <div className="mb-2 flex items-center gap-1.5">
          <div className="size-3 rounded" style={{ background: accent }} />
          <Line w="60%" />
        </div>
        {["Overview", "Properties", "Assets", "Access", "Finance", "Users"].map((item, i) => (
          <div
            key={item}
            className={`rounded-md px-2 py-1 text-[9px] ${i === 0 ? "bg-white/10 text-white" : "text-white/40"}`}
          >
            {item}
          </div>
        ))}
      </aside>
      <div className="flex flex-1 flex-col gap-2.5 p-3">
        <div className="flex items-center justify-between">
          <div className="text-[10px] font-medium text-white">Portfolio overview</div>
          <div className="rounded-full border border-white/10 px-2 py-0.5 text-[8px] text-white/50">Tenant: Northbridge</div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            ["Occupancy", "94%"],
            ["Assets", "1,284"],
            ["Open tickets", "12"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-white/5 bg-white/[0.03] p-2">
              <div className="text-[8px] text-white/40">{label}</div>
              <div className="text-sm font-semibold text-white">{value}</div>
            </div>
          ))}
        </div>
        <div className="grid flex-1 grid-cols-5 gap-2">
          <div className="col-span-3 flex flex-col rounded-lg border border-white/5 bg-white/[0.03] p-2">
            <div className="mb-1 flex justify-between text-[8px] text-white/40">
              <span>Revenue · Xero sync</span>
              <span style={{ color: accent }}>+18%</span>
            </div>
            <div className="flex flex-1 items-end gap-1">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{ height: `${h}%`, background: i === bars.length - 1 ? accent : "rgb(255 255 255 / 0.12)" }}
                />
              ))}
            </div>
          </div>
          <div className="relative col-span-2 overflow-hidden rounded-lg border border-white/5 bg-gradient-to-br from-slate-800 to-slate-950">
            <div className="absolute inset-0 opacity-30 [background:repeating-linear-gradient(0deg,transparent_0_3px,rgb(255_255_255/0.08)_3px_4px)]" />
            <div className="absolute bottom-2 left-2 h-6 w-10 rounded-sm border border-white/20" />
            <div className="absolute right-3 top-6 h-8 w-5 rounded-sm bg-white/10" />
            <div className="absolute left-2 top-2 flex items-center gap-1 rounded bg-black/50 px-1.5 py-0.5 text-[7px] font-semibold text-white">
              <span className="size-1.5 animate-pulse rounded-full bg-red-500" /> LIVE · CAM 03
            </div>
            <div className="absolute bottom-2 right-2 text-[7px] text-white/50">WebRTC</div>
          </div>
        </div>
        <div className="flex gap-1.5">
          {["DocuSign ✓", "LockVue ✓", "GoHighLevel ✓"].map((chip) => (
            <span key={chip} className="rounded-full bg-white/5 px-2 py-0.5 text-[8px] text-white/55">
              {chip}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Scraper({ accent }: { accent: string }) {
  return (
    <div className="flex h-full">
      <div className="flex-1 p-3">
        <div className="mb-2 flex items-center justify-between">
          <div className="text-[10px] font-semibold text-white">Metro Motors · Inventory</div>
          <Line w="20%" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="relative rounded-lg border border-white/5 bg-white/[0.03] p-2">
              <div className="mb-1.5 h-8 rounded bg-gradient-to-br from-white/10 to-white/[0.02]" />
              <div
                className={`relative mb-1 text-[9px] font-medium text-white ${i === 0 ? "outline-dashed outline-1 outline-offset-2" : ""}`}
                style={i === 0 ? ({ outlineColor: accent } as CSSProperties) : undefined}
              >
                {["2022 Civic EX", "2021 Model 3", "2020 RAV4 XLE", "2023 Mustang"][i]}
              </div>
              <div className="text-[9px]" style={{ color: i === 0 ? accent : "rgb(255 255 255 / 0.5)" }}>
                {["$21,400", "$32,900", "$26,150", "$38,700"][i]}
              </div>
              {i === 0 && (
                <div
                  className="absolute -top-2 left-2 z-10 rounded px-1.5 py-0.5 font-mono text-[7px] text-black"
                  style={{ background: accent }}
                >
                  div.card &gt; h3.title
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <aside className="flex w-[38%] flex-col gap-1.5 border-l border-white/5 bg-white/[0.02] p-3">
        <div className="text-[8px] uppercase tracking-widest text-white/40">Side panel</div>
        <div className="text-[10px] font-semibold text-white">Flow: Vehicle listings</div>
        {[
          ["Title", "done"],
          ["Price", "done"],
          ["Mileage", "recording"],
          ["VIN", "todo"],
        ].map(([field, state]) => (
          <div key={field} className="flex items-center justify-between rounded-md bg-white/5 px-2 py-1 text-[9px]">
            <span className="text-white/70">{field}</span>
            <span
              className={state === "recording" ? "animate-pulse" : ""}
              style={{ color: state === "todo" ? "rgb(255 255 255 / 0.3)" : accent }}
            >
              {state === "done" ? "✓" : state === "recording" ? "● rec" : "—"}
            </span>
          </div>
        ))}
        <div className="mt-auto rounded-md py-1 text-center text-[9px] font-semibold text-black" style={{ background: accent }}>
          Export JSON
        </div>
      </aside>
    </div>
  );
}

function Inbox({ accent }: { accent: string }) {
  const rows = [
    ["Hetzner Online", "Invoice R0012894", true],
    ["Figma", "Your receipt for October", true],
    ["Priya Shah", "Sprint review notes", false],
    ["AWS Billing", "Statement available", true],
    ["Rahul Mehta", "Re: launch checklist", false],
  ] as const;
  return (
    <div className="flex h-full">
      <div className="w-[48%] border-r border-white/5">
        {rows.map(([from, subject, invoice], i) => (
          <div
            key={from}
            className={`flex items-center gap-2 border-b border-white/5 px-3 py-2 ${i === 0 ? "bg-white/[0.06]" : ""}`}
          >
            <div className="size-4 shrink-0 rounded-full bg-white/10" />
            <div className="min-w-0 flex-1">
              <div className="truncate text-[9px] font-medium text-white">{from}</div>
              <div className="truncate text-[8px] text-white/40">{subject}</div>
            </div>
            {invoice && <span className="size-1.5 rounded-full" style={{ background: accent }} />}
          </div>
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="text-[10px] font-semibold text-white">Invoice R0012894</div>
        <Line w="70%" />
        <Line w="50%" />
        <div className="flex items-center gap-2 rounded-md border border-white/10 p-1.5">
          <div className="rounded bg-red-500/80 px-1 text-[7px] font-bold text-white">PDF</div>
          <span className="text-[8px] text-white/60">invoice_R0012894.pdf</span>
        </div>
        <div className="mt-auto rounded-lg border p-2" style={{ borderColor: `${accent}55`, background: `${accent}12` }}>
          <div className="mb-1 text-[8px] uppercase tracking-widest" style={{ color: accent }}>
            AI classified
          </div>
          <div className="text-[9px] text-white">Invoice · €1,240.00 · Hetzner</div>
          <div className="mt-1.5 flex gap-1">
            <span className="rounded px-1.5 py-0.5 text-[8px] font-semibold text-black" style={{ background: accent }}>
              Upload
            </span>
            <span className="rounded bg-white/10 px-1.5 py-0.5 text-[8px] text-white/60">No duplicates</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sourcing({ accent }: { accent: string }) {
  return (
    <div className="relative h-full p-3">
      <div className="mb-3 h-10 rounded-lg bg-gradient-to-r from-white/10 to-white/[0.02]" />
      <div className="-mt-8 ml-3 size-10 rounded-full border-2 border-[#0d0f12] bg-gradient-to-br from-white/30 to-white/5" />
      <div className="mt-2 text-[10px] font-semibold text-white">Ananya Rao</div>
      <div className="text-[8px] text-white/45">Senior Product Designer · Berlin</div>
      <div className="mt-3 space-y-1.5">
        <Line w="80%" />
        <Line w="65%" />
        <Line w="72%" />
        <Line w="40%" />
      </div>
      <div className="absolute right-3 top-3 w-[46%] rounded-xl border border-white/10 bg-[#111317]/95 p-2.5 shadow-2xl shadow-black/60">
        <div className="mb-2 flex items-center gap-1.5">
          <div className="size-3 rounded" style={{ background: accent }} />
          <span className="text-[9px] font-semibold text-white">SimpleRecruiter</span>
        </div>
        <div className="mb-1 text-[8px] text-white/40">Send to ATS</div>
        <div className="mb-2 grid grid-cols-2 gap-1">
          {["Recruitee", "Salesforce", "OTYS", "Carerix"].map((ats, i) => (
            <div
              key={ats}
              className="rounded-md border px-1.5 py-1 text-center text-[8px]"
              style={{
                borderColor: i === 0 ? accent : "rgb(255 255 255 / 0.08)",
                color: i === 0 ? "#fff" : "rgb(255 255 255 / 0.5)",
              }}
            >
              {ats}
            </div>
          ))}
        </div>
        <div className="mb-2 flex items-center justify-between text-[8px] text-white/50">
          <span>Duplicate check</span>
          <span style={{ color: accent }}>✓ Clear</span>
        </div>
        <div className="rounded-md py-1 text-center text-[9px] font-semibold text-black" style={{ background: accent }}>
          Import candidate
        </div>
      </div>
    </div>
  );
}

function Ops({ accent }: { accent: string }) {
  return (
    <div className="flex h-full flex-col gap-2.5 p-3">
      <div className="flex items-center justify-between">
        <div className="text-[10px] font-semibold text-white">Operations HQ</div>
        <div className="text-[8px] text-white/40">
          <span style={{ color: accent }}>●</span> Synced 2m ago
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          ["Revenue", "$84.2k", "Shopify"],
          ["New hires", "14", "Airtable"],
          ["Tickets", "37", "Zendesk"],
        ].map(([label, value, src]) => (
          <div key={label} className="rounded-lg border border-white/5 bg-white/[0.03] p-2">
            <div className="text-[8px] text-white/40">{label}</div>
            <div className="text-sm font-semibold text-white">{value}</div>
            <div className="text-[7px]" style={{ color: accent }}>
              via {src}
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1 overflow-hidden rounded-lg border border-white/5">
        {[
          ["Ebook — Growth Playbook", "Writing", "Asana"],
          ["Client onboarding call", "Scheduled", "Zoom"],
          ["Review response batch", "Done", "Trustpilot"],
          ["Memoir draft v3", "Editing", "Asana"],
        ].map(([task, status, src]) => (
          <div key={task} className="flex items-center justify-between border-b border-white/5 px-2 py-1.5 text-[8px]">
            <span className="text-white/75">{task}</span>
            <span className="text-white/40">
              {status} · {src}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Wallet({ accent }: { accent: string }) {
  return (
    <div className="flex h-full gap-3 p-3">
      <div className="flex w-1/2 flex-col gap-2">
        <div
          className="relative overflow-hidden rounded-xl p-3 text-black"
          style={{ background: `linear-gradient(135deg, ${accent}, #f97316)` }}
        >
          <div className="text-[8px] font-medium opacity-70">Total balance</div>
          <div className="text-base font-bold">$12,480.55</div>
          <div className="mt-3 flex justify-between text-[8px] font-medium opacity-70">
            <span>•••• 4021</span>
            <span>aPay</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {["Send", "Stake", "Card"].map((a) => (
            <div key={a} className="rounded-md bg-white/5 py-1 text-center text-[8px] text-white/70">
              {a}
            </div>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-1 text-[8px] text-white/50">
          <span style={{ color: accent }}>✓</span> KYC verified · 2FA on
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1.5">
        <div className="text-[8px] uppercase tracking-widest text-white/40">Assets</div>
        {[
          ["ABEY", "8,200", "+4.2%"],
          ["BTC", "0.084", "+1.1%"],
          ["ETH", "1.92", "-0.6%"],
          ["USDT", "2,150", "0.0%"],
        ].map(([sym, amt, chg]) => (
          <div key={sym} className="flex items-center justify-between rounded-md bg-white/[0.03] px-2 py-1.5 text-[9px]">
            <span className="font-semibold text-white">{sym}</span>
            <span className="text-white/60">{amt}</span>
            <span style={{ color: chg.startsWith("-") ? "#f87171" : accent }}>{chg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Calculator({ accent }: { accent: string }) {
  return (
    <div className="flex h-full gap-3 p-3">
      <div className="flex w-1/2 flex-col gap-3">
        {[
          ["Loan amount", "$25,000", 62],
          ["Interest rate", "7.4%", 38],
          ["Term", "48 months", 55],
        ].map(([label, value, pct]) => (
          <div key={label as string}>
            <div className="mb-1 flex justify-between text-[8px]">
              <span className="text-white/45">{label}</span>
              <span className="text-white">{value}</span>
            </div>
            <div className="relative h-1 rounded-full bg-white/10">
              <div className="h-1 rounded-full" style={{ width: `${pct}%`, background: accent }} />
              <div
                className="absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full border-2 bg-[#0d0f12]"
                style={{ left: `calc(${pct}% - 5px)`, borderColor: accent }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-1 flex-col rounded-lg border border-white/5 bg-white/[0.03] p-2.5">
        <div className="text-[8px] text-white/45">Monthly payment</div>
        <div className="text-lg font-bold" style={{ color: accent }}>
          $604.12
        </div>
        <div className="mt-auto flex h-12 items-end gap-0.5">
          {Array.from({ length: 16 }, (_, i) => (
            <div key={i} className="flex flex-1 flex-col justify-end">
              <div className="rounded-t-sm bg-white/15" style={{ height: `${10 + i * 2}px` }} />
              <div className="rounded-b-sm" style={{ height: `${40 - i * 2}px`, background: `${accent}99` }} />
            </div>
          ))}
        </div>
        <div className="mt-1 flex justify-between text-[7px] text-white/40">
          <span>Interest</span>
          <span>Principal</span>
        </div>
      </div>
    </div>
  );
}

export function ProductPreview({ kind, accent }: PreviewProps) {
  switch (kind) {
    case "dashboard":
      return <Dashboard accent={accent} />;
    case "scraper":
      return <Scraper accent={accent} />;
    case "inbox":
      return <Inbox accent={accent} />;
    case "sourcing":
      return <Sourcing accent={accent} />;
    case "ops":
      return <Ops accent={accent} />;
    case "wallet":
      return <Wallet accent={accent} />;
    case "calculator":
      return <Calculator accent={accent} />;
  }
}
