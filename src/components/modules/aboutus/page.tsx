import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Handshake,
  HeartHandshake,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import Link from "next/link";

const values = [
  {
    icon: ShieldCheck,
    title: "Trust comes first",
    description:
      "We make rental information clear so customers and providers can make confident decisions.",
  },
  {
    icon: HeartHandshake,
    title: "Built around people",
    description:
      "Every feature is designed to make sharing equipment easier, more practical, and more rewarding.",
  },
  {
    icon: BadgeCheck,
    title: "Simple by design",
    description:
      "From the first search to the final return, we remove unnecessary steps from the rental journey.",
  },
];

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Find what you need",
    description:
      "Explore equipment from providers and narrow your search to the right fit for your project.",
  },
  {
    number: "02",
    icon: CalendarDays,
    title: "Choose your dates",
    description:
      "Select a rental period that works for you and send a booking request in just a few steps.",
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Rent with confidence",
    description:
      "Track your booking, keep up with rental details, and return equipment as planned.",
  },
];

export default function AboutUsPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <section className="relative bg-slate-950">
        <div className="absolute -left-32 top-0 size-80 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute -right-20 bottom-0 size-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-12 lg:py-28">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
              About RentzQuip
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              The easier way to get the equipment you need.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              RentzQuip connects people who need equipment with providers who
              have it ready to share. We are building a more convenient,
              flexible, and accessible way to rent useful equipment.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/equipments"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                Browse equipment
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/user/become-provider"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-emerald-300 hover:text-emerald-300"
              >
                Become a provider
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-3 shadow-2xl backdrop-blur">
              <div className="rounded-2xl bg-white p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <Handshake className="size-6" />
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    Built to share
                  </span>
                </div>
                <h2 className="mt-6 text-2xl font-bold text-slate-950">
                  More access. Less hassle.
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  A marketplace where equipment can stay useful and customers
                  can get projects moving without buying everything outright.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-50 p-4">
                    <Users className="size-5 text-emerald-600" />
                    <p className="mt-3 text-sm font-semibold text-slate-900">
                      One community
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Customers and providers
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-4">
                    <CircleDollarSign className="size-5 text-cyan-600" />
                    <p className="mt-3 text-sm font-semibold text-slate-900">
                      Smarter value
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Rent only what you need
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Our purpose
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Making access more useful than ownership.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-7 text-slate-600">
            <p>
              Equipment is often essential for a short-term project, but
              purchasing and storing everything you need is not always
              practical. RentzQuip gives customers a simpler way to access
              reliable equipment when it matters.
            </p>
            <p>
              We also help providers turn underused equipment into opportunity.
              By bringing both sides together in one marketplace, we encourage
              useful sharing and make every rental easier to manage.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              What guides us
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              A marketplace made for confidence
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              We focus on the details that make renting feel clear, dependable,
              and worth coming back to.
            </p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {values.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-900/5"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              From search to return, kept simple.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map(({ number, icon: Icon, title, description }, index) => (
              <article
                key={number}
                className="relative rounded-2xl border border-slate-200 p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-slate-950 text-white">
                    <Icon className="size-5" />
                  </div>
                  <span className="text-sm font-bold text-emerald-600">
                    {number}
                  </span>
                </div>
                <h3 className="mt-5 font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {description}
                </p>
                {index < steps.length - 1 && (
                  <ArrowRight className="absolute -right-3 top-9 z-10 hidden size-5 bg-white text-emerald-500 md:block" />
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 sm:pb-20 lg:px-12">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-emerald-700 px-6 py-10 text-white sm:px-10 sm:py-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-100">
                Ready to get started?
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Find your next piece of equipment today.
              </h2>
              <p className="mt-3 text-sm leading-6 text-emerald-50">
                Explore the marketplace or join RentzQuip as a provider and make
                more possible with the equipment you already have.
              </p>
            </div>
            <Link
              href="/equipments"
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
            >
              Explore equipment
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
