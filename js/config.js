// === config.js ===

// Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAngAB_zoXr5lsi1N8WocVJeHFq6QjdUUs",
  authDomain: "astrologia-indiana-app.firebaseapp.com",
  projectId: "astrologia-indiana-app",
  storageBucket: "astrologia-indiana-app.appspot.com",
  messagingSenderId: "1055729827966",
  appId: "1:1055729827966:web:51954b0cabee762653d82f"
};

firebase.initializeApp(firebaseConfig);

// Airtable (com suas credenciais reais)
const airtableBase = new Airtable({
  apiKey: "patkcHF16ytjQFYtf.2d2b97aeab44b5961a1c7e4c68e6f5e2bdef0b81f2cd0303dc2580f9d96df10d"
}).base("appc74NoitSC8w1XQ");

// Tabelas
const TABLES = {
  MAP_TYPES: "Tipos de Mapa",
  ORDERS: "Pedidos",
  CLIENTS: "Clientes",
  VIDEO_CALLS: "Videochamadas"
};
