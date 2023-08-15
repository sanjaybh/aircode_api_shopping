module.exports = function (app) {
  return async (params, context) => {
    const {req, res} = context;

    const _end = res.end;

    let body = await new Promise((resolve) => {
      res.end = (content) => { resolve(content) };

      app.use((ctx, next) => {
        ctx.request.body = ctx.req.body;
        next();
      });
      app.callback()(req, res);
    });

    // eslint-disable-next-line no-restricted-syntax
    for(const [k, v] of Object.entries(res.getHeaders())) {
      context.set(k, v);
    }

    res.end = _end;

    context.status(res.statusCode || 200);

    if(!body) {
      context.status(404);
      body = 'Not found.';
    }
    return body;
  };
};
