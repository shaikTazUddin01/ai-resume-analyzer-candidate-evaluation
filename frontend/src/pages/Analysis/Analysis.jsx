import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FiCpu,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

import { getJobs } from "../../services/job.service";

import {
  analyzeJobResumes,
  getAnalysisByJob,
} from "../../services/analysis.service";

const Analysis = () => {
  const [jobs, setJobs] = useState([]);
  const [jobId, setJobId] = useState("");
  const [results, setResults] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [analyzing, setAnalyzing] =
    useState(false);

  /*
  |--------------------------------------------------------------------------
  | Load Jobs
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    async function loadJobs() {
      try {
        const jobData = await getJobs();

        setJobs(jobData || []);
      } catch (error) {
        console.error(error);

        toast.error(
          "Failed to load job criteria"
        );
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Select Job + Load Existing Analysis
  |--------------------------------------------------------------------------
  */

  const handleJobChange = async (
    selectedJobId
  ) => {
    setJobId(selectedJobId);
    setResults([]);

    if (!selectedJobId) {
      return;
    }

    try {
      const existingResults =
        await getAnalysisByJob(
          selectedJobId
        );

      setResults(
        existingResults || []
      );
    } catch (error) {
      console.error(
        "Load Analysis Error:",
        error
      );
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Analyze All Resumes
  |--------------------------------------------------------------------------
  */

  const handleAnalyzeAll = async () => {
    if (!jobId) {
      toast.error(
        "Please select a job first"
      );

      return;
    }

    try {
      setAnalyzing(true);

      const response =
        await analyzeJobResumes(jobId);

      setResults(
        response.results || []
      );

      toast.success(
        `${response.totalAnalyzed || 0} resumes analyzed successfully`
      );
    } catch (error) {
      console.error(
        "AI Analysis Error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "AI analysis failed"
      );
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}

      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Analysis Result
        </h1>

        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Select a job and analyze all
          uploaded resumes under that job.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Run Analysis */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-5 text-xl font-bold text-slate-900 dark:text-white">
            Run AI Analysis
          </h2>

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-900 dark:text-white">
                Select Job
              </label>

              <select
                value={jobId}
                onChange={(e) =>
                  handleJobChange(
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-800"
              >
                <option value="">
                  Select job criteria
                </option>

                {jobs.map((job) => (
                  <option
                    key={job._id}
                    value={job._id}
                  >
                    {job.title}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleAnalyzeAll}
              disabled={
                analyzing || !jobId
              }
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiCpu />

              {analyzing
                ? "Analyzing All Resumes..."
                : "Analyze All Resumes"}
            </button>
          </div>
        </div>

        {/* Analysis Results */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 xl:col-span-2">
          <h2 className="mb-5 text-xl font-bold text-slate-900 dark:text-white">
            AI Analysis Results
          </h2>

          {results.length > 0 ? (
            <div className="space-y-5">
              {results.map(
                (item) => (
                  <div
                    key={item._id}
                    className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800"
                  >
                    {/* Candidate Header */}

                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          {item.candidateName ||
                            "Not detected"}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          {item.candidateEmail ||
                            "Not detected"}
                        </p>

                        {item.candidatePhone &&
                          item.candidatePhone !==
                            "Not detected" && (
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                              {
                                item.candidatePhone
                              }
                            </p>
                          )}
                      </div>

                      <div className="md:text-right">
                        <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                          {item.matchPercentage ||
                            0}
                          %
                        </div>

                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Match Percentage
                        </p>
                      </div>
                    </div>

                    {/* Scores */}

                    <div className="mt-5 grid gap-4 md:grid-cols-3">
                      <StatBox
                        title="AI Score"
                        value={
                          item.aiScore || 0
                        }
                      />

                      <StatBox
                        title="Recommendation"
                        value={
                          item.recommendation ||
                          "Average"
                        }
                      />

                      <StatBox
                        title="Provider"
                        value={
                          item.aiProvider ||
                          "Gemini via n8n"
                        }
                      />
                    </div>

                    {/* Skills */}

                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <SkillBox
                        icon={
                          FiCheckCircle
                        }
                        title="Matched Skills"
                        skills={
                          item.matchedSkills
                        }
                      />

                      <SkillBox
                        icon={
                          FiAlertCircle
                        }
                        title="Missing Skills"
                        skills={
                          item.missingSkills
                        }
                        danger
                      />
                    </div>

                    {/* Education + Experience */}

                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <InfoBox
                        title="Education"
                        value={
                          item.education ||
                          "Not detected"
                        }
                      />

                      <InfoBox
                        title="Experience"
                        value={
                          item.experience ||
                          "Not detected"
                        }
                      />
                    </div>

                    {/* Summary */}

                    {item.summary && (
                      <div className="mt-5 rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
                        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                          {item.summary}
                        </p>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
              <p className="text-slate-500 dark:text-slate-400">
                {jobId
                  ? "No analysis results found."
                  : "Select a job to view analysis results."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/*
|--------------------------------------------------------------------------
| Stat Box
|--------------------------------------------------------------------------
*/

const StatBox = ({
  title,
  value,
}) => {
  return (
    <div className="rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        {title}
      </p>

      <h3 className="mt-1 font-bold text-slate-900 dark:text-white">
        {value}
      </h3>
    </div>
  );
};

/*
|--------------------------------------------------------------------------
| Skill Box
|--------------------------------------------------------------------------
*/

const SkillBox = ({
  icon: Icon,
  title,
  skills = [],
  danger = false,
}) => {
  return (
    <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
      <h4 className="mb-3 flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
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
            None
          </p>
        )}
      </div>
    </div>
  );
};

/*
|--------------------------------------------------------------------------
| Information Box
|--------------------------------------------------------------------------
*/

const InfoBox = ({
  title,
  value,
}) => {
  return (
    <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
      <p className="mb-1 text-sm font-semibold text-slate-900 dark:text-white">
        {title}
      </p>

      <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
        {value}
      </p>
    </div>
  );
};

export default Analysis;