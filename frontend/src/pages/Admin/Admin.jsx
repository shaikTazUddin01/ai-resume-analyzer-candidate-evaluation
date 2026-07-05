import { useEffect, useState } from "react";
import {
  FiActivity,
  FiBriefcase,
  FiCpu,
  FiDatabase,
  FiFileText,
  FiRefreshCw,
  FiServer,
  FiShield,
  FiUsers,
} from "react-icons/fi";
import { getDashboardData } from "../../services/dashboard.service";

const Admin = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAdminData() {
      try {
        const data = await getDashboardData();
        setAnalytics(data);
      } catch (error) {
        console.error("Admin data error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAdminData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">
          Loading admin panel...
        </p>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Jobs",
      value: analytics?.totalJobs || 0,
      icon: FiBriefcase,
    },
    {
      title: "Total Resumes",
      value: analytics?.totalResumes || 0,
      icon: FiFileText,
    },
    {
      title: "Analyzed Resumes",
      value: analytics?.analyzedResumes || 0,
      icon: FiCpu,
    },
    {
      title: "Shortlisted",
      value: analytics?.shortlistedCandidates || 0,
      icon: FiUsers,
    },
  ];

  const systemStatus = [
    {
      title: "Backend Server",
      status: "Operational",
      icon: FiServer,
    },
    {
      title: "MongoDB Database",
      status: "Connected",
      icon: FiDatabase,
    },
    {
      title: "JWT Security",
      status: "Enabled",
      icon: FiShield,
    },
    {
      title: "AI Analysis Engine",
      status: "Ready",
      icon: FiActivity,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Admin Panel
          </h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Monitor system activity, recruitment data, and backend service
            status.
          </p>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          <FiRefreshCw />
          Refresh Data
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
                <Icon size={22} />
              </div>

              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {item.title}
              </p>

              <h2 className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">
                {item.value}
              </h2>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-5 text-xl font-bold text-slate-900 dark:text-white">
            System Status
          </h2>

          <div className="space-y-4">
            {systemStatus.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-4 dark:border-slate-800"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
                      <Icon size={20} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Service health check
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-950 dark:text-green-300">
                    {item.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-5 text-xl font-bold text-slate-900 dark:text-white">
            Score Overview
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <Metric
              title="Average Score"
              value={analytics?.averageScore || 0}
            />
            <Metric
              title="Average Match"
              value={`${analytics?.averageMatchPercentage || 0}%`}
            />
            <Metric
              title="Highest Score"
              value={analytics?.highestScore || 0}
            />
            <Metric title="Lowest Score" value={analytics?.lowestScore || 0} />
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-5 text-xl font-bold text-slate-900 dark:text-white">
            Recent Jobs
          </h2>

          {analytics?.recentJobs?.length > 0 ? (
            <div className="space-y-4">
              {analytics.recentJobs.map((job) => (
                <div
                  key={job._id}
                  className="rounded-xl border border-slate-200 p-4 dark:border-slate-800"
                >
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {job.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {job.experienceLevel || "Not specified"} •{" "}
                    {job.status || "active"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <Empty text="No recent jobs found." />
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-5 text-xl font-bold text-slate-900 dark:text-white">
            Top Candidates
          </h2>

          {analytics?.topCandidates?.length > 0 ? (
            <div className="space-y-4">
              {analytics.topCandidates.map((candidate) => (
                <div
                  key={candidate._id}
                  className="rounded-xl border border-slate-200 p-4 dark:border-slate-800"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {candidate.candidateName}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {candidate.candidateEmail}
                      </p>
                    </div>

                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                      {candidate.matchPercentage || 0}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Empty text="No candidate analytics available." />
          )}
        </div>
      </div>
    </div>
  );
};

const Metric = ({ title, value }) => {
  return (
    <div className="rounded-xl bg-slate-100 p-5 dark:bg-slate-800">
      <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
      <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
        {value}
      </h3>
    </div>
  );
};

const Empty = ({ text }) => {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
      <p className="text-slate-500 dark:text-slate-400">{text}</p>
    </div>
  );
};

export default Admin;