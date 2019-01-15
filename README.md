# Adminos

Set of assets and webpack configuration for [Adminos](https://github.com/molinos/adminos/) gem.

## Setup

Update `config/webpack/environment.js` with:

```js
const { environment } = require('@rails/webpacker');
const setupAdminos = require('adminos/webpacker');

setupAdminos(environment);

// Configure your environment as needed here

module.exports = environment;
```

Update `app/assets/packs/admin.js` with:

```js
import 'adminos/adminos'
import 'adminos/src/scss/adminos_base.scss'
```

Then include packs into `app/views/layouts/admin.slim`:

```slim
= javascript_pack_tag 'admin'
= stylesheet_pack_tag 'admin'
```
