 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/service-worker.js b/service-worker.js
index 8b25be664f2bc68df4e130bc24f93a2aef97f46d..7c91b5c3f958316be5188164e004a22f661b1f53 100644
--- a/service-worker.js
+++ b/service-worker.js
@@ -1,35 +1,36 @@
 // Service Worker para PWA
 self.addEventListener('install', event => {
+    const basePath = self.location.pathname.replace(/\/[^/]*$/, '');
+    const filesToCache = [
+        '/',
+        'index.html',
+        'css/styles.css',
+        'js/app.js',
+        'js/auth.js',
+        'js/airtable.js',
+        'js/config.js',
+        'js/utils.js',
+        'js/ui.js',
+        'js/map-queue.js',
+        'js/new-sale.js',
+        'js/clients.js',
+        'js/video-calls.js',
+        'js/financial.js',
+        'js/settings.js',
+        'assets/logo.png',
+        'assets/user-avatar.png',
+        'manifest.json'
+    ].map(path => basePath + (path.startsWith('/') ? path : '/' + path));
+
     event.waitUntil(
-        caches.open('astrologia-indiana-v1').then(cache => {
-            return cache.addAll([
-                '/',
-                '/index.html',
-                '/css/styles.css',
-                '/js/app.js',
-                '/js/auth.js',
-                '/js/airtable.js',
-                '/js/config.js',
-                '/js/utils.js',
-                '/js/ui.js',
-                '/js/map-queue.js',
-                '/js/new-sale.js',
-                '/js/clients.js',
-                '/js/video-calls.js',
-                '/js/financial.js',
-                '/js/settings.js',
-                '/assets/logo.png',
-                '/assets/user-avatar.png',
-                '/manifest.json'
-            ]);
-        })
+        caches.open('astrologia-indiana-v1').then(cache => cache.addAll(filesToCache))
     );
 });
 
 self.addEventListener('fetch', event => {
     event.respondWith(
         caches.match(event.request).then(response => {
             return response || fetch(event.request);
         })
     );
 });
 
EOF
)
