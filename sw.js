/* Participation Board: offline support.
   Change VERSION whenever any app file changes, so installed copies update. */
const PREFIX = 'pboard-';
const VERSION = PREFIX + '2026-10-07-5';
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./exceljs.min.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./fonts/atkinson-hyperlegible-latin-400-normal.woff2",
  "./fonts/atkinson-hyperlegible-latin-700-normal.woff2",
  "./fonts/atkinson-hyperlegible-latin-ext-400-normal.woff2",
  "./fonts/atkinson-hyperlegible-latin-ext-700-normal.woff2",
  "./fonts/kalam-latin-700-normal.woff2",
  "./fonts/kalam-latin-ext-700-normal.woff2"
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  // Only remove this app's own old caches: other apps on the same site keep theirs.
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith(PREFIX) && k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  if (!new URL(req.url).pathname.startsWith(new URL(self.registration.scope).pathname)) return;
  e.respondWith(caches.open(VERSION).then(async cache => {
    const cached = await cache.match(req, {ignoreSearch: true});
    const fresh = fetch(req).then(res => { if (res && res.ok) cache.put(req, res.clone()); return res; }).catch(() => null);
    if (cached) { e.waitUntil(fresh); return cached; }
    const res = await fresh;
    if (res) return res;
    if (req.mode === 'navigate') return (await cache.match('./index.html')) || Response.error();
    return Response.error();
  }));
});
