import { Mail, Settings } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-12">
        <div className="max-w-sm">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xl font-bold text-white"
          >
            <Settings className="size-5 text-emerald-400" />
            RentzQuip
          </Link>
          <p className="mt-4 text-sm leading-6 text-slate-400">
            A simple marketplace for finding, renting, and sharing the equipment
            you need.
          </p>
          <a
            href="mailto:support@rentzquip.com"
            className="mt-5 inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-emerald-400"
          >
            <Mail className="size-4" />
            support@rentzquip.com
          </a>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
            Explore
          </h2>
          <nav className="mt-4 flex flex-col gap-3 text-sm">
            <Link href="/" className="transition hover:text-emerald-400">
              Home
            </Link>
            <Link
              href="/about-us"
              className="transition hover:text-emerald-400"
            >
              About us
            </Link>
            <Link
              href="/equipments"
              className="transition hover:text-emerald-400"
            >
              Browse equipment
            </Link>
          </nav>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
            For providers
          </h2>
          <nav className="mt-4 flex flex-col gap-3 text-sm">
            <Link
              href="/user/become-provider"
              className="transition hover:text-emerald-400"
            >
              Become a provider
            </Link>
            <Link
              href="/register"
              className="transition hover:text-emerald-400"
            >
              Create an account
            </Link>
            <Link href="/login" className="transition hover:text-emerald-400">
              Sign in
            </Link>
          </nav>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
            Stay connected
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-400">
            Follow RentzQuip for updates and rental tips.
          </p>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p>© {new Date().getFullYear()} RentzQuip. All rights reserved.</p>
          <p>Rent smarter. Make more possible.</p>
        </div>
      </div>
    </footer>
  );
}
