/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */

var httpProxy = require("http-proxy");

var proxy = httpProxy.createProxyServer({
  target: `http://localhost:8080/`
});

var proxyMiddleware = (req, res, next) => {
  if (req.url.indexOf("api") >= 0) {
    console.log("proxy api request to http://localhost:8080/");
    proxy.web(req, res);
  } else next();
};

module.exports = {
  ui: {
    port: 3001,
    weinre: {
      port: 8080
    }
  },
  files: ["public/**/*", "server/posts/**/*"],
  watchEvents: ["change"],
  watchOptions: {
    ignoreInitial: true
  },
  server: {
    baseDir: "public",
    directory: false
  },
  proxy: false,
  port: 3000,
  middleware: proxyMiddleware,
  serveStatic: [],
  ghostMode: {
    clicks: true,
    scroll: true,
    location: true,
    forms: {
      submit: true,
      inputs: true,
      toggles: true
    }
  },
  logLevel: "info",
  logPrefix: "Browsersync",
  logConnections: false,
  logFileChanges: true,
  logSnippet: true,
  rewriteRules: [],
  open: "local",
  browser: "default",
  cors: false,
  xip: false,
  hostnameSuffix: false,
  reloadOnRestart: false,
  notify: true,
  scrollProportionally: true,
  scrollThrottle: 0,
  scrollRestoreTechnique: "window.name",
  scrollElements: [],
  scrollElementMapping: [],
  reloadDelay: 0,
  reloadDebounce: 0,
  reloadThrottle: 0,
  plugins: [],
  injectChanges: true,
  startPath: null,
  minify: true,
  host: null,
  localOnly: false,
  codeSync: true,
  timestamps: true,
  clientEvents: [
    "scroll",
    "scroll:element",
    "input:text",
    "input:toggles",
    "form:submit",
    "form:reset",
    "click"
  ],
  socket: {
    socketIoOptions: {
      log: false
    },
    socketIoClientConfig: {
      reconnectionAttempts: 50
    },
    path: "/browser-sync/socket.io",
    clientPath: "/browser-sync",
    namespace: "/browser-sync",
    clients: {
      heartbeatTimeout: 5000
    }
  },
  tagNames: {
    less: "link",
    scss: "link",
    css: "link",
    jpg: "img",
    jpeg: "img",
    png: "img",
    svg: "img",
    gif: "img",
    js: "script"
  }
};
