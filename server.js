const express = require('express')
const crypto = require('crypto');
const { execSync } = require('child_process');

const app = express()


app.post('/git', (req, res) => {
  const hmac = crypto.createHmac('sha1', process.env.SECRET);
  const sig  = 'sha1=' + hmac.update(JSON.stringify(req.body)).digest('hex');
  if (req.headers['x-github-event'] === 'push' &&
    crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(req.headers['x-hub-signature']))) {
    res.sendStatus(200);
    const commands = ['git fetch origin master',
                      'git reset --hard origin/master',
                      'git pull origin master --force',
                      'npm install',
                      // your build commands here
                      'refresh']; // fixes glitch ui
    for (const cmd of commands) {
      console.log(execSync(cmd).toString());
    }
    console.log('updated with origin/master!');
    return;
  } else {
    console.log('webhook signature incorrect!');
    return res.sendStatus(403);
  }
});

app.get('/', (req,res) => {
    res.send('Hola mundo 3')
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Servidor express escuchando en http://localhost:${PORT}`))
app.on('error', error => console.log(`Error en Servidor: ${error}`))

