import _Pusher from 'pusher-js';

export default class Pusher {
  #channels = [];
  #apiUrl;

  constructor(apiUrl) {
    this.#apiUrl = apiUrl;
  }

  set logToConsole(value) {
    _Pusher.logToConsole = value;
  }

  get logToConsole() {
    return _Pusher.logToConsole;
  }

  get channels() {
    return this.#channels;
  }

  async connect() {
    const {key, cluster, channels} = await (await fetch(this.#apiUrl)).json();
    const pusher = new _Pusher(key, {
      cluster,
    });
    
    const connections = [];

    for(const channel of channels) {
      const conn = pusher.subscribe(channel);
      Object.defineProperty(conn, 'send', {
        value: async (event, data) => {
          const ret = await (await fetch(this.#apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              channel,
              event,
              data,
            }),
          })).json();
          return ret;
        },
      });
      connections.push(new Promise((resolve) => {
        conn.bind('pusher:subscription_succeeded', () => {
          resolve();
        });
      }));
      this.#channels.push(conn);
    }

    await Promise.any(connections);

    return this.#channels;
  }
}