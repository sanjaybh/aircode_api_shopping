module.exports = function (app) {
  return async (params, context) => {
    const {req, res} = context;
    let body;
    const _end = res.end;
    res.end = (content) => { body = content };
    await app.callback()(req, res);

    // eslint-disable-next-line no-restricted-syntax
    for(const [k, v] of Object.entries(res.getHeaders())) {
      context.set(k, v);
    }

    res.end = _end;
    if(!body) {
      context.status(404);
      body = 'Not found.';
    }
    return body;
  };
};
