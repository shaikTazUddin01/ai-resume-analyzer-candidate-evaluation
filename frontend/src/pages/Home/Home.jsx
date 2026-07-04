const Home = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
            AI-Powered Recruitment Platform
          </p>

          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
            Analyze Resumes, Rank Candidates & Create Shortlists Faster
          </h1>

          <p className="mb-8 text-lg text-slate-600 dark:text-slate-300">
            A smart candidate evaluation system for HR teams using Gemini AI,
            n8n automation, and intelligent resume analysis.
          </p>

          <div className="flex gap-4">
            <a href="/login" className="rounded-xl bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700">
              Get Started
            </a>
            <a href="/register" className="rounded-xl border border-slate-300 px-6 py-3 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-900">
              Create Account
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-100 p-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-800">
            <h3 className="mb-4 text-xl font-semibold">AI Candidate Score</h3>
            <div className="mb-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700">
              <div className="h-4 w-[85%] rounded-full bg-indigo-600"></div>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              Match Percentage: 85%
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;