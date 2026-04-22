import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function searchGemini(query: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Sen bir arama motoru yardımcısısın. Kullanıcının şu sorusuna kısa ve öz bir cevap ver: ${query}`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Search Error:", error);
    return "Üzgünüm, şu an cevap veremiyorum. Lütfen internet bağlantınızı kontrol edin.";
  }
}

export async function translateText(text: string, targetLang: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Şu metni ${targetLang} diline çevir: ${text}`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Translation Error:", error);
    return "Çeviri sırasında bir hata oluştu.";
  }
}
