const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.get('/', function(req, res){
  res.send('Hello World');
});

app.get('/api/host', (req, res) => {
    res.send({ host : 'KangBang' });
});

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
});