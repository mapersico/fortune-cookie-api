import { BaseService } from "../bases";

class ChatAIService extends BaseService {
  public async getTextByPrompt(prompt: string) {
    const result = await this.AIModel.generateContent(
      prompt.concat(". Response must not exceed the 500 characters")
    );

    return result.response;
  }
}

export const ChatAIServiceInstance = new ChatAIService();
