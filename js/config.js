// Configuração global
const firebaseConfig = {
  apiKey: "AIzaSyAngAB_zoXr5lsi1N8WocVJeHFq6QjdUUs",
  authDomain: "astrologia-indiana-app.firebaseapp.com",
  projectId: "astrologia-indiana-app",
  storageBucket: "astrologia-indiana-app.appspot.com",
  messagingSenderId: "1055729827966",
  appId: "1:1055729827966:web:51954b0cabee762653d82f"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Garantir que o Airtable está disponível globalmente
if (typeof Airtable === 'undefined') {
  throw new Error('Airtable não está carregado. Verifique a ordem dos scripts.');
}

// Configurar Airtable
window.airtableBase = new Airtable({
  apiKey: "patkcHF16ytjQFYtf.2d2b97aeab44b5961a1c7e4c68e6f5e2bdef0b81f2cd0303dc2580f9d96df10d"
}).base("appc74NoitSC8w1XQ");

// Definir tabelas globalmente
window.TABLES = {
  MAP_TYPES: "Tipos de Mapa",
  ORDERS: "Pedidos",
  CLIENTS: "Clientes",
  VIDEO_CALLS: "Videochamadas"
};

// Verificar se as variáveis globais foram definidas corretamente
console.log('Config loaded:', {
  firebase: !!firebase,
  airtableBase: !!window.airtableBase,
  TABLES: !!window.TABLES
});