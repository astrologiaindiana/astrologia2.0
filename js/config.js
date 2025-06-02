console.log("Airtable global está carregado?", typeof Airtable);
// === config.js ===

// Certifique-se de que o Airtable está importado ANTES deste script no index.html:
// <script src="https://cdn.jsdelivr.net/npm/airtable@0.12.2/build/airtable.browser.js"></script>

const firebaseConfig = {
  apiKey: "AIzaSyAngAB_zoXr5lsi1N8WocVJeHFq6QjdUUs",
  authDomain: "astrologia-indiana-app.firebaseapp.com",
  projectId: "astrologia-indiana-app",
  storageBucket: "astrologia-indiana-app.appspot.com",
  messagingSenderId: "1055729827966",
  appId: "1:1055729827966:web:51954b0cabee762653d82f"
};

firebase.initializeApp(firebaseConfig);

// Corrigido: garantir que o Airtable esteja disponível globalmente como "airtableBase"
window.airtableBase = new Airtable({
  apiKey: "patkcHF16ytjQFYtf.2d2b97aeab44b5961a1c7e4c68e6f5e2bdef0b81f2cd0303dc2580f9d96df10d"
}).base("appc74NoitSC8w1XQ");

// Corrigido: garantir que TABLES esteja disponível globalmente
window.TABLES = {
  MAP_TYPES: "Tipos de Mapa",
  ORDERS: "Pedidos",
  CLIENTS: "Clientes",
  VIDEO_CALLS: "Videochamada"
};
