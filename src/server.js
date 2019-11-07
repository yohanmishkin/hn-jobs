import { Server, Model, Factory } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  let server = new Server({
    environment,

    models: {
      listing: Model
    },

    factories: {
      listing: Factory.extend({
        remote() {
          return Math.random() >= 0.5;
        }
      })
    },

    seeds(server) {
      server.createList('listing', 8);
    },

    routes() {
      this.namespace = 'api';
      this.timing = 800;

      this.get('/listings', (db, request) => {
        let includeRemote = request.queryParams.includeRemote;
        return db.listings.where({ remote: includeRemote });
      });
    }
  });

  return server;
}
