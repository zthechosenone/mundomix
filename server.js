const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const path = require('path');
require('dotenv').config();

const app = express();

/* =========================
   Middlewares básicos
========================= */
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

/* =========================
   Session
========================= */
app.use(session({
    secret: process.env.SESSION_SECRET || 'secreto-temporal',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/mundomix'
    }),
    cookie: { 
        maxAge: 24 * 60 * 60 * 1000,
        secure: false
    }
}));

app.use(passport.initialize());
app.use(passport.session());

/* =========================
   Servir archivos estáticos
   (DESDE LA RAÍZ)
========================= */
app.use(express.static(__dirname));

/* =========================
   Rutas HTML
========================= */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.html'));
});

/* =========================
   API de prueba
========================= */
app.get('/api/test', (req, res) => {
    res.json({ 
        message: 'API funcionando!', 
        time: new Date() 
    });
});

/* =========================
   Iniciar servidor
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('========================================');
    console.log('🚀 MUNDOMIX Uruguay - Servidor iniciado');
    console.log('========================================');
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log(`🏠 Tienda: http://localhost:${PORT}/`);
    console.log(`🔐 Admin: http://localhost:${PORT}/admin`);
    console.log(`👤 Login: http://localhost:${PORT}/login`);
    console.log(`📝 Registro: http://localhost:${PORT}/register`);
    console.log('========================================');
});
