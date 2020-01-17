import { observable, action } from 'mobx';
import { configureValidator } from 'reactive-mobx-form';

export default class UiStore {
  constructor() {
    configureValidator({});
  }
}
