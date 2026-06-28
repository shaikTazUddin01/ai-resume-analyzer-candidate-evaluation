const axios = require("axios");

const analyzeWithN8n = async ({ resumeText, jobCriteria, resumeId, jobId }) => {
  try {
    if (!process.env.N8N_WEBHOOK_URL) {
      return null;
    }

    const response = await axios.post(process.env.N8N_WEBHOOK_URL, {
      resumeId,
      jobId,
      resumeText,
      jobCriteria,
    });

    return response.data;
  } catch (error) {
    console.error("n8n workflow failed:", error.message);
    return null;
  }
};

module.exports = {
  analyzeWithN8n,
};