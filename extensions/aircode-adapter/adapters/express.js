module.exports = function (app) {
  return async (params, context) => {
    try {
      const {req, res} = context;
      let body;
      const _end = res.end;
      res.end = (content) => { body = content };

      const _app = req.app;

      await app(req, res);

      // expose the prototype that will get set on requests
      Object.create(req, {
        reqApp: {configurable: true, enumerable: true, writable: true, value: _app},
      });

      // expose the prototype that will get set on responses
      Object.create(res, {
        app: {configurable: true, enumerable: true, writable: true, value: _app},
      });

      // eslint-disable-next-line no-restricted-syntax
      for(const [k, v] of Object.entries(res.getHeaders())) {
        context.set(k, v);
      }

      res.end = _end;

      if(!body) {
        context.status(404);
        body = 'Not found.';
      }
      const headers = context.responseHeader;
      if(headers['content-type'].startsWith('text')) {
        return body.toString('utf-8');
      }
      if(headers['content-type'].startsWith('application/json')) {
        return JSON.parse(body.toString('utf-8'));
      }
      return body;
    } catch (ex) {
      context.status(500);
      return {error: ex.message};
    }
  };
};