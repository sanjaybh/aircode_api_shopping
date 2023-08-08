const KoaRouter = require('@koa/router');

function wrapMiddleWare(fn) {
  return async (ctx, next) => {
    try {
      const body = await fn(ctx.params, ctx, next);
      if(body) ctx.responseBody = body;
    } catch (ex) {
      console.error(ex.message);
      await next();
    }
  };
}

function wrapIdMiddleWare(fn) {
  return async (id, ctx, next) => {
    try {
      const body = await fn(id, ctx.params, ctx);
      ctx.responseBody = body;
      await next();
    } catch (ex) {
      console.error(ex.message);
      await next();
    }
  };
}

module.exports = class Router {
  #koaRouter;

  constructor(options) {
    if(!process.env.EXPERIMENTAL_ROUTE) {
      throw new Error('Your app is not enabled for experimental route. Please set process.env.EXPERIMENTAL_ROUTE=1 to enable it.');
    }
    this.#koaRouter = new KoaRouter(options);
  }

  use(...middlewares) {
    this.#koaRouter.use(...middlewares.map(wrapMiddleWare));
    return this;
  }

  prefix(prefix) {
    this.#koaRouter.prefix(prefix);
    return this;
  }

  routes() {
    const router = this.#koaRouter;
    return async function (params, context) {
      context.params = params;
      await router.routes()(context);
      const matched = context.matched;
      if(matched && matched.length) {
        return context.responseBody;
      }

      context.status(404);
      return {
        error: 'not found',
      };
    };
  }

  // allowMethods() {
  // }

  route(name) {
    return this.#koaRouter.route(name);
  }

  url(name, ...params) {
    return this.#koaRouter.url(name, ...params);
  }

  match(path, method) {
    return this.#koaRouter.match(path, method);
  }

  matchHost(input) {
    return this.#koaRouter.matchHost(input);
  }

  param(param, middleware) {
    this.#koaRouter.param(param, wrapIdMiddleWare(middleware));
    return this;
  }

  all(name, path) {
    let middlewares;
    if(typeof path === 'string') {
      // eslint-disable-next-line prefer-rest-params
      middlewares = Array.prototype.slice.call(arguments, 2);
    } else {
      // eslint-disable-next-line prefer-rest-params
      middlewares = Array.prototype.slice.call(arguments, 1);
      path = name;
      name = null;
    }
    this.#koaRouter.all(name, path, ...middlewares.map(wrapMiddleWare));
    return this;
  }

  get(name, path) {
    let middlewares;
    if(typeof path === 'string') {
      // eslint-disable-next-line prefer-rest-params
      middlewares = Array.prototype.slice.call(arguments, 2);
    } else {
      // eslint-disable-next-line prefer-rest-params
      middlewares = Array.prototype.slice.call(arguments, 1);
      path = name;
      name = null;
    }
    this.#koaRouter.get(name, path, ...middlewares.map(wrapMiddleWare));
    return this;
  }

  post(name, path) {
    let middlewares;
    if(typeof path === 'string') {
      // eslint-disable-next-line prefer-rest-params
      middlewares = Array.prototype.slice.call(arguments, 2);
    } else {
      // eslint-disable-next-line prefer-rest-params
      middlewares = Array.prototype.slice.call(arguments, 1);
      path = name;
      name = null;
    }
    this.#koaRouter.post(name, path, ...middlewares.map(wrapMiddleWare));
    return this;
  }

  put(name, path) {
    let middlewares;
    if(typeof path === 'string') {
      // eslint-disable-next-line prefer-rest-params
      middlewares = Array.prototype.slice.call(arguments, 2);
    } else {
      // eslint-disable-next-line prefer-rest-params
      middlewares = Array.prototype.slice.call(arguments, 1);
      path = name;
      name = null;
    }
    this.#koaRouter.put(name, path, ...middlewares.map(wrapMiddleWare));
    return this;
  }

  delete(name, path) {
    let middlewares;
    if(typeof path === 'string') {
      // eslint-disable-next-line prefer-rest-params
      middlewares = Array.prototype.slice.call(arguments, 2);
    } else {
      // eslint-disable-next-line prefer-rest-params
      middlewares = Array.prototype.slice.call(arguments, 1);
      path = name;
      name = null;
    }
    this.#koaRouter.delete(name, path, ...middlewares.map(wrapMiddleWare));
    return this;
  }

  del(...args) {
    return this.delete(...args);
  }

  static url(path, ...params) {
    return KoaRouter.url(path, ...params);
  }
};
