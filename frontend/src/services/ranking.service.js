import api from "./api";

export const generateRanking = async (jobId) => {
  const response = await api.post(`/ranking/generate/${jobId}`);
  return response.data;
};

export const getRankingByJob = async (jobId) => {
  const response = await api.get(`/ranking/job/${jobId}`);
  return response.data.ranking;
};