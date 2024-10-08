import { BaseService, HoroscopeResponse } from "../bases";
import { HoroscopeRepositoryInstance } from "../repositories/horoscope.repository";

class HoroscopeService extends BaseService {
  private _horoscopeRepository = HoroscopeRepositoryInstance;

  public async getBySign(sign: string) {
    const response: HoroscopeResponse =
      await this._horoscopeRepository.getBySign(sign);

    const result = await this.translator.translateText(
      response.data.horoscope_data,
      "en",
      "es"
    );

    return result;
  }
}

export const HoroscopeServiceInstance = new HoroscopeService();
