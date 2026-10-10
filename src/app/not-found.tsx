export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-semibold text-emerald-600">404</p>

        <h1 className="mt-2 text-2xl font-bold text-slate-950">
          Page not found
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          The page you are looking for does not exist.
        </p>

        <a
          href="/"
          className="mt-6 inline-block rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Go home
        </a>
      </section>
    </main>
  );
}
