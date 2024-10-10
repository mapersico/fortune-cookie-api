import { BaseService, HoroscopeResponse, HoroscopeSigns } from "../bases";
import { HoroscopeRepositoryInstance } from "../repositories/horoscope.repository";

class HoroscopeService extends BaseService {
  private _horoscopeRepository = HoroscopeRepositoryInstance;

  public async getBySign(sign: string, plainText: boolean) {
    const parsedSign =
      HoroscopeSigns[
        sign?.toString().toLowerCase() as keyof typeof HoroscopeSigns
      ];

    if (!parsedSign) throw Error("ese signo no existe :(");
    const response: HoroscopeResponse =
      await this._horoscopeRepository.getBySign(parsedSign);

    const result = await this.translator.translateText(
      response.data.horoscope_data,
      "en",
      "es"
    );

    if (plainText) return result.text;
    return result;
  }
}

export const HoroscopeServiceInstance = new HoroscopeService();
