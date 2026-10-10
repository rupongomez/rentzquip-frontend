import {
  BadgeCheck,
  CalendarClock,
  CreditCard,
  Headphones,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";

export default function TrustFeatures() {
  const features = [
    {
      icon: BadgeCheck,
      title: "Trusted providers",
      description:
        "Browse equipment listed by providers who care about quality and reliability.",
    },
    {
      icon: CalendarClock,
      title: "Flexible rentals",
      description:
        "Choose rental dates that fit your project, event, work, or personal plans.",
    },
    {
      icon: CreditCard,
      title: "Secure payments",
      description:
        "Pay confidently through a secure checkout with clear rental pricing.",
    },
    {
      icon: Headphones,
      title: "Simple support",
      description:
        "Keep your rental experience straightforward from discovery to return.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20">
      <div className="absolute left-1/2 top-0 -z-0 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <ShieldCheck className="size-6" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Rent with confidence
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Everything you need for a better rental experience
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            RentzQuip makes it easier to find useful equipment, connect with
            providers, and manage every rental in one place.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-900/5"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-700 group-hover:text-white">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-5 font-semibold text-slate-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid overflow-hidden rounded-2xl bg-slate-950 sm:grid-cols-3">
          <div className="flex items-center gap-4 border-b border-white/10 px-6 py-5 sm:border-b-0 sm:border-r">
            <PackageCheck className="size-6 text-emerald-400" />
            <div>
              <p className="text-xl font-bold text-white">One marketplace</p>
              <p className="text-sm text-slate-400">For every kind of equipment</p>
            </div>
          </div>
          <div className="flex items-center gap-4 border-b border-white/10 px-6 py-5 sm:border-b-0 sm:border-r">
            <CalendarClock className="size-6 text-cyan-400" />
            <div>
              <p className="text-xl font-bold text-white">Your schedule</p>
              <p className="text-sm text-slate-400">Your dates, your rental plan</p>
            </div>
          </div>
          <div className="flex items-center gap-4 px-6 py-5">
            <ShieldCheck className="size-6 text-violet-400" />
            <div>
              <p className="text-xl font-bold text-white">Clear and simple</p>
              <p className="text-sm text-slate-400">From booking to return</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
