import express from 'express';
import compression from 'compression';
import path from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDirectory = path.join(__dirname, 'dist');
const prerenderDirectory = path.join(distDirectory, '.prerender');
const manifest = JSON.parse(
  readFileSync(path.join(prerenderDirectory, 'manifest.json'), 'utf8'),
);

const app = express();
const PORT = process.env.PORT || 3000;

app.disable('x-powered-by');
app.use(compression());

app.use(
  express.static(distDirectory, {
    index: false,
    redirect: false,
    setHeaders(response, filename) {
      if (filename.includes(`${path.sep}assets${path.sep}`)) {
        response.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      } else if (/\.(?:png|jpe?g|webp|svg|woff2?)$/i.test(filename)) {
        response.setHeader('Cache-Control', 'public, max-age=604800');
      }
    },
  }),
);

const privateRoutePatterns = [
  /^\/(?:login|register|registration-success|verify-account|verify-email|verification-success|already-verified|mfa|forgot-password|reset-password|unauthorized)\/?$/,
  /^\/verify\/(?:account|password)\/?$/,
  /^\/(?:course|profile|upgrade|admin)(?:\/|$)/,
  /^\/payment\/(?:success|cancel)\/?$/,
];

function isPrivateApplicationRoute(pathname) {
  const applicationPath = pathname.replace(/^\/(?:de|ru)(?=\/|$)/, '') || '/';
  return privateRoutePatterns.some((pattern) => pattern.test(applicationPath));
}

app.get('*', (request, response) => {
  const pathname = request.path;

  if (pathname.length > 1 && pathname.endsWith('/')) {
    const query = request.originalUrl.includes('?')
      ? request.originalUrl.slice(request.originalUrl.indexOf('?'))
      : '';
    response.redirect(308, `${pathname.replace(/\/+$/, '')}${query}`);
    return;
  }

  const prerenderedFilename = manifest[pathname];
  if (prerenderedFilename) {
    response.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    response.sendFile(path.join(prerenderDirectory, prerenderedFilename));
    return;
  }

  if (isPrivateApplicationRoute(pathname)) {
    response.setHeader('Cache-Control', 'private, no-store');
    response.setHeader('X-Robots-Tag', 'noindex, nofollow');
    response.sendFile(path.join(distDirectory, 'index.html'));
    return;
  }

  response.status(404);
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('X-Robots-Tag', 'noindex, nofollow');
  response.sendFile(path.join(prerenderDirectory, 'not-found.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
