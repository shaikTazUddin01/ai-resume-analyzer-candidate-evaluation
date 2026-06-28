const axios = require("axios");

const analyzeWithGemini = async ({ resumeText, jobCriteria }) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return null;
    }

    const prompt = `
You are an AI recruitment assistant.

Analyze the following candidate resume based on the given job criteria.

Job Criteria:
Title: ${jobCriteria.title}
Description: ${jobCriteria.description}
Required Skills: ${jobCriteria.requiredSkills.join(", ")}
Experience Level: ${jobCriteria.experienceLevel}

Resume Text:
${resumeText}

Return response as valid JSON only with these fields:
{
  "extractedSkills": [],
  "education": "",
  "experience": "",
  "matchedSkills": [],
  "missingSkills": [],
  "aiScore": 0,
  "matchPercentage": 0,
  "recommendation": "Recommended",
  "summary": ""
}
`;

    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
      process.env.GEMINI_API_KEY;

    const response = await axios.post(url, {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    });

    const text =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Gemini analysis failed:", error.message);
    return null;
  }
};

module.exports = {
  analyzeWithGemini,
};