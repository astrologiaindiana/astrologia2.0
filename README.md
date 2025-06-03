 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/README.md b/README.md
index 3bc66acb4b3b18fe0e1d826c2d38bfed4af1fd99..8e8a23d2384108867c9e2c3868e4316d0c3d38aa 100644
--- a/README.md
+++ b/README.md
@@ -1 +1,58 @@
-# astrologia2.0
+# Astrologia 2.0
+
+Astrologia 2.0 é uma aplicação web progressiva (PWA) para gestão de vendas e serviços de astrologia. O projeto usa HTML, CSS e JavaScript com Firebase para autenticação e Airtable como banco de dados.
+
+## Pré-requisitos
+
+- [Node.js](https://nodejs.org/) (recomendado para servir a aplicação localmente)
+- Opcionalmente Python 3 para utilizar `python -m http.server`
+
+## Executando localmente
+
+1. Clone o repositório:
+   ```bash
+   git clone <este-repositorio>
+   cd astrologia2.0
+   ```
+2. Não há dependências de build. Para subir um servidor estático utilize:
+   ```bash
+   npx http-server -p 8080
+   ```
+   ou
+   ```bash
+   python3 -m http.server 8080
+   ```
+3. Acesse `http://localhost:8080` em seu navegador.
+
+## Publicação no GitHub Pages
+
+1. Crie um branch `gh-pages` com o conteúdo do diretório raiz.
+2. Faça o push desse branch para o GitHub.
+3. Nas configurações do repositório, habilite o GitHub Pages apontando para o branch `gh-pages`.
+4. A aplicação ficará disponível em `https://<usuário>.github.io/<repositório>/`.
+
+## Páginas da aplicação
+
+- **Painel de Pedidos** – lista de pedidos recebidos e filtros de status/responsável.
+- **Nova Venda** – formulário para registrar uma nova venda de mapa.
+- **Clientes** – consulta de clientes com histórico de compras.
+- **Videochamadas** – agenda para gerenciar videochamadas com clientes.
+- **Resumo Financeiro** – gráficos e estatísticas das vendas realizadas.
+- **Configurações** – gerenciamento de tipos de mapa e outras opções.
+
+## Variáveis de ambiente
+
+O arquivo `js/config.js` contém atualmente chaves da API do Firebase e do Airtable. Quando essas chaves forem externalizadas, crie um arquivo `.env` (não versionado) ou outro mecanismo de configuração contendo:
+
+```
+FIREBASE_API_KEY=
+FIREBASE_AUTH_DOMAIN=
+FIREBASE_PROJECT_ID=
+FIREBASE_STORAGE_BUCKET=
+FIREBASE_MESSAGING_SENDER_ID=
+FIREBASE_APP_ID=
+AIRTABLE_API_KEY=
+AIRTABLE_BASE_ID=
+```
+
+Atualize a aplicação para carregar esses valores em tempo de execução.
 
EOF
)
