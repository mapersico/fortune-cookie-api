import { Request, Response } from "express";

import { BaseController, HoroscopeSigns } from "../bases";
import { HoroscopeServiceInstance } from "../services/horoscope.service";

class HoroscopeController extends BaseController {
  public override readonly _route = "/horoscope";
  private horoscopeService = HoroscopeServiceInstance;

  constructor() {
    super();
    this._initializeRoutes();
  }

  private async _initializeRoutes() {
    this.router.get(
      this._route.concat("/get-by-sign"),
      this.asyncHandler(this.getHoroscopeBySign.bind(this))
    );
  }

  private async getHoroscopeBySign(req: Request, res: Response) {
    const { sign, plainText } = req.query;
    const parsedSign =
      HoroscopeSigns[
        sign?.toString().toLowerCase() as keyof typeof HoroscopeSigns
      ];

    if (!parsedSign) res.status(400).send("ese signo no existe :(");
    else {
      const result = await this.horoscopeService.getBySign(parsedSign);
      if (plainText) res.status(200).send(result.text);
      else res.status(200).send(result);
    }
  }
}

export const HoroscopeControllerInstance = new HoroscopeController();
