import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { FiBriefcase, FiTrash2 } from "react-icons/fi";
import { createJob, deleteJob, getJobs } from "../../services/job.service";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      experienceLevel: "Entry Level",
      employmentType: "Full Time",
    },
  });

  useEffect(() => {
    async function fetchJobs() {
      try {
        const data = await getJobs();
        setJobs(data || []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        requiredSkills: data.requiredSkills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      };

      const res = await createJob(payload);

      setJobs((prev) => [res.job, ...prev]);
      toast.success("Job criteria created successfully");
      reset({
        title: "",
        description: "",
        requiredSkills: "",
        experienceLevel: "Entry Level",
        employmentType: "Full Time",
        location: "",
        salaryRange: "",
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create job");
    }
  };

  const handleDelete = async (jobId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");

    if (!confirmDelete) return;

    try {
      await deleteJob(jobId);
      setJobs((prev) => prev.filter((job) => job._id !== jobId));
      toast.success("Job deleted successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete job");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Job Criteria
        </h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Create job requirements for AI-based resume evaluation.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-5 text-xl font-bold text-slate-900 dark:text-white">
            Create Job Criteria
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Job Title"
              placeholder="e.g. Frontend Developer"
              error={errors.title?.message}
              {...register("title", { required: "Job title is required" })}
            />

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Job Description
              </label>
              <textarea
                rows="4"
                placeholder="Enter job description"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-800"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            <Input
              label="Required Skills"
              placeholder="React, Node.js, MongoDB"
              error={errors.requiredSkills?.message}
              {...register("requiredSkills", {
                required: "Required skills are required",
              })}
            />

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Experience Level
              </label>
              <select
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-800"
                {...register("experienceLevel")}
              >
                <option>Entry Level</option>
                <option>Mid Level</option>
                <option>Senior Level</option>
                <option>Expert</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Employment Type
              </label>
              <select
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-800"
                {...register("employmentType")}
              >
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Internship</option>
                <option>Contract</option>
                <option>Remote</option>
              </select>
            </div>

            <Input
              label="Location"
              placeholder="e.g. Dhaka"
              {...register("location")}
            />

            <Input
              label="Salary Range"
              placeholder="e.g. 30000-50000 BDT"
              {...register("salaryRange")}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-70"
            >
              {isSubmitting ? "Saving..." : "Save Job Criteria"}
            </button>
          </form>
        </div>

        <div className="xl:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-5 text-xl font-bold text-slate-900 dark:text-white">
            Job Criteria List
          </h2>

          {loading ? (
            <p className="text-slate-500 dark:text-slate-400">Loading jobs...</p>
          ) : jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <FiBriefcase className="text-indigo-600 dark:text-indigo-400" />
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          {job.title}
                        </h3>
                      </div>

                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {job.description}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {job.requiredSkills?.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                        {job.experienceLevel} • {job.employmentType} •{" "}
                        {job.location || "Not specified"}
                      </div>
                    </div>

                    <button
                      onClick={() => handleDelete(job._id)}
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
                No job criteria created yet.
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

export default Jobs;