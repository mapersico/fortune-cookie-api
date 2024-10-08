import { Translator } from "deepl-node";

export class BaseService {
  protected readonly translator = new Translator(
    process.env["DEEPL_KEY"] || ""
  );
}
