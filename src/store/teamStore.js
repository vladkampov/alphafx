import { getTeam, getTeams } from '../api/teams';
import { DomainInstanceStore, DomainInstance } from './domainInstanceStore';

export class TeamStore extends DomainInstanceStore {
  constructor() {
    super(Team, getTeams, getTeam);
  }

  getTeams(body) {
    this.getInstances(body);
  }

  getTeam = (id, body) => this.getInstance(id, body);
}

export class Team extends DomainInstance {}
