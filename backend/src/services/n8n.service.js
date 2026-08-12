const axios = require("axios");

const runResumeAnalysisWorkflow = async (payload) => {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error("N8N_WEBHOOK_URL is not configured");
  }

  try {
    const response = await axios.post(webhookUrl, payload, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: Number(process.env.N8N_TIMEOUT) || 120000,
    });

    if (!response.data) {
      throw new Error("n8n returned an empty response");
    }

    return response.data;
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      throw new Error("AI analysis timed out");
    }

    if (error.response) {
      throw new Error(
        error.response.data?.message ||
          `n8n workflow failed with status ${error.response.status}`
      );
    }

    throw new Error(error.message || "Failed to connect with n8n workflow");
  }
};

module.exports = {
  runResumeAnalysisWorkflow,
};