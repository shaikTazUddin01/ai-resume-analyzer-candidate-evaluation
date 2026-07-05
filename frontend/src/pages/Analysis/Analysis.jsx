import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiCpu, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { getJobs } from "../../services/job.service";
import { getResumesByJob } from "../../services/resume.service";
import {
  analyzeResume,
  getAnalysisResults,
} from "../../services/analysis.service";

const Analysis = () => {
  const [jobs, setJobs] = useState([]);
  const [results, setResults] = useState([]);
  const [jobId, setJobId] = useState("");
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [jobData, analysisData] = await Promise.all([
          getJobs(),
          getAnalysisResults(),
        ]);
        setJobs(jobData || []);
        setResults(analysisData || []);
      } catch {
        toast.error("Failed to load analysis data");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const handleBulkAnalyze = async () => {
    if (!jobId) return toast.error("Please select a job");

    try {
      setAnalyzing(true);

      const resumes = await getResumesByJob(jobId);

      if (!resumes || resumes.length === 0) {
        toast.error("No resumes found under this job");
        return;
      }

      const responses = await Promise.all(
        resumes.map((resume) =>
          analyzeResume({
            jobId,
            resumeId: resume._id,
          })
        )
      );

      const newResults = responses.map((res) => res.analysis);

      setResults((prev) => [...newResults, ...prev]);
      toast.success(`${newResults.length} resumes analyzed successfully`);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Bulk analysis failed");
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) {
    return <p className="text-slate-600 dark:text-slate-300">Loading...</p>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Analysis Result
        </h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Select a job and analyze all uploaded resumes under that job.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-5 text-xl font-bold text-slate-900 dark:text-white">
            Run AI Analysis
          </h2>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Select Job
              </label>
              <select
                value={jobId}
                onChange={(e) => setJobId(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-800"
              >
                <option value="">Select job criteria</option>
                {jobs.map((job) => (
                  <option key={job._id} value={job._id}>
                    {job.title}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleBulkAnalyze}
              disabled={analyzing}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-70"
            >
              <FiCpu />
              {analyzing ? "Analyzing All Resumes..." : "Analyze All Resumes"}
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 xl:col-span-2">
          <h2 className="mb-5 text-xl font-bold text-slate-900 dark:text-white">
            AI Analysis Results
          </h2>

          {results.length > 0 ? (
            <div className="space-y-5">
              {results.map((item) => (
                <div
                  key={item._id}
                  className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800"
                >
                  <div className="flex justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {item.candidateName}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Job: {item.jobId?.title || "N/A"}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                        {item.matchPercentage || 0}%
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Match Percentage
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-3">
                    <StatBox title="AI Score" value={item.aiScore || 0} />
                    <StatBox
                      title="Recommendation"
                      value={item.recommendation || "Average"}
                    />
                    <StatBox title="Provider" value={item.aiProvider || "fallback"} />
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <SkillBox
                      icon={FiCheckCircle}
                      title="Matched Skills"
                      skills={item.matchedSkills}
                    />
                    <SkillBox
                      icon={FiAlertCircle}
                      title="Missing Skills"
                      skills={item.missingSkills}
                      danger
                    />
                  </div>

                  {item.summary && (
                    <div className="mt-5 rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        {item.summary}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
              <p className="text-slate-500 dark:text-slate-400">
                No analysis results found.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatBox = ({ title, value }) => (
  <div className="rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
    <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
    <h3 className="mt-1 font-bold text-slate-900 dark:text-white">{value}</h3>
  </div>
);

const SkillBox = ({ icon: Icon, title, skills = [], danger }) => (
  <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
    <h4 className="mb-3 flex items-center gap-2 font-semibold">
      <Icon />
      {title}
    </h4>

    <div className="flex flex-wrap gap-2">
      {skills?.length > 0 ? (
        skills.map((skill) => (
          <span
            key={skill}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              danger
                ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                : "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
            }`}
          >
            {skill}
          </span>
        ))
      ) : (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          No skills detected
        </p>
      )}
    </div>
  </div>
);

export default Analysis;