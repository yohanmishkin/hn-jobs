import { Server, Model, Factory } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  let server = new Server({
    environment,

    models: {
      listing: Model
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
