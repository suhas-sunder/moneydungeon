// app/routes/_index.tsx  (or the route that matches your ./+types/home)
import { useLoaderData } from "react-router";
import type { Route } from "./+types/home";
import { json } from "@remix-run/node";

export function meta({}: Route.MetaArgs) {
  const title = "Money Dungeon | Money Learning Games and Financial Education";
  const description =
    "Money Dungeon offers fun money learning games and practical financial education. Learn budgeting, saving, investing, credit, taxes, and personal finance basics with interactive lessons and quizzes.";
  const url = "https://moneydungeon.com/";
  return [
    { title },
    { name: "description", content: description },
    {
      name: "keywords",
      content:
        "money games, money learning games, financial education, personal finance, budgeting, saving, investing, credit score, taxes, compound interest, kids finance, teen money, financial literacy",
    },
    { name: "robots", content: "index, follow, max-image-preview:large" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: `${url}og-image.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "theme-color", content: "#0E7A5F" },
    { rel: "canonical", href: url },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return json({
    message: context.VALUE_FROM_EXPRESS,
    nowISO: new Date().toISOString(),
  });
}

export default function Home({}: Route.ComponentProps) {
  const { message, nowISO } = useLoaderData<typeof loader>();

  const faqs = [
    {
      q: "What is Money Dungeon?",
      a: "An educational site with money learning games and step by step lessons on budgeting, saving, investing, credit, taxes, and personal finance basics.",
    },
    {
      q: "Who is it for?",
      a: "Beginners, students, and busy adults who want practical, bite size financial literacy. Parents and teachers can use it in class or at home.",
    },
    {
      q: "Are the games free?",
      a: "Yes. Core games and lessons are free. Premium printables and extended challenges may arrive later.",
    },
    {
      q: "What will I learn first?",
      a: "Budget setup, emergency fund planning, debt payoff methods, how interest works, and how to compare savings and investment options.",
    },
  ];

  const gameList = [
    "Budget Boss",
    "Save the Treasure",
    "Interest Quest",
    "Credit Score Climb",
    "Tax Trail",
    "Investors’ Lab",
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "Money Dungeon",
        url: "https://moneydungeon.com/",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://moneydungeon.com/?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        name: "Money Dungeon",
        url: "https://moneydungeon.com/",
        logo: "https://moneydungeon.com/logo.png",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "ItemList",
        name: "Money Learning Games",
        itemListElement: gameList.map((name, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: name,
        })),
      },
    ],
  };

  return (
    <main className="bg-white text-neutral-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Announcement bar */}
      <div className="w-full border-b border-neutral-200 bg-emerald-50">
        <div className="mx-auto max-w-6xl px-4 py-2 text-sm text-neutral-700">
          New lessons arriving soon. Last updated{" "}
          {new Date(nowISO).toLocaleDateString()}.
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-10">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-extrabold tracking-tight">
              <span className="text-emerald-800">Money Dungeon</span>{" "}
              <span className="text-amber-600">Learn. Play. Prosper.</span>
            </h1>
            <p className="mt-4 text-lg text-neutral-700">
              Turn financial literacy into an adventure. Play money learning
              games, follow step by step lessons, and build real world skills in
              budgeting, saving, credit, taxes, and investing.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#games"
                className="inline-flex items-center rounded-xl border border-emerald-700 bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                Play Money Games
              </a>
              <a
                href="#learn"
                className="inline-flex items-center rounded-xl border border-amber-500 bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800 hover:bg-amber-200"
              >
                Start Financial Lessons
              </a>
            </div>
          </div>

          {/* Hero card */}
          <div className="w-full max-w-md">
            <div className="rounded-2xl border border-amber-300 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-base font-semibold text-emerald-900">
                Today’s Quest
              </h2>
              <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-neutral-800">
                <li>Set a simple 50-30-20 budget</li>
                <li>Calculate one month emergency fund</li>
                <li>Try a 60 second compound interest demo</li>
              </ol>
              <p className="mt-2 text-xs text-neutral-500">
                No spam. Unsubscribe any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              t: "Game Based Learning",
              d: "Interactive money games make budgeting, saving, and investing clear and memorable.",
            },
            {
              t: "Real World Skills",
              d: "Set goals, track spending, read statements, and compare financial products with confidence.",
            },
            {
              t: "Short Lessons",
              d: "Bite size guides and checklists that fit a busy day, with quizzes that reinforce key ideas.",
            },
          ].map((c) => (
            <article
              key={c.t}
              className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm"
            >
              <h3 className="text-base font-semibold text-emerald-900">
                {c.t}
              </h3>
              <p className="mt-2 text-sm text-neutral-700">{c.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Games */}
      <section id="games" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-emerald-900">
          Money Learning Games
        </h2>
        <p className="mt-2 text-neutral-700">
          Learn by doing. These mini games teach the core of personal finance
          with immediate feedback and simple goals.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Budget Boss",
              desc: "Create a monthly plan, sort needs and wants, and keep savings on track.",
            },
            {
              name: "Save the Treasure",
              desc: "Build an emergency fund by balancing fixed bills and variable expenses.",
            },
            {
              name: "Interest Quest",
              desc: "See how simple and compound interest grow money across months and years.",
            },
            {
              name: "Credit Score Climb",
              desc: "Make on time payments, manage utilization, and handle credit safely.",
            },
            {
              name: "Tax Trail",
              desc: "Understand income, deductions, and basic filing choices with clean examples.",
            },
            {
              name: "Investors’ Lab",
              desc: "Compare risk and reward, diversify, and test long term thinking.",
            },
          ].map((g) => (
            <article
              key={g.name}
              className="rounded-2xl border border-amber-300 bg-amber-50 p-5 shadow-sm"
            >
              <h3 className="text-base font-semibold text-amber-800">
                {g.name}
              </h3>
              <p className="mt-2 text-sm text-neutral-800">{g.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Lessons */}
      <section id="learn" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-emerald-900">
          Financial Education Lessons
        </h2>
        <p className="mt-2 text-neutral-700">
          Follow structured learning paths. Each path includes short readings,
          checklists, and a quick quiz.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Budgeting Basics",
              items: [
                "50-30-20 rule",
                "Zero based budget",
                "Cash flow calendar",
              ],
            },
            {
              title: "Saving and Goals",
              items: [
                "Emergency fund",
                "Sinking funds",
                "Automation checklist",
              ],
            },
            {
              title: "Debt and Credit",
              items: ["APR vs. APY", "Credit utilization", "Payoff methods"],
            },
            {
              title: "Investing 101",
              items: ["Index funds", "Risk tolerance", "Time horizon"],
            },
            {
              title: "Banking Smart",
              items: [
                "Checking vs. savings",
                "Fees and interest",
                "Transfers and holds",
              ],
            },
            {
              title: "Taxes Simplified",
              items: [
                "Income types",
                "Deductions basics",
                "Withholding overview",
              ],
            },
          ].map((c) => (
            <article
              key={c.title}
              className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
            >
              <h3 className="text-base font-semibold text-emerald-900">
                {c.title}
              </h3>
              <ul className="mt-2 list-inside list-disc text-sm text-neutral-800">
                {c.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Tools */}
      <section id="tools" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-emerald-900">
          Free Money Tools
        </h2>
        <p className="mt-2 text-neutral-700">
          Simple calculators and planners help you apply lessons right away.
          Export results and build a weekly habit.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            {
              t: "Budget Planner",
              d: "Track income, fixed costs, and flexible spending with savings targets.",
            },
            {
              t: "Interest Calculator",
              d: "Compare simple and compound interest with monthly contributions.",
            },
            {
              t: "Debt Payoff Helper",
              d: "Snowball vs. avalanche comparisons with timeline previews.",
            },
          ].map((x) => (
            <article
              key={x.t}
              className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm"
            >
              <h3 className="text-base font-semibold text-emerald-900">
                {x.t}
              </h3>
              <p className="mt-2 text-sm text-neutral-700">{x.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Audience segments */}
      <section id="who" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-emerald-900">
          Who Will Benefit
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            {
              t: "Students",
              d: "Get clear on money basics before your first job. Build smart habits early.",
            },
            {
              t: "Busy Adults",
              d: "Short lessons and quick wins that fit a packed week.",
            },
            {
              t: "Parents and Teachers",
              d: "Use games and printables to teach financial literacy with confidence.",
            },
          ].map((p) => (
            <article
              key={p.t}
              className="rounded-2xl border border-amber-300 bg-amber-50 p-5 shadow-sm"
            >
              <h3 className="text-base font-semibold text-amber-800">{p.t}</h3>
              <p className="mt-2 text-sm text-neutral-800">{p.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Glossary */}
      <section id="glossary" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-emerald-900">Money Glossary</h2>
        <p className="mt-2 text-neutral-700">
          Clear definitions help you read statements, compare offers, and make
          decisions.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            {
              t: "APR",
              d: "The yearly cost of borrowing, including interest and some fees.",
            },
            {
              t: "APY",
              d: "The yearly rate of return that accounts for compounding.",
            },
            {
              t: "Principal",
              d: "The original amount of money borrowed or invested.",
            },
            {
              t: "Asset Allocation",
              d: "The mix of investments that balances risk and return.",
            },
          ].map((g) => (
            <article
              key={g.t}
              className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm"
            >
              <h3 className="text-sm font-semibold text-emerald-900">{g.t}</h3>
              <p className="mt-1 text-sm text-neutral-700">{g.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Social proof */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="grid gap-6 text-center sm:grid-cols-3">
            <div>
              <div className="text-3xl font-extrabold text-emerald-800">
                Practical
              </div>
              <div className="mt-1 text-sm text-neutral-600">
                Action steps you can use today
              </div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-amber-600">
                Understandable
              </div>
              <div className="mt-1 text-sm text-neutral-600">
                Plain language and real examples
              </div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-emerald-800">
                Flexible
              </div>
              <div className="mt-1 text-sm text-neutral-600">
                Short sessions and steady progress
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1) Budget Methods Comparison */}
      <section id="budget-methods" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-emerald-900">
          Budget Methods Compared
        </h2>
        <p className="mt-3 text-neutral-700">
          Learn the difference between the 50-30-20 rule, zero based budgeting,
          envelope budgeting, and pay-yourself-first. Pick a method that matches
          your income, fixed expenses, and savings goals.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              t: "50-30-20",
              d: "Simple split of needs, wants, and savings. Great for beginners.",
            },
            {
              t: "Zero Based",
              d: "Give every dollar a job. Strong control for variable spending.",
            },
            {
              t: "Envelopes",
              d: "Allocate by category. Visual guardrails for groceries and dining.",
            },
            {
              t: "Pay Yourself First",
              d: "Automate savings at payday. Build emergency funds faster.",
            },
          ].map((x) => (
            <article
              key={x.t}
              className="rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm"
            >
              <h3 className="text-base font-semibold text-emerald-900">
                {x.t}
              </h3>
              <p className="mt-1 text-sm text-neutral-700">{x.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 2) Compound Interest Explainer */}
      <section id="compound-interest" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-emerald-900">
          Compound Interest, APY, and Growth
        </h2>
        <p className="mt-3 text-neutral-700">
          Understand how principal, rate, compounding frequency, and time work
          together. Compare APY vs APR and see why starting early matters for
          long term goals.
        </p>
        <ul className="mt-4 list-inside list-disc text-neutral-800">
          <li>Simple vs compound interest with monthly deposits</li>
          <li>APY and compounding frequency explained</li>
          <li>Inflation and real return basics</li>
        </ul>
        <div className="mt-4 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-neutral-800">
          Quick tip: automate a small recurring transfer to capture compounding
          without decision fatigue.
        </div>
      </section>

      {/* 3) Credit Score Factors */}
      <section id="credit-score" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-emerald-900">
          Credit Score Factors and Healthy Habits
        </h2>
        <p className="mt-3 text-neutral-700">
          Build a strong credit profile by focusing on payment history,
          utilization, age of accounts, mix of credit, and new inquiries.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            {
              t: "Payment History",
              d: "On time payments protect score strength.",
            },
            {
              t: "Utilization",
              d: "Keep balances below 30 percent of limits.",
            },
            { t: "Age", d: "Older accounts help; avoid unnecessary closures." },
            { t: "Mix", d: "Installment and revolving accounts add depth." },
            { t: "Inquiries", d: "Batch rate shopping within short windows." },
          ].map((x) => (
            <article
              key={x.t}
              className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm"
            >
              <h3 className="text-sm font-semibold text-emerald-900">{x.t}</h3>
              <p className="mt-1 text-sm text-neutral-700">{x.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 4) Taxes Basics */}
      <section id="taxes-basics" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-emerald-900">
          Taxes Made Simple
        </h2>
        <p className="mt-3 text-neutral-700">
          Learn income types, filing status, deductions vs credits, and
          withholding. Understand how marginal brackets work and why tax
          planning is part of a good budget.
        </p>
        <ul className="mt-4 list-inside list-disc text-neutral-800">
          <li>W-2, 1099, and interest income at a glance</li>
          <li>Standard deduction vs itemizing</li>
          <li>Refunds, balances due, and paycheck adjustments</li>
        </ul>
      </section>

      {/* 5) Investing Myths and Facts */}
      <section id="investing-myths" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-emerald-900">
          Investing Myths vs Facts
        </h2>
        <p className="mt-3 text-neutral-700">
          Clear up common misunderstandings about risk, diversification, time
          horizon, and fees. Use low cost, diversified approaches that match
          your goals.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <article className="rounded-2xl border border-amber-300 bg-amber-50 p-4 shadow-sm">
            <h3 className="font-semibold text-amber-800">Myth</h3>
            <p className="mt-1 text-neutral-800">
              You need a lot of money to start investing.
            </p>
            <h3 className="mt-3 font-semibold text-emerald-900">Fact</h3>
            <p className="mt-1 text-neutral-700">
              Small automated contributions build real balances over time
              through compounding.
            </p>
          </article>
          <article className="rounded-2xl border border-amber-300 bg-amber-50 p-4 shadow-sm">
            <h3 className="font-semibold text-amber-800">Myth</h3>
            <p className="mt-1 text-neutral-800">
              Timing the market is required for success.
            </p>
            <h3 className="mt-3 font-semibold text-emerald-900">Fact</h3>
            <p className="mt-1 text-neutral-700">
              Time in the market and diversification matter more than perfect
              entry points.
            </p>
          </article>
        </div>
      </section>

      {/* 6) Financial Safety Checklist */}
      <section id="financial-safety" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-emerald-900">
          Financial Safety and Fraud Prevention
        </h2>
        <p className="mt-3 text-neutral-700">
          Protect accounts and identity with simple safeguards. Review
          statements, use strong passwords, and recognize common scam patterns.
        </p>
        <ul className="mt-4 list-inside list-disc text-neutral-800">
          <li>Two factor authentication and secure password managers</li>
          <li>Freeze credit when not applying for new credit</li>
          <li>Verify senders and avoid urgent payment requests</li>
        </ul>
      </section>

      {/* 7) Kids and Teens Money Lab */}
      <section id="kids-teens" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-emerald-900">
          Kids and Teens Money Lab
        </h2>
        <p className="mt-3 text-neutral-700">
          Fun activities that teach earning, saving, sharing, and smart
          spending. Use allowance trackers, goal jars, and simple interest
          games.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            {
              t: "Allowance Tracker",
              d: "Connect chores to goals and savings.",
            },
            { t: "Goal Jar Game", d: "Split between spend, save, and give." },
            { t: "Mini Market", d: "Practice price comparison and change." },
          ].map((x) => (
            <article
              key={x.t}
              className="rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm"
            >
              <h3 className="text-sm font-semibold text-emerald-900">{x.t}</h3>
              <p className="mt-1 text-sm text-neutral-700">{x.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 8) Classroom Resources */}
      <section id="classroom" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-emerald-900">
          Classroom Resources for Financial Literacy
        </h2>
        <p className="mt-3 text-neutral-700">
          Ready to use lesson outlines, printable worksheets, and quick quizzes
          that help teachers introduce budgeting, saving, credit, and investing.
        </p>
        <ul className="mt-4 list-inside list-disc text-neutral-800">
          <li>Bell-ringer warmups and exit tickets</li>
          <li>Group budgeting challenges with roles</li>
          <li>Rubrics and answer keys for fast grading</li>
        </ul>
      </section>

      {/* 9) Money Habits Playbook */}
      <section id="money-habits" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-emerald-900">
          Money Habits Playbook
        </h2>
        <p className="mt-3 text-neutral-700">
          Build consistent habits that lower stress and improve savings. Use
          automation, weekly reviews, and small guardrails that prevent
          overspending.
        </p>
        <div className="mt-4 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-neutral-800">
          Starter habits: schedule a 10 minute money check every Sunday, then
          raise your automated transfer by one percent after each paycheck.
        </div>
      </section>

      {/* 10) Banking and Fees */}
      <section id="banking-fees" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-emerald-900">
          Smart Banking and Lower Fees
        </h2>
        <p className="mt-3 text-neutral-700">
          Learn how checking, savings, and high-yield accounts work. Spot common
          fees and choose features that match your habits.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            {
              t: "Direct Deposit",
              d: "Faster access to paychecks and easy automation.",
            },
            {
              t: "ATM Network",
              d: "Reduce out-of-network fees with partner access.",
            },
            {
              t: "Alerts",
              d: "Balance and transaction alerts prevent overdrafts.",
            },
          ].map((x) => (
            <article
              key={x.t}
              className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm"
            >
              <h3 className="text-sm font-semibold text-emerald-900">{x.t}</h3>
              <p className="mt-1 text-sm text-neutral-700">{x.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 11) Money Glossary, Extended */}
      <section id="glossary-extended" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-emerald-900">
          Money Glossary, Extended
        </h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            {
              t: "Emergency Fund",
              d: "Cash buffer for surprise expenses and income gaps.",
            },
            {
              t: "Dollar-Cost Averaging",
              d: "Invest fixed amounts on a schedule to reduce timing risk.",
            },
            {
              t: "Expense Ratio",
              d: "Annual fund fee that reduces your return.",
            },
            {
              t: "Sinking Fund",
              d: "Save for known future costs like travel or car repairs.",
            },
          ].map((g) => (
            <article
              key={g.t}
              className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm"
            >
              <h3 className="text-sm font-semibold text-emerald-900">{g.t}</h3>
              <p className="mt-1 text-sm text-neutral-700">{g.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 12) Editorial Roadmap */}
      <section id="roadmap" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-emerald-900">
          Editorial Roadmap
        </h2>
        <p className="mt-3 text-neutral-700">
          Coming soon: interactive quizzes, printable planners, video
          walkthroughs, and deeper guides on budgeting, credit scores, index
          funds, and tax basics.
        </p>
        <div className="mt-4 rounded-2xl border border-emerald-200 bg-white p-4 text-sm text-neutral-700">
          Check the Money Learning Games section for new releases and updates.
        </div>
      </section>

      {/* 13) Debt Management */}
      <section id="debt-management" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-emerald-900">
          Debt Management and Payoff Strategies
        </h2>
        <p className="mt-3 text-neutral-700">
          Learn how to reduce debt stress and save money on interest. Compare
          the snowball and avalanche methods, balance transfers, and refinancing
          options.
        </p>
        <ul className="mt-4 list-inside list-disc text-neutral-800">
          <li>Snowball: pay off smallest debts first for quick wins</li>
          <li>Avalanche: tackle highest interest rates to save more</li>
          <li>Consolidation and balance transfer cards explained</li>
        </ul>
      </section>

      {/* 14) Retirement Basics */}
      <section id="retirement" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-emerald-900">
          Retirement Accounts and Planning
        </h2>
        <p className="mt-3 text-neutral-700">
          Understand the basics of 401(k), IRA, and Roth IRA accounts. Learn
          about employer matches, contribution limits, and early withdrawal
          penalties.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            {
              t: "401(k)",
              d: "Employer sponsored plan, often includes matching contributions.",
            },
            {
              t: "Traditional IRA",
              d: "Tax deferred contributions with income phaseouts.",
            },
            {
              t: "Roth IRA",
              d: "Tax free growth and withdrawals in retirement.",
            },
          ].map((x) => (
            <article
              key={x.t}
              className="rounded-2xl border border-amber-300 bg-amber-50 p-4 shadow-sm"
            >
              <h3 className="font-semibold text-amber-800">{x.t}</h3>
              <p className="mt-1 text-sm text-neutral-800">{x.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 15) Side Hustles and Earning */}
      <section id="side-hustles" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-emerald-900">
          Side Hustles and Income Growth
        </h2>
        <p className="mt-3 text-neutral-700">
          Boost your income with part-time work, freelancing, or digital
          projects. Use extra cash to accelerate savings, pay down debt, or
          invest.
        </p>
        <ul className="mt-4 list-inside list-disc text-neutral-800">
          <li>Freelance services like writing, design, or tutoring</li>
          <li>Reselling and e-commerce basics</li>
          <li>Small business tax considerations</li>
        </ul>
      </section>

      {/* 16) Emergency Preparedness */}
      <section id="emergency-prep" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-emerald-900">
          Emergency Funds and Preparedness
        </h2>
        <p className="mt-3 text-neutral-700">
          Build a financial safety net for medical bills, job loss, or
          unexpected repairs. Start small and grow toward three to six months of
          expenses.
        </p>
        <div className="mt-4 rounded-2xl border border-emerald-200 bg-white p-4 text-sm text-neutral-700">
          Tip: automate a fixed transfer every payday into a separate high-yield
          savings account.
        </div>
      </section>

      {/* 17) Insurance Basics */}
      <section id="insurance" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-emerald-900">
          Insurance and Risk Management
        </h2>
        <p className="mt-3 text-neutral-700">
          Learn how health, auto, home, renters, and life insurance work.
          Protect your savings by transferring large risks to affordable
          policies.
        </p>
        <ul className="mt-4 list-inside list-disc text-neutral-800">
          <li>Deductibles and premiums explained</li>
          <li>When term life insurance makes sense</li>
          <li>Why renters insurance is affordable protection</li>
        </ul>
      </section>

      {/* 18) Inflation and Purchasing Power */}
      <section id="inflation" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-emerald-900">
          Inflation and Buying Power
        </h2>
        <p className="mt-3 text-neutral-700">
          See how inflation reduces the value of money over time. Learn
          strategies to protect purchasing power with interest bearing accounts
          and investments.
        </p>
        <div className="mt-4 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-neutral-800">
          Inflation example: $100 today may buy only $82 of goods ten years
          later at 2% annual inflation.
        </div>
      </section>

      {/* 19) College and Student Loans */}
      <section id="student-loans" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-emerald-900">
          College Costs and Student Loan Strategies
        </h2>
        <p className="mt-3 text-neutral-700">
          Compare federal vs private loans, repayment plans, and forgiveness
          programs. Learn how to lower costs with scholarships, grants, and
          community college transfers.
        </p>
        <ul className="mt-4 list-inside list-disc text-neutral-800">
          <li>Income driven repayment explained</li>
          <li>Public Service Loan Forgiveness basics</li>
          <li>Interest subsidies and deferment rules</li>
        </ul>
      </section>

      {/* 20) Advanced Investing */}
      <section id="advanced-investing" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-emerald-900">
          Advanced Investing Concepts
        </h2>
        <p className="mt-3 text-neutral-700">
          Move beyond the basics with diversification, asset allocation, ETFs,
          and rebalancing. Understand risk vs return and how to plan long term.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            {
              t: "ETFs",
              d: "Low-cost funds that track indexes with built-in diversification.",
            },
            {
              t: "Rebalancing",
              d: "Adjust allocations back to targets as markets shift.",
            },
            {
              t: "Risk Tolerance",
              d: "Match investments to your age, goals, and comfort.",
            },
          ].map((x) => (
            <article
              key={x.t}
              className="rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm"
            >
              <h3 className="text-sm font-semibold text-emerald-900">{x.t}</h3>
              <p className="mt-1 text-sm text-neutral-700">{x.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 21) Financial Literacy for Teens */}
      <section id="teens" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-emerald-900">
          Financial Literacy for Teens
        </h2>
        <p className="mt-3 text-neutral-700">
          Lessons on budgeting allowance, opening a first bank account, using
          debit safely, and avoiding debt traps. Build lifelong habits early.
        </p>
        <ul className="mt-4 list-inside list-disc text-neutral-800">
          <li>Set savings goals with clear timelines</li>
          <li>Learn basics of credit before college</li>
          <li>Track spending with simple apps or journals</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className="rounded-2xl border border-emerald-700 bg-emerald-700 p-6 shadow-sm">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold text-white">
                Start your money quest
              </h2>
              <p className="mt-1 text-sm text-emerald-50">
                Play a game, take a lesson, and make one smart change this week.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-2xl font-bold text-emerald-900">FAQ</h2>
        <div className="mt-6 divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white shadow-sm">
          {faqs.map((f) => (
            <details key={f.q} className="group open:bg-emerald-50">
              <summary className="cursor-pointer list-none px-5 py-4 font-medium">
                {f.q}
              </summary>
              <div className="px-5 pb-5 text-neutral-700">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-amber-50">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-neutral-700">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <div>© {new Date().getFullYear()} Money Dungeon</div>
            <div className="text-neutral-500">
              {message ? (
                <span aria-live="polite">{message}</span>
              ) : (
                <span>Built for clear financial literacy</span>
              )}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
