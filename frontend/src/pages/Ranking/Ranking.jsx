import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiAward, FiRefreshCw, FiStar } from "react-icons/fi";
import { getJobs } from "../../services/job.service";
import {
  generateRanking,
  getRankingByJob,
} from "../../services/ranking.service";

const Ranking = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState("");
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rankingLoading, setRankingLoading] = useState(false);

  useEffect(() => {
    async function loadJobs() {
      try {
        const jobData = await getJobs();
        setJobs(jobData || []);
      } catch (error) {
        toast.error("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, []);

  const handleJobChange = async (jobId) => {
    try {
      setSelectedJobId(jobId);
      setRanking([]);

      if (!jobId) return;

      setRankingLoading(true);
      const data = await getRankingByJob(jobId);
      setRanking(data || []);
    } catch (error) {
      toast.error("Failed to load ranking");
    } finally {
      setRankingLoading(false);
    }
  };

  const handleGenerateRanking = async () => {
    if (!selectedJobId) {
      toast.error("Please select a job first");
      return;
    }

    try {
      setRankingLoading(true);
      const res = await generateRanking(selectedJobId);
      setRanking(res.ranking || []);
      toast.success("Candidate ranking generated successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to generate ranking"
      );
    } finally {
      setRankingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-slate-700 dark:text-slate-200">
        <p className="text-lg font-semibold">Loading ranking page...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Candidate Ranking
        </h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Generate ranked candidate lists based on AI score and match percentage.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-4 md:grid-cols-[1fr_auto]">
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Select Job Criteria
            </label>
            <select
              value={selectedJobId}
              onChange={(e) => handleJobChange(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-800"
            >
              <option value="">Select job</option>
              {jobs.map((job) => (
                <option key={job._id} value={job._id}>
                  {job.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleGenerateRanking}
              disabled={rankingLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-70 md:w-auto"
            >
              <FiRefreshCw />
              {rankingLoading ? "Generating..." : "Generate Ranking"}
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
            <FiAward size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Ranking List
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Highest matched candidates will appear first.
            </p>
          </div>
        </div>

        {rankingLoading ? (
          <p className="text-slate-500 dark:text-slate-400">
            Loading ranking...
          </p>
        ) : ranking.length > 0 ? (
          <div className="space-y-4">
            {ranking.map((candidate) => (
              <div
                key={candidate.analysisId}
                className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800"
              >
                <div className="grid gap-4 md:grid-cols-[auto_1fr_auto] md:items-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-xl font-bold text-white">
                    #{candidate.rank}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {candidate.candidateName}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {candidate.candidateEmail}
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Job: {candidate.jobTitle || "N/A"}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {candidate.matchedSkills?.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-950 dark:text-green-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-left md:text-right">
                    <div className="flex items-center gap-2 text-3xl font-bold text-indigo-600 dark:text-indigo-400 md:justify-end">
                      <FiStar />
                      {candidate.matchPercentage || 0}%
                    </div>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      AI Score: {candidate.aiScore || 0}
                    </p>
                    <span className="mt-2 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                      {candidate.recommendation || "Average"}
                    </span>
                  </div>
                </div>

                {candidate.summary && (
                  <div className="mt-4 rounded-xl bg-slate-100 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {candidate.summary}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400">
              No ranking data found. Select a job and generate ranking.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ranking;