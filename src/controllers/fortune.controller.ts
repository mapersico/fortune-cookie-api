import { Request, Response } from "express";

import { BaseController } from "../bases";
import { FortuneServiceInstance } from "../services/fortune.service";

class FortuneController extends BaseController {
  public override readonly _route = "/fortune-cookie";
  private fortuneService = FortuneServiceInstance;

  constructor() {
    super();
    this._initializeRoutes();
  }

  private async _initializeRoutes() {
    this.router.get(
      this._route.concat("/get-random"),
      this.asyncHandler(this.getRandomFortuneCookie.bind(this))
    );
    this.router.post(
      this._route.concat("/bulk-create"),
      this.asyncHandler(this.bulkCreateFortuneCookie.bind(this))
    );
  }

  private async getRandomFortuneCookie(req: Request, res: Response) {
    const { plainText } = req.query;
    const result = await this.fortuneService.getRandom();

    if (plainText) res.status(200).send(result.content);
    else res.status(200).json(result);
  }

  private async bulkCreateFortuneCookie(req: Request, res: Response) {
    await this.fortuneService.bulkCreate(req.body);
    res.status(200).json({ success: true });
  }
}

export const FortuneControllerInstance = new FortuneController();
