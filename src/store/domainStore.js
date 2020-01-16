import { TeamStore } from './teamStore';
import { PlayerStore } from './playerStore';
import { GameStore } from './gameStore';

export default class DomainStore {
  constructor() {
    this.teamStore = new TeamStore();
    this.playerStore = new PlayerStore();
    this.gameStore = new GameStore();
  }
}
