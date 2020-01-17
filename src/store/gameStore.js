import { action } from 'mobx';
import { getGame, getGames, postGame } from '../api/teams';
import { DomainInstanceStore, DomainInstance } from './domainInstanceStore';

export class GameStore extends DomainInstanceStore {
  constructor() {
    super(Game, getGames, getGame());
  }

  getGames = body => this.getInstances(body);

  getGame = (id, body) => this.getInstance(id, body);

  @action createGame(body) {
    return postGame(body).then(({ data }) => {
      if (!data.success) {
        throw new Error(data.error);
      }

      this.instancesKeys.push(data.result.id);
      this.instancesMap[data.result.id] = new Game(this, data.result);

      return data.result;
    });
  }
}

export class Game extends DomainInstance {}
