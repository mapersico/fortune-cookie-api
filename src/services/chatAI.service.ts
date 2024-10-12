import { BaseService } from "../bases";

class ChatAIService extends BaseService {
  public async getTextByPrompt(prompt: unknown, plainText?: boolean) {
    const parsedPrompt = (prompt as string)?.toString() || "";
    if (!parsedPrompt) return { code: 400, content: "Prompt is required" };

    const result = await this.AIModel.generateContent(
      parsedPrompt.concat(
        ". La respuesta no debe exceder los 500 caracteres."
      )
    );

    if (plainText) return { code: 200, content: result.response.text() };
    return { code: 200, content: result.response };
  }
}

export const ChatAIServiceInstance = new ChatAIService();
