module.exports = function (context) {
  if(context.headers['x-cicada-token'] !== process.env.token) {
    context.status(403);
    return {error: 'forbidden', reason: 'invalid token'};
  }
  return null;
};