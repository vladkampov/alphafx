import { observable, computed, action } from 'mobx';

export class DomainInstanceStore {
  @observable isLoading = false;
  @observable loadingError = false;
  @observable instancesKeys = [];
  @observable instancesMap = {};
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
      this.instancesMap[this.activeInstanceId] ||
      new this.InstanceClass(this, {})
    );
  }

  @computed get instances() {
    return this.instancesKeys.map(k => this.instancesMap[k]);
  }

  @action getInstances(body) {
    this.isLoading = true;

    return this.getInstancesCb(body)
      .then(({ data }) => {
        this.instancesKeys = data.data.map(i => {
          const instClass = new this.InstanceClass(this, i);
          this.instancesMap[i.id] = instClass;

          return instClass.id;
        });
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

    if (this.instancesMap[id]) {
      return this.instancesMap[id];
    }

    return this.getInstanceCb(id, body).then(({ data }) => {
      const instance = new this.InstanceClass(
        this,
        data.data.find(obj => obj.id === id)
      ); // eslint-disable-line no-use-before-define

      if (!this.activeInstance.id) {
        this.instancesKeys.push(instance.id);
        this.instancesMap[id] = instance;
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
