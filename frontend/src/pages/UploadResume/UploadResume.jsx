import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { FiUpload, FiFileText, FiTrash2 } from "react-icons/fi";
import { getJobs } from "../../services/job.service";
import { deleteResume, getResumes, uploadResume } from "../../services/resume.service";

const UploadResume = () => {
  const [jobs, setJobs] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    async function loadData() {
      try {
        const [jobData, resumeData] = await Promise.all([getJobs(), getResumes()]);
        setJobs(jobData || []);
        setResumes(resumeData || []);
      } catch (error) {
        toast.error("Failed to load upload page data");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const onSubmit = async (data) => {
    try {
      const file = data.resumeFile?.[0];

      if (!file) {
        toast.error("Please select a resume file");
        return;
      }

      const formData = new FormData();
      formData.append("jobId", data.jobId);
      formData.append("candidateName", data.candidateName);
      formData.append("candidateEmail", data.candidateEmail);
      formData.append("phone", data.phone || "");
      formData.append("resumeFile", file);

      const res = await uploadResume(formData);

      setResumes((prev) => [res.resume, ...prev]);
      toast.success("Resume uploaded successfully");

      reset({
        jobId: "",
        candidateName: "",
        candidateEmail: "",
        phone: "",
        resumeFile: "",
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Resume upload failed");
    }
  };

  const handleDelete = async (resumeId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this resume?");
    if (!confirmDelete) return;

    try {
      await deleteResume(resumeId);
      setResumes((prev) => prev.filter((resume) => resume._id !== resumeId));
      toast.success("Resume deleted successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete resume");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-slate-700 dark:text-slate-200">
        <p className="text-lg font-semibold">Loading upload page...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Upload Resume
        </h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Upload candidate resumes for AI-based analysis.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 xl:col-span-1">
          <h2 className="mb-5 text-xl font-bold text-slate-900 dark:text-white">
            Resume Upload Form
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold">Select Job</label>
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
                <p className="mt-1 text-sm text-red-500">{errors.jobId.message}</p>
              )}
            </div>

            <Input
              label="Candidate Name"
              placeholder="Enter candidate name"
              error={errors.candidateName?.message}
              {...register("candidateName", {
                required: "Candidate name is required",
              })}
            />

            <Input
              label="Candidate Email"
              type="email"
              placeholder="Enter candidate email"
              error={errors.candidateEmail?.message}
              {...register("candidateEmail", {
                required: "Candidate email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email",
                },
              })}
            />

            <Input
              label="Phone"
              placeholder="Enter phone number"
              {...register("phone")}
            />

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Resume File
              </label>

              <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center dark:border-slate-700 dark:bg-slate-800">
                <FiUpload className="mx-auto mb-3 text-3xl text-indigo-600 dark:text-indigo-400" />
                <input
                  type="file"
                  accept=".pdf,.docx"
                  className="w-full cursor-pointer text-sm"
                  {...register("resumeFile", {
                    required: "Resume file is required",
                  })}
                />
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  Supported format: PDF / DOCX
                </p>
              </div>

              {errors.resumeFile && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.resumeFile.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-70"
            >
              {isSubmitting ? "Uploading..." : "Upload Resume"}
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 xl:col-span-2">
          <h2 className="mb-5 text-xl font-bold text-slate-900 dark:text-white">
            Uploaded Resumes
          </h2>

          {resumes.length > 0 ? (
            <div className="space-y-4">
              {resumes.map((resume) => (
                <div
                  key={resume._id}
                  className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <FiFileText className="text-indigo-600 dark:text-indigo-400" />
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          {resume.candidateName}
                        </h3>
                      </div>

                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {resume.candidateEmail}
                      </p>

                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Job: {resume.jobId?.title || "N/A"}
                      </p>

                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        File: {resume.fileName}
                      </p>

                      <span className="mt-3 inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold capitalize text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                        {resume.status || "uploaded"}
                      </span>
                    </div>

                    <button
                      onClick={() => handleDelete(resume._id)}
                      className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/40"
                    >
                      <FiTrash2 />
                      Delete
                    </button>
                  </div>
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

const Input = ({ label, error, ...props }) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold">{label}</label>
      <input
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-800"
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default UploadResume;