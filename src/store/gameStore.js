import { getGame, getGames } from '../api/teams';
import { DomainInstanceStore, DomainInstance } from './domainInstanceStore';

export class GameStore extends DomainInstanceStore {
  constructor() {
    super(Game, getGames, getGame());
  }

  getGames = body => this.getInstances(body);

  getGame = (id, body) => this.getInstance(id, body);
}

export class Game extends DomainInstance {}
