import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiUpload, FiFileText, FiTrash2 } from "react-icons/fi";
import { getJobs } from "../../services/job.service";
import {
  deleteResume,
  getResumes,
  uploadResume,
} from "../../services/resume.service";

const UploadResume = () => {
  const [jobs, setJobs] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [jobId, setJobId] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [jobData, resumeData] = await Promise.all([getJobs(), getResumes()]);
        setJobs(jobData || []);
        setResumes(resumeData || []);
      } catch {
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!jobId) return toast.error("Please select a job criteria");
    if (!files.length) return toast.error("Please select resume files");

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("jobId", jobId);

      files.forEach((file) => {
        formData.append("resumeFiles", file);
      });

      const res = await uploadResume(formData);

      if (res.resumes) {
        setResumes((prev) => [...res.resumes, ...prev]);
      } else if (res.resume) {
        setResumes((prev) => [res.resume, ...prev]);
      }

      toast.success("Resume uploaded successfully");
      setFiles([]);
      e.target.reset();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Resume upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (resumeId) => {
    if (!window.confirm("Delete this resume?")) return;

    try {
      await deleteResume(resumeId);
      setResumes((prev) => prev.filter((resume) => resume._id !== resumeId));
      toast.success("Resume deleted successfully");
    } catch {
      toast.error("Failed to delete resume");
    }
  };

  if (loading) {
    return <p className="text-slate-600 dark:text-slate-300">Loading...</p>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Upload Resume
        </h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Select job criteria and upload multiple resumes for AI analysis.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-5 text-xl font-bold text-slate-900 dark:text-white">
            Resume Upload
          </h2>

          <form onSubmit={handleUpload} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Select Job Criteria
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

            <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-slate-700 dark:bg-slate-800">
              <FiUpload className="mx-auto mb-4 text-4xl text-indigo-600 dark:text-indigo-400" />
              <input
                type="file"
                multiple
                accept=".pdf,.docx"
                onChange={(e) => setFiles(Array.from(e.target.files))}
                className="w-full cursor-pointer text-sm"
              />
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                Multiple PDF / DOCX resumes supported
              </p>
            </div>

            {files.length > 0 && (
              <div className="rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
                <p className="mb-2 text-sm font-semibold">
                  Selected Files: {files.length}
                </p>
                <div className="space-y-1">
                  {files.map((file) => (
                    <p key={file.name} className="truncate text-sm text-slate-500">
                      {file.name}
                    </p>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={uploading}
              className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-70"
            >
              {uploading ? "Uploading..." : "Upload Resumes"}
            </button>
          </form>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 xl:col-span-2">
          <h2 className="mb-5 text-xl font-bold text-slate-900 dark:text-white">
            Uploaded Resumes
          </h2>

          {resumes.length > 0 ? (
            <div className="space-y-4">
              {resumes.map((resume) => (
                <div
                  key={resume._id}
                  className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 p-5 dark:border-slate-800"
                >
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
                      <FiFileText />
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">
                        {resume.fileName || "Resume File"}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Job: {resume.jobId?.title || "N/A"}
                      </p>
                      <span className="mt-3 inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold capitalize text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                        {resume.status || "uploaded"}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(resume._id)}
                    className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/40"
                  >
                    <FiTrash2 />
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
              <p className="text-slate-500 dark:text-slate-400">
                No resumes uploaded yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadResume;