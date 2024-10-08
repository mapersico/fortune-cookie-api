import { BaseRepository } from "../bases";

class HoroscopeRepository extends BaseRepository {
  public async getBySign(sign: string) {
    const response = await fetch(
      `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${sign}&day=TODAY`
    );

    return await response.json();
  }
}

export const HoroscopeRepositoryInstance = new HoroscopeRepository();
