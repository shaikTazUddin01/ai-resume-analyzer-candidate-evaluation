const fs = require("fs");
const path = require("path");
const pdf = require("pdf-parse");
const mammoth = require("mammoth");

const extractPdfText = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);

  const data = await pdf(dataBuffer);

  return data?.text?.trim() || "";
};

const extractDocxText = async (filePath) => {
  const result = await mammoth.extractRawText({
    path: filePath,
  });

  return result?.value?.trim() || "";
};

const extractResumeText = async (filePath) => {
  if (!filePath) {
    throw new Error("Resume file path is required");
  }

  if (!fs.existsSync(filePath)) {
    throw new Error(`Resume file not found: ${filePath}`);
  }

  const extension = path.extname(filePath).toLowerCase();

  let extractedText = "";

  if (extension === ".pdf") {
    extractedText = await extractPdfText(filePath);
  } else if (extension === ".docx") {
    extractedText = await extractDocxText(filePath);
  } else {
    throw new Error(
      "Unsupported resume format. Only PDF and DOCX are supported."
    );
  }

  if (!extractedText || extractedText.trim().length === 0) {
    throw new Error(
      `No readable text could be extracted from ${path.basename(filePath)}`
    );
  }

  return extractedText.trim();
};

module.exports = extractResumeText;