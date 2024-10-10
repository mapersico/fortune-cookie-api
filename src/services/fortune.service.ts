import { Insertable } from "kysely";
import { BaseService, DB } from "../bases";
import { FortuneRepositoryInstance } from "../repositories/fortune.repository";

class FortuneService extends BaseService {
  private _fortuneRepository = FortuneRepositoryInstance;

  public async getAll() {
    return this._fortuneRepository.getAll();
  }

  public async getRandom(plainText: boolean) {
    const result = await this._fortuneRepository.getRandom();

    if (plainText) return result.content;
    return this._fortuneRepository.getRandom();
  }

  public async bulkCreate(cookies: Insertable<DB["cookies"]>[]) {
    return this._fortuneRepository.create(cookies);
  }
}

export const FortuneServiceInstance = new FortuneService();
