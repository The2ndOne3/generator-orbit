# v0.1
[x] Basic documentation

# v0.2
[ ] Configuration setup
  [ ] Use `konphyg`
  [ ] Set up in /config
[ ] View engines
  [x] Enable Jade support
  [ ] Enable Blade support
  [ ] Enable EJS support
  [ ] Enable Dust support
[ ] CSS preprocessors
  [x] Enable Stylus support
  [ ] Enable LESS support
  [ ] Enable SASS support
  [ ] Enable CSS support
[ ] Page caching
  [ ] Use examples from `cacher`
[ ] RESTful resource routing
  [ ] Put `express-resources` into /api
[x] Promises
  [x] Add `q`
[ ] SSL
  [ ] Add option to specify certs

# v0.4
[ ] Authentication
  [ ] Use examples from `passport`
[ ] Socket wrapping
  [ ] Use examples from `sails`
[ ] Rich console logging
  [ ] Use `chalk`
[ ] Asset management
  [ ] Add `connect-assetmanager`
  [ ] Use `grunt-reduce`? `assetgraph-builder`?
[ ] Logging to file
  [ ] Store in /logs
[ ] Sitemaps
  [ ] Use `sitemap` package
  [ ] Generate all views by default that are not in /layouts or /errors
  [ ] Allow user to specify in Gruntfile

# v0.6 and beyond
[ ] Database upport
  [ ] Prompt user for type, then set up either `express-admin` or `smog` as an admin panel
  [ ] Set up either `sequelize` or `mongoose`
  [ ] Model pubsub
[ ] Localisation
  [ ] Use Makara-style tags
  [ ] Put info in /locales
[ ] Subdomains
  [ ] Use express.vhost()
[ ] Sessions
  [ ] Abstract them and allow different backend stores
  [ ] Multiple servers can use a single Redis like in Sails
  [ ] Use `connect-redis` for a RedisStore
