import api from "./api";

export const analyzeResume = async (payload) => {
  const response = await api.post("/analysis/analyze", payload);
  return response.data;
};

export const getAnalysisResults = async () => {
  const response = await api.get("/analysis");
  return response.data.results;
};

export const getAnalysisByJob = async (jobId) => {
  const response = await api.get(`/analysis/job/${jobId}`);
  return response.data.results;
};