import { TeamStore } from './teamStore';

export default class DomainStore {
  constructor() {
    this.teamStore = new TeamStore();
  }
}
