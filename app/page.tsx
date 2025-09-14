import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-900">

      <section className="text-center py-20 px-6">
        <h1 className="text-5xl font-extrabold tracking-tight">
          Manage Buyer Leads <span className="text-blue-600">Smarter</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Capture, track, and close buyer leads in one simple dashboard.
          No setup required — sign up and start using instantly.
        </p>
        <div className="mt-8 flex gap-3 justify-center">
          <Link href={"/signup"}><button className="text-white bg-gray-800 hover:bg-gray-900 hover:cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5">Sign Up</button></Link>
          <Link href={"/signin"}><button className="border hover:bg-slate-200 hover:cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5">Log In</button></Link>
        </div>
      </section>

      <section className="mt-24 px-6 max-w-6xl mx-auto grid gap-12 md:grid-cols-3">
        {[
          {
            title: "Lead Intake Form",
            desc: "Easily capture buyer details like budget, city, and property type in one place.",
          },
          {
            title: "Smart Filters",
            desc: "Find the right leads fast with city, timeline, and property type filters.",
          },
          {
            title: "Buyer History",
            desc: "Track updates and changes over time so you never lose context.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="mt-3 text-gray-600">{item.desc}</p>
          </div>
        ))}
      </section>

    </main>
  );
}
