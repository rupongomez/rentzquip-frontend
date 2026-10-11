import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

const contactOptions = [
  {
    icon: Mail,
    title: "Email us",
    description: "For general questions and account support",
    value: "support@rentzquip.com",
    href: "mailto:support@rentzquip.com",
  },
  {
    icon: Phone,
    title: "Call our team",
    description: "Monday to Friday, 9:00 AM - 6:00 PM",
    value: "+1 (800) 555-0198",
    href: "tel:+18005550198",
  },
  {
    icon: MapPin,
    title: "Our location",
    description: "Serving customers and providers everywhere",
    value: "Available online worldwide",
    href: "#message-form",
  },
];

const faqs = [
  {
    question: "Need help with a booking?",
    answer:
      "Include your rental or equipment details in your message so our team can help you faster.",
  },
  {
    question: "Want to list your equipment?",
    answer:
      "Visit our provider page to learn how to turn your available equipment into a new opportunity.",
  },
  {
    question: "Have a payment question?",
    answer:
      "Contact us with your account email and booking details. Never share your password or card number.",
  },
];

export default function ContactUsPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <section className="relative bg-slate-950">
        <div className="absolute -left-24 -top-24 size-80 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute -bottom-32 right-0 size-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <div className="max-w-3xl">
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
              <MessageCircle className="size-4" />
              Contact RentzQuip
            </p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              We&apos;re here to help you move forward.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Have a question about renting, listing equipment, or managing your
              account? Send us a message and our team will help you find the
              right answer.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="grid gap-4 md:grid-cols-3">
          {contactOptions.map(
            ({ icon: Icon, title, description, value, href }) => (
              <a
                key={title}
                href={href}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-900/5"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-700 group-hover:text-white">
                  <Icon className="size-5" />
                </div>
                <h2 className="mt-5 font-semibold text-slate-950">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {description}
                </p>
                <p className="mt-4 text-sm font-semibold text-emerald-700">
                  {value}
                </p>
              </a>
            ),
          )}
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Send a message
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Tell us how we can help.
            </h2>
            <p className="mt-4 max-w-md text-base leading-7 text-slate-600">
              Share a few details about your question. The more context you
              provide, the faster we can point you in the right direction.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <Clock3 className="mt-0.5 size-5 shrink-0 text-emerald-700" />
                <div>
                  <p className="font-semibold text-slate-900">
                    Quick, thoughtful support
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Our team reviews messages during business hours and aims to
                    respond as soon as possible.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-emerald-700" />
                <div>
                  <p className="font-semibold text-slate-900">
                    Your information stays private
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    We only use your contact details to respond to your request.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form
            id="message-form"
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-slate-900"
                >
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/15"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-900"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/15"
                />
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="subject"
                className="text-sm font-medium text-slate-900"
              >
                What can we help with?
              </label>
              <select
                id="subject"
                name="subject"
                defaultValue=""
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/15"
              >
                <option value="" disabled>
                  Select a topic
                </option>
                <option value="booking">Booking or rental</option>
                <option value="provider">Provider account</option>
                <option value="payment">Payment question</option>
                <option value="account">Account help</option>
                <option value="other">Something else</option>
              </select>
            </div>

            <div className="mt-5">
              <label
                htmlFor="message"
                className="text-sm font-medium text-slate-900"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder="Tell us a little more..."
                className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/15"
              />
            </div>

            <button
              type="submit"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Send message
              <Send className="size-4" />
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Common questions
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Before you write to us
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {faqs.map(({ question, answer }) => (
              <article
                key={question}
                className="rounded-2xl border border-slate-200 p-5"
              >
                <h3 className="font-semibold text-slate-900">{question}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 sm:pb-20 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-3xl bg-emerald-700 px-6 py-10 text-white sm:px-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Prefer to find the answer yourself?
            </h2>
            <p className="mt-2 text-sm text-emerald-50">
              Explore available equipment and discover what RentzQuip can do for
              your next project.
            </p>
          </div>
          <Link
            href="/equipments"
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
          >
            Browse equipment
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
