import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { FiCpu, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { getJobs } from "../../services/job.service";
import { getResumesByJob } from "../../services/resume.service";
import {
  analyzeResume,
  getAnalysisResults,
} from "../../services/analysis.service";

const Analysis = () => {
  const [jobs, setJobs] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [results, setResults] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState("");
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const watchedJobId = watch("jobId");

  useEffect(() => {
    async function loadInitialData() {
      try {
        const [jobData, analysisData] = await Promise.all([
          getJobs(),
          getAnalysisResults(),
        ]);

        setJobs(jobData || []);
        setResults(analysisData || []);
      } catch (error) {
        toast.error("Failed to load analysis page data");
      } finally {
        setLoading(false);
      }
    }

    loadInitialData();
  }, []);

  useEffect(() => {
    async function loadResumesByJob() {
      try {
        if (!watchedJobId) {
          setResumes([]);
          return;
        }

        setSelectedJobId(watchedJobId);
        const resumeData = await getResumesByJob(watchedJobId);
        setResumes(resumeData || []);
      } catch (error) {
        toast.error("Failed to load resumes for selected job");
      }
    }

    loadResumesByJob();
  }, [watchedJobId]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        jobId: data.jobId,
        resumeId: data.resumeId,
      };

      const res = await analyzeResume(payload);

      setResults((prev) => [res.analysis, ...prev]);
      toast.success("Resume analyzed successfully");

      reset({
        jobId: selectedJobId,
        resumeId: "",
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to analyze resume");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-slate-700 dark:text-slate-200">
        <p className="text-lg font-semibold">Loading analysis page...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Analysis Result
        </h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Analyze candidate resumes using AI and view evaluation results.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 xl:col-span-1">
          <h2 className="mb-5 text-xl font-bold text-slate-900 dark:text-white">
            Run AI Analysis
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Select Job
              </label>
              <select
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-800"
                {...register("jobId", { required: "Job is required" })}
              >
                <option value="">Select job criteria</option>
                {jobs.map((job) => (
                  <option key={job._id} value={job._id}>
                    {job.title}
                  </option>
                ))}
              </select>

              {errors.jobId && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.jobId.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Select Resume
              </label>
              <select
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-800"
                {...register("resumeId", { required: "Resume is required" })}
                disabled={!watchedJobId}
              >
                <option value="">
                  {watchedJobId ? "Select uploaded resume" : "Select job first"}
                </option>
                {resumes.map((resume) => (
                  <option key={resume._id} value={resume._id}>
                    {resume.candidateName} - {resume.candidateEmail}
                  </option>
                ))}
              </select>

              {errors.resumeId && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.resumeId.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-70"
            >
              <FiCpu />
              {isSubmitting ? "Analyzing..." : "Analyze Resume"}
            </button>
          </form>
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
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {item.candidateName}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {item.candidateEmail}
                      </p>
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Job: {item.jobId?.title || "N/A"}
                      </p>
                    </div>

                    <div className="text-left md:text-right">
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
                      color="green"
                    />
                    <SkillBox
                      icon={FiAlertCircle}
                      title="Missing Skills"
                      skills={item.missingSkills}
                      color="red"
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

const StatBox = ({ title, value }) => {
  return (
    <div className="rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
      <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
      <h3 className="mt-1 font-bold text-slate-900 dark:text-white">{value}</h3>
    </div>
  );
};

const SkillBox = ({ icon: Icon, title, skills = [], color }) => {
  const colorClass =
    color === "green"
      ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
      : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300";

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
              className={`rounded-full px-3 py-1 text-xs font-semibold ${colorClass}`}
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
};

export default Analysis;