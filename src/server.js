import { Server, Model, Factory } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  let server = new Server({
    environment,

    models: {
      listing: Model
    },

    factories: {},

    seeds(/*server*/) {},

    routes() {
      this.namespace = 'api';
    }
  });

  return server;
}
