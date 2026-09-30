import { createOpenRouter } from "@openrouter/ai-sdk-provider";

export function getAgentModel() {
    const provider = createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY });
    const medelID = process.env.OPENROUTER_DEFAULT_MODEL ?? "openrouter/free";
    return provider(medelID);
}