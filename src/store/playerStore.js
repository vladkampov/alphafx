import { getPlayer, getPlayers } from '../api/teams';
import { DomainInstanceStore, DomainInstance } from './domainInstanceStore';

export class PlayerStore extends DomainInstanceStore {
  constructor() {
    super(Player, getPlayers, getPlayer);
  }

  getPlayers = body => this.getInstances(body);

  getPlayer = (id, body) => this.getInstance(id, body);
}

export class Player extends DomainInstance {}
