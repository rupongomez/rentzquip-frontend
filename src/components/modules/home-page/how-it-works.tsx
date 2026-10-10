import {
  ArrowRight,
  CalendarCheck,
  ClipboardList,
  Search,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Find the right equipment",
      description:
        "Search through equipment from trusted providers and compare options that fit your needs.",
    },
    {
      number: "02",
      icon: CalendarCheck,
      title: "Choose your rental dates",
      description:
        "Select the dates and rental details that work for your project, event, or everyday plans.",
    },
    {
      number: "03",
      icon: ClipboardList,
      title: "Rent and get it done",
      description:
        "Complete your booking securely, use the equipment, and manage your rental in one place.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-20">
      <div className="absolute -right-24 top-12 size-72 rounded-full bg-emerald-100/70 blur-3xl" />
      <div className="absolute -bottom-32 -left-24 size-80 rounded-full bg-cyan-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <ShieldCheck className="size-6" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Renting equipment is simple
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            From finding the right gear to completing your rental, RentzQuip
            keeps every step clear and convenient.
          </p>
        </div>

        <div className="relative mt-12 grid gap-5 lg:grid-cols-3">
          <div className="absolute left-[16.5%] right-[16.5%] top-11 hidden border-t border-dashed border-emerald-200 lg:block" />

          {steps.map(({ number, icon: Icon, title, description }) => (
            <article
              key={number}
              className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-900/5 sm:p-7"
            >
              <div className="relative flex items-center justify-between">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-lg shadow-emerald-700/20">
                  <Icon className="size-6" />
                </div>
                <span className="text-4xl font-bold tracking-tight text-emerald-100">
                  {number}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-semibold text-slate-950">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl bg-slate-950 px-6 py-6 text-center sm:flex-row sm:px-8 sm:text-left">
          <div>
            <p className="text-lg font-semibold text-white">
              Ready to find your next rental?
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Browse equipment and get started today.
            </p>
          </div>
          <Link
            href="/equipments"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            Browse equipment
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
