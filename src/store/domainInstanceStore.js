import { observable, computed, action } from 'mobx';

export class DomainInstanceStore {
  @observable isLoading = false;
  @observable loadingError = false;
  @observable instances = [];
  @observable activeInstanceId = ''; // correspond to id of instance on details page

  constructor(instanceClass, getInstances, getInstance) {
    this.InstanceClass = instanceClass;
    this.getInstancesCb = getInstances;
    this.getInstanceCb = getInstance;
  }

  @computed get instancesAmount() {
    return this.instances.length;
  }

  @computed get activeInstance() {
    return (
      this.instances.find(i => i.id === this.activeInstanceId) ||
      new this.InstanceClass(this, {})
    );
  }

  @action getInstances(body) {
    this.isLoading = true;

    return this.getInstancesCb(body)
      .then(({ data }) => {
        this.instances = data.data.map(i => new this.InstanceClass(this, i));
        this.isLoading = false;
      })
      .catch(() => {
        this.isLoading = false;
        this.loadingError = true;
      });
  }

  @action getInstance(id, body) {
    this.activeInstanceId = id;

    if (!this.activeInstance.id) {
      this.isLoading = true;
    }

    return this.getInstanceCb(id, body).then(({ data }) => {
      const instance = new this.InstanceClass(this, data); // eslint-disable-line no-use-before-define

      if (!this.activeInstance.id) {
        this.instances.push(instance);
      } else {
        this.activeInstance.fromJSON(data);
      }

      this.isLoading = false;
    });
  }
}

export class DomainInstance {
  store = null;
  id = null;

  constructor(store, json) {
    this.store = store;

    if (json.id) {
      this.fromJSON(json);
    }
  }

  fromJSON(json) {
    Object.keys(json).forEach(key => {
      this[key] = json[key];
    });
  }
}
