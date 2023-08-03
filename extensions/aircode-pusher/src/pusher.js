import _Pusher from 'pusher';
import { Channel } from './channel.js';

//  juest for debugger
const app_id = '1645571';
const key = 'cc583f81ba02e9800c7d';
const secret = '01cfa210148071694860';
const cluster = 'mt1';

export class Pusher {
  static get DEBUG_CONFIG() {
    console.warn('DEBUG_CONFIG should only be used for debugging purposes, and should not be used in a production environment.');
    return {
      appId: app_id,
      key,
      secret,
      cluster,
      useTLS: true,
    };
  }

  #pusher;

  #key;
  #cluster;
  #channels = {};

  constructor({
    appId,
    key,
    secret,
    cluster,
    useTLS = true,
  }) {
    this.#key = key;
    this.#cluster = cluster;

    this.#pusher = new _Pusher({
      appId,
      key,
      secret,
      cluster,
      useTLS,
    });
  }

  get options() {
    const ret = {
      key: this.#key,
      cluster: this.#cluster,
      channels: Object.keys(this.#channels),
    };
    return ret;
  }

  channel(name) {
    name = `${process.env.AC_APP_ID}.${name}`;
    if(this.#channels[name]) {
      return this.#channels[name];
    }
    this.#channels[name] = new Channel(this.#pusher, name);
    return this.#channels[name];
  }

  listen() {
    return async (params, context) => {
      const { method } = context;
      if(method === 'GET') {
        return this.options;
      } else {
        const { channel, event, data } = params;
        const _channel = this.#channels[channel];
        if(!_channel) {
          context.status(404);
          return {
            error: `channel ${channel} not found`,
          };
        } else {
          const subscriber = [...(_channel.subscribers[event] || []), ..._channel.subscribers['*']];
          if(subscriber.length) {
            const promises = subscriber.map(async (fn) => {
              return await fn.call(_channel, {event, data, channel: _channel});
            });
            try {
              await Promise.all(promises);
            } catch(ex) {
              return {error: ex.message};
            }
            return _channel.responseBody;
          }
          context.status(404);
          return {
            error: `event ${event} not found`,
          };
        }
      }
    };
  }
}
