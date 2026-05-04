// AI-powered error handler utility
// Usage: await aiErrorHandler.handle(error, context)

export const aiErrorHandler = {
  async handle(error: any, context: string = "") {
    try {
      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `You are a motivating, spunky, and helpful assistant. A user encountered this error: "${error}" in the context: "${context}". Give a short, actionable, and positive suggestion to help them fix or avoid this problem. Respond with just the suggestion.`
        })
      });
      const data = await res.json();
      return data.answer || "Sorry, I couldn't generate a suggestion.";
    } catch (e) {
      return "Sorry, there was a problem connecting to the AI error handler.";
    }
  }
};
