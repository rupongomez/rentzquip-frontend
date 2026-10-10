import {
  ArrowRight,
  CheckCircle2,
  HandCoins,
  PackagePlus,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProviderCTA() {
  return (
    <section className="relative overflow-hidden bg-emerald-700 py-16 sm:py-20">
      <div className="absolute -right-24 -top-24 size-80 rounded-full bg-emerald-500/40 blur-3xl" />
      <div className="absolute -bottom-32 -left-20 size-96 rounded-full bg-teal-900/30 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-800/40 px-4 py-2 text-sm font-medium text-emerald-50">
            <HandCoins className="size-4" />
            Share more. Earn more.
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Turn your unused equipment into opportunity
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-emerald-50/85 sm:text-lg">
            List your equipment on RentzQuip, connect with people who need it,
            and grow your rental business with a simple provider experience.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/user/become-provider"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-emerald-800 shadow-lg shadow-emerald-950/15 transition hover:bg-emerald-50"
            >
              Become a provider
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/equipments"
              className="inline-flex items-center justify-center rounded-lg border border-emerald-200/60 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600"
            >
              Explore the marketplace
            </Link>
          </div>

          <div className="mt-8 grid gap-3 text-sm text-emerald-50/90 sm:grid-cols-3">
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-200" />
              Reach more renters
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-200" />
              Manage your listings
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-200" />
              Build trust over time
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -left-4 -top-4 z-10 flex items-center gap-3 rounded-2xl border border-emerald-100/60 bg-white p-4 shadow-xl sm:-left-8">
            <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <PackagePlus className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                List with confidence
              </p>
              <p className="text-xs text-slate-500">
                Keep your equipment working
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border-8 border-white/20 bg-emerald-100 shadow-2xl shadow-emerald-950/20">
            <Image
              src="/equipment-placeholder.png"
              alt="Equipment available to list for rent"
              width={650}
              height={520}
              unoptimized
              className="h-80 w-full object-cover object-center sm:h-96"
            />
            <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-slate-950/80 p-5 text-white backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-emerald-300" />
                <div>
                  <p className="font-semibold">
                    A marketplace built for providers
                  </p>
                  <p className="mt-1 text-sm text-slate-300">
                    Keep control of your equipment and rental availability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
