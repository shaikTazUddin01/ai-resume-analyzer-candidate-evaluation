import api from "./api";

export const uploadResume = async (formData) => {
  const response = await api.post("/resumes/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getResumes = async () => {
  const response = await api.get("/resumes");
  return response.data.resumes;
};

export const getResumesByJob = async (jobId) => {
  const response = await api.get(`/resumes/job/${jobId}`);
  return response.data.resumes;
};

export const deleteResume = async (resumeId) => {
  const response = await api.delete(`/resumes/${resumeId}`);
  return response.data;
};