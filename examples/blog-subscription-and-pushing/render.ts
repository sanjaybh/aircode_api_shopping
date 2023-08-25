// https://react.email/docs/utilities/render

require('@babel/register')({
  presets: ['@babel/preset-react'],
});

import aircode from 'aircode';
const getEmail  = require('./email.jsx');
import { render } from '@react-email/render';

// test post data
const post = {
  href: "https://aircode.io/blog/why-create-aircode",
  title: "What we are building",
  excerpt: `AirCode is Your Serverless Node.js Stack for API Development,
  zero-config, all in one place.AirCode is Your Serverless Node.js
  Stack for API Development, zero-config, all in one place`,
  coverImage:
    "https://ph-files.imgix.net/b41dc780-1623-4c46-90b9-1a0d514c5730.jpeg?auto=compress&codec=mozjpeg&cs=strip&auto=format&fit=max&dpr=2",
};

export default async function (params: any, context: any) {
  const { title, excerpt, coverImage, href } = post;
  const html = render(getEmail(title, excerpt, coverImage, href));
  console.log('render email template: ', html);

  context.set('content-type', 'text/html');

  return html;
};
