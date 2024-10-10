import { Request, Response } from "express";

import { BaseController } from "../bases";
import { HoroscopeServiceInstance } from "../services/horoscope.service";

class HoroscopeController extends BaseController {
  public override readonly _route = "/horoscope";
  private horoscopeService = HoroscopeServiceInstance;

  constructor() {
    super();
    this._initializeRoutes();
  }

  protected override async _initializeRoutes() {
    this.router.get(
      this._route.concat("/get-by-sign"),
      this.asyncHandler(this.getHoroscopeBySign.bind(this))
    );
  }

  private async getHoroscopeBySign(req: Request, res: Response) {
    const { sign, plainText } = req.query;
    const result = await this.horoscopeService.getBySign(
      sign?.toString() || "",
      !!plainText
    );

    res.status(200).send(result);
  }
}

export const HoroscopeControllerInstance = new HoroscopeController();
