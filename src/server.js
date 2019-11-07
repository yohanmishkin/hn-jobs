import { Server, Model } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  let server = new Server({
    environment,

    models: {
      listing: Model
    },

    seeds(server) {
      server.create('listing', { remote: false });
      server.create('listing', { remote: true });
      server.create('listing', { remote: true });
      server.create('listing', { remote: true });
      server.create('listing', { remote: true });
      server.create('listing', { remote: false });
      server.create('listing', { remote: false });
    },

    routes() {
      this.namespace = 'api';
      this.timing = 0;

      this.get('/listings', (db, request) => {
        let includeRemote = request.queryParams.includeRemote;
        return db.listings.where({ remote: includeRemote });
      });
    }
  });

  return server;
}
