import { ArrowRight, CheckCircle2, Package, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-emerald-50/60">
      <div className="absolute -left-24 -top-24 -z-10 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="absolute -bottom-32 right-0 -z-10 h-96 w-96 rounded-full bg-teal-100 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:px-12 lg:py-24">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-medium text-emerald-800 shadow-sm">
            <ShieldCheck className="size-4" />
            Simple and reliable equipment rentals
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Find what you need.
            <span className="block text-emerald-700">
              Rent it when it matters.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Discover equipment for work, home, events, projects, and everyday
            needs from trusted providers in one convenient marketplace.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/equipments"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-700/20 transition hover:bg-emerald-800"
            >
              Browse equipment
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/user/become-provider"
              className="inline-flex items-center justify-center rounded-lg border border-emerald-700 bg-white px-6 py-3 font-semibold text-emerald-800 transition hover:bg-emerald-50"
            >
              List your equipment
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-700" />
              Flexible rental periods
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-700" />
              Secure online payments
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute -right-3 top-8 z-10 hidden items-center gap-3 rounded-xl border border-emerald-100 bg-white p-4 shadow-xl sm:flex">
            <div className="rounded-full bg-emerald-100 p-2 text-emerald-700">
              <Package className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Rent with confidence
              </p>
              <p className="text-xs text-slate-500">
                The right equipment, right when you need it
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border-8 border-white bg-emerald-100 shadow-2xl shadow-emerald-900/10">
            <Image
              src="/rentzquip.png"
              alt="Equipment available for rent"
              width={700}
              height={800}
              priority
              unoptimized
              className="h-[28rem] w-full object-cover object-center"
            />
            <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-slate-950/80 p-5 text-white backdrop-blur-sm">
              <p className="text-sm text-emerald-200">
                Your plans, your choice
              </p>
              <p className="mt-1 text-xl font-semibold">
                Find the equipment that gets the job done.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
