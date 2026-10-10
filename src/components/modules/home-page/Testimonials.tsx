import { Quote, Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "RentzQuip made it easy to find the equipment I needed for a weekend project without buying something I would rarely use.",
      name: "Maya R.",
      role: "Home project renter",
    },
    {
      quote:
        "The rental process feels clear from start to finish. I could compare options, choose my dates, and manage everything in one place.",
      name: "Daniel K.",
      role: "Event organizer",
    },
    {
      quote:
        "Listing my equipment gives it more value between projects. The provider experience keeps my inventory and rentals organized.",
      name: "Alex T.",
      role: "Equipment provider",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20">
      <div className="absolute left-1/2 top-16 size-80 -translate-x-1/2 rounded-full bg-emerald-50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <Quote className="size-6" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Why people choose RentzQuip
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Built around better rental experiences
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Whether you are renting for a day or listing equipment for others,
            the right marketplace makes everything feel simpler.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map(({ quote, name, role }) => (
            <Card
              key={name}
              className="border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-900/5"
            >
              <CardContent className="flex h-full flex-col p-6 sm:p-7">
                <div className="flex items-center gap-1 text-amber-500">
                  {["one", "two", "three", "four", "five"].map((star) => (
                    <Star key={star} className="size-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 text-base leading-7 text-slate-700">
                  “{quote}”
                </blockquote>
                <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                  <div className="flex size-10 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-700">
                    {name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-950">{name}</p>
                    <p className="text-sm text-slate-500">{role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
