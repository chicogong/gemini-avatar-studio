import { GoogleGenAI } from "@google/genai";
import { AvatarStyle } from "../types";

// Initialize the Gemini API client
// The API key is injected automatically via process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-2.5-flash-image';

/**
 * Generates a single avatar based on the prompt and style.
 */
const generateSingleAvatar = async (prompt: string, style: AvatarStyle): Promise<string> => {
  // Enhanced prompt engineering for better composition
  const fullPrompt = `Generate a professional, high-quality avatar image (1:1 aspect ratio).
  
  CORE SUBJECT: ${prompt}
  ART STYLE: ${style}
  
  COMPOSITION RULES:
  - Subject's face/head must be centered and clearly visible.
  - Good spacing around the subject (not too zoomed in).
  - Clean, aesthetic background that complements the subject.
  - Professional lighting and shading.
  - High resolution details.
  - NO text, NO watermarks, NO multiple faces (unless specified).
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            text: fullPrompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
        }
      }
    });

    // Iterate through parts to find the image data
    if (response.candidates && response.candidates.length > 0) {
      const parts = response.candidates[0].content.parts;
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          const base64Data = part.inlineData.data;
          const mimeType = part.inlineData.mimeType || 'image/png';
          return `data:${mimeType};base64,${base64Data}`;
        }
      }
    }
    
    throw new Error("No image data found in response");

  } catch (error) {
    console.error("Error generating avatar:", error);
    throw error;
  }
};

/**
 * Generates multiple avatars in parallel.
 */
export const generateAvatars = async (
  prompt: string, 
  style: AvatarStyle, 
  count: number
): Promise<string[]> => {
  // Create an array of promises to run in parallel
  const promises = Array.from({ length: count }, () => generateSingleAvatar(prompt, style));
  
  const results = await Promise.all(promises);
  return results;
};