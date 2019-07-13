// ===========
// Puerto
// ===========
process.env.PORT = process.env.PORT || 3000;

// ===========
// Entorno
// ===========

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ===========
// Vencimiento del Token
// ===========

process.env.CADUCIDAD_TOKEN = '48h'

// ===========
// SEED de autenticicacion
// ===========

process.env.SEED = process.env.SEED || 'desarrollo'

// ===========
// DB
// ===========
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

// ===========
// Google Client ID
// ===========

process.env.CLIENT_ID = process.env.CLIENT_ID || '767524776016-o8fv7stm3ti3gspv55ei7av2dlnv0aiv.apps.googleusercontent.com';