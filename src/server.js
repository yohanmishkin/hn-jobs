import { Server, Model, Factory } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  let server = new Server({
    environment,

    models: {
      listing: Model
    },

    factories: {
      listing: Factory.extend({
        description() {
          return 'qwers';
        },
        remote() {
          return Math.random() >= 0.5;
        }
      })
    },

    seeds(server) {
      server.createList('listing', 8, { description: 'elm', remote: true });
      server.create('listing', {
        description: 'clojure is cool',
        remote: false
      });
      server.create('listing', { description: 'elm is cool', remote: false });
    },

    routes() {
      this.namespace = 'api';
      // this.timing = 400;

      this.get('/listings', ({ db }) => db.listings);
    }
  });

  return server;
}
