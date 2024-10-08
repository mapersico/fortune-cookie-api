import { Request, Response } from "express";
import { BaseController } from "../bases";
import { ChatAIServiceInstance } from "../services/chatAI.service";

class ChatAIController extends BaseController {
  public override readonly _route = "/chat-ai";
  private chatAIService = ChatAIServiceInstance;

  constructor() {
    super();
    this._initializeRoutes();
  }

  private async _initializeRoutes() {
    this.router.get(
      this._route.concat("/get-response-by-prompt"),
      this.asyncHandler(this._getResponseByPrompt.bind(this))
    );
  }

  private async _getResponseByPrompt(req: Request, res: Response) {
    const { plainText, prompt } = req.query;
    const parsedPrompt = prompt?.toString();

    if (parsedPrompt) {
      const result = await this.chatAIService.getTextByPrompt(parsedPrompt);
      if (plainText) res.status(200).send(result.text());
      else res.status(200).send(result);
    } else res.status(200).send("algo salio mal :(");
  }
}

export const ChatAIControllerInstance = new ChatAIController();
