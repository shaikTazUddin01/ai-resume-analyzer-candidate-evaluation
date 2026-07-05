import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FiCheckSquare,
  FiRefreshCw,
  FiTrash2,
  FiUserCheck,
} from "react-icons/fi";
import { getJobs } from "../../services/job.service";
import {
  deleteShortlistRecord,
  generateShortlist,
  getShortlistByJob,
  updateShortlistStatus,
} from "../../services/shortlist.service";

const Shortlist = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState("");
  const [minimumScore, setMinimumScore] = useState(70);
  const [shortlist, setShortlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shortlistLoading, setShortlistLoading] = useState(false);

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
      setShortlist([]);

      if (!jobId) return;

      setShortlistLoading(true);
      const data = await getShortlistByJob(jobId);
      setShortlist(data || []);
    } catch (error) {
      toast.error("Failed to load shortlist");
    } finally {
      setShortlistLoading(false);
    }
  };

  const handleGenerateShortlist = async () => {
    if (!selectedJobId) {
      toast.error("Please select a job first");
      return;
    }

    try {
      setShortlistLoading(true);
      const res = await generateShortlist(selectedJobId, Number(minimumScore));
      setShortlist(res.shortlistedCandidates || []);
      toast.success("Shortlist generated successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to generate shortlist"
      );
    } finally {
      setShortlistLoading(false);
    }
  };

  const handleStatusChange = async (shortlistId, status) => {
    try {
      const res = await updateShortlistStatus(shortlistId, { status });
      setShortlist((prev) =>
        prev.map((item) =>
          item._id === shortlistId ? { ...item, status: res.shortlist.status } : item
        )
      );
      toast.success("Status updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    }
  };

  const handleDelete = async (shortlistId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this candidate from shortlist?"
    );

    if (!confirmDelete) return;

    try {
      await deleteShortlistRecord(shortlistId);
      setShortlist((prev) => prev.filter((item) => item._id !== shortlistId));
      toast.success("Shortlist record deleted successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete record");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-slate-700 dark:text-slate-200">
        <p className="text-lg font-semibold">Loading shortlist page...</p>
      </div>
    );
  }

  const selectedJob = jobs.find((job) => job._id === selectedJobId);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Shortlist
        </h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Generate and manage shortlisted candidates based on AI evaluation.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-4 lg:grid-cols-[1fr_180px_auto]">
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

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Minimum Score
            </label>
            <input
              type="number"
              value={minimumScore}
              min="0"
              max="100"
              onChange={(e) => setMinimumScore(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleGenerateShortlist}
              disabled={shortlistLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-70 lg:w-auto"
            >
              <FiRefreshCw />
              {shortlistLoading ? "Generating..." : "Generate Shortlist"}
            </button>
          </div>
        </div>

        {selectedJob && (
          <div className="mt-5 rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Selected Job:{" "}
              <span className="font-semibold text-slate-900 dark:text-white">
                {selectedJob.title}
              </span>
            </p>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-300">
            <FiCheckSquare size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Shortlisted Candidates
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Candidates who meet the selected AI score threshold.
            </p>
          </div>
        </div>

        {shortlistLoading ? (
          <p className="text-slate-500 dark:text-slate-400">
            Loading shortlist...
          </p>
        ) : shortlist.length > 0 ? (
          <div className="space-y-4">
            {shortlist.map((candidate) => (
              <div
                key={candidate._id}
                className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800"
              >
                <div className="grid gap-4 lg:grid-cols-[auto_1fr_auto] lg:items-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-600 text-xl font-bold text-white">
                    #{candidate.rank}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {candidate.candidateName}
                      </h3>

                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold capitalize text-green-700 dark:bg-green-950 dark:text-green-300">
                        {candidate.status || "shortlisted"}
                      </span>
                    </div>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {candidate.candidateEmail}
                    </p>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      AI Score: {candidate.aiScore} • Match:{" "}
                      {candidate.matchPercentage}%
                    </p>

                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                      {candidate.remarks}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                    <select
                      value={candidate.status || "shortlisted"}
                      onChange={(e) =>
                        handleStatusChange(candidate._id, e.target.value)
                      }
                      className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-800"
                    >
                      <option value="shortlisted">Shortlisted</option>
                      <option value="in-review">In Review</option>
                      <option value="selected">Selected</option>
                      <option value="rejected">Rejected</option>
                    </select>

                    <button
                      onClick={() => handleDelete(candidate._id)}
                      className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/40"
                    >
                      <FiTrash2 />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
            <FiUserCheck className="mx-auto mb-3 text-4xl text-slate-400" />
            <p className="text-slate-500 dark:text-slate-400">
              No shortlisted candidates found. Select a job and generate shortlist.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shortlist;