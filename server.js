const express = require('express');

const REG_SOFTWARE = /Mozilla[^(]+\(([^)]+)\)/i;
const REG_LANGUAGE = /\w{2}(?:-\w{2})/;

const app = express();

app.set('port', process.env.PORT || 5000);

app.get('/', function (req, res) {
  const userAgent = req.headers['user-agent'] || '';
  const acceptLanguage = req.headers['accept-language'] || '';
  const forwardedFor = req.headers['x-forwarded-for'];
  const softwareMatch = userAgent.match(REG_SOFTWARE);
  const languageMatch = acceptLanguage.match(REG_LANGUAGE);
  const result = {
    ipaddress: forwardedFor ? forwardedFor.split(',')[0] : req.connection.remoteAddress,
    language: languageMatch ? languageMatch[0] : null,
    software: softwareMatch ? softwareMatch[1] : null,
  };
  res.set('Content-Type', 'application/json; charset=utf-8');
  res.send(JSON.stringify(result));
});

app.listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log('Node app is running on port', app.get('port'));
});
