import { Translator } from "deepl-node";
import { GoogleGenerativeAI } from "@google/generative-ai";

export class BaseService {
  protected readonly translator = new Translator(
    process.env["DEEPL_KEY"] || ""
  );
  private readonly _genAI = new GoogleGenerativeAI(
    process.env["GEN_AI_API_KEY"] || ""
  );
  protected readonly AIModel = this._genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
}
