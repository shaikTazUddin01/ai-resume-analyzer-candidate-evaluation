import api from "./api";

export const generateShortlist = async (jobId, minimumScore = 70) => {
  const response = await api.post(`/shortlist/generate/${jobId}`, {
    minimumScore,
  });

  return response.data;
};

export const getShortlistByJob = async (jobId) => {
  const response = await api.get(`/shortlist/job/${jobId}`);
  return response.data.shortlist;
};

export const updateShortlistStatus = async (shortlistId, payload) => {
  const response = await api.put(`/shortlist/${shortlistId}/status`, payload);
  return response.data;
};

export const deleteShortlistRecord = async (shortlistId) => {
  const response = await api.delete(`/shortlist/${shortlistId}`);
  return response.data;
};