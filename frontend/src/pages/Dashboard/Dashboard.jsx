import { useEffect, useState } from "react";
import { FiBriefcase, FiFileText, FiCheckCircle, FiStar } from "react-icons/fi";
import { getDashboardData } from "../../services/dashboard.service";

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const data = await getDashboardData();
        setAnalytics(data);
      } catch (error) {
        console.error("Dashboard API Error:", error);
        setAnalytics(null);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-slate-700 dark:text-slate-200">
        <p className="text-lg font-semibold">Loading dashboard...</p>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
        Failed to load dashboard data. Please make sure backend server is running
        and you are logged in.
      </div>
    );
  }

  const cards = [
    {
      title: "Total Jobs",
      value: analytics.totalJobs || 0,
      icon: FiBriefcase,
    },
    {
      title: "Total Resumes",
      value: analytics.totalResumes || 0,
      icon: FiFileText,
    },
    {
      title: "Analyzed Resumes",
      value: analytics.analyzedResumes || 0,
      icon: FiCheckCircle,
    },
    {
      title: "Shortlisted",
      value: analytics.shortlistedCandidates || 0,
      icon: FiStar,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Dashboard
        </h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Overview of resume analysis and candidate evaluation.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
                <Icon size={22} />
              </div>

              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {card.title}
              </p>

              <h2 className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">
                {card.value}
              </h2>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
            Recent Jobs
          </h2>

          {analytics.recentJobs?.length > 0 ? (
            <div className="space-y-3">
              {analytics.recentJobs.map((job) => (
                <div
                  key={job._id}
                  className="rounded-xl border border-slate-200 p-4 dark:border-slate-800"
                >
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {job.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Experience: {job.experienceLevel || "Not specified"}
                  </p>

                  <span className="mt-2 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-950 dark:text-green-300">
                    {job.status || "active"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 dark:text-slate-400">
              No jobs created yet.
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
            Recent Resumes
          </h2>

          {analytics.recentResumes?.length > 0 ? (
            <div className="space-y-3">
              {analytics.recentResumes.map((resume) => (
                <div
                  key={resume._id}
                  className="rounded-xl border border-slate-200 p-4 dark:border-slate-800"
                >
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {resume.candidateName}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {resume.candidateEmail}
                  </p>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    File: {resume.fileName}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 dark:text-slate-400">
              No resumes uploaded yet.
            </p>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
          Score Summary
        </h2>

        <div className="grid gap-4 sm:grid-cols-4">
          <MiniStat title="Average Score" value={analytics.averageScore || 0} />
          <MiniStat
            title="Average Match"
            value={`${analytics.averageMatchPercentage || 0}%`}
          />
          <MiniStat title="Highest Score" value={analytics.highestScore || 0} />
          <MiniStat title="Lowest Score" value={analytics.lowestScore || 0} />
        </div>
      </div>
    </div>
  );
};

const MiniStat = ({ title, value }) => {
  return (
    <div className="rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
      <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
      <h3 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
        {value}
      </h3>
    </div>
  );
};

export default Dashboard;