// @see https://docs.aircode.io/guide/functions/
const App = require('aircode-app');
const {getTasks, addTask, updateTask} = require('./database');

const app = new App();

// app.use(async (ctx, next) => {
//   await next();
//   console.log('foobar');
// })

app.use(async (ctx, next) => {
  const {params} = ctx;
  const {id, text, state} = params;
  
  if(ctx.method === 'GET' || params.debug) {
    // list all
    ctx.set('content-type', 'text/html');
    const tasks = await getTasks();
    ctx.body = app.display('./index.html', {tasks});
  } else { // POST
    ctx.set('content-type', 'application/json');
    if(id) {
      // update
      const result = await updateTask({id, state});
      ctx.body = result;
    } else if(text) {
      // insert
      const result = await addTask({text});
      ctx.body = result;
    }
  }
});

module.exports = app.run();