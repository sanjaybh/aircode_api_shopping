/**
 * Module dependencies.
 */

const views = require('@ladjs/koa-views');
const path = require('path');

// setup views mapping .html
// to the hbs template engine
module.exports = views(path.join(__dirname, '/../views'), {
  map: { html: 'nunjucks' }
});
