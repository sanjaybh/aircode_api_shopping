export class Channel {
  #pusher;
  #name;
  #subscribers = {
    '*': [],
  };

  constructor(pusher, name) {
    this.#pusher = pusher;
    this.#name = name;
    this.responseBody = {
      name,
    };
  }

  /**
    pusher.channel('my-channel').subscribe(async ({event, data}) => {
      await this.trigger(...);
    });
   */
  subscribe(event, fn) {
    this.#subscribers[event] = this.#subscribers[event] || [];
    this.#subscribers[event].push(fn);
  }

  async trigger(event, data, channel = this.#name) {
    return await this.#pusher.trigger(channel, event, data);
  }

  get name() {
    return this.#name;
  }

  get subscribers() {
    return this.#subscribers;
  }
}
