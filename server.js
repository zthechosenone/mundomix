const express = require('express');
const path = require('path');

const app = express();

// Servir archivos estáticos desde la carpeta actual
app.use(express.static('./'));

// Rutas específicas
app.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.resolve('./public/admin.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.resolve('./public/login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.resolve('./public/register.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});
