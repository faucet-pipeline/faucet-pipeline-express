# faucet-pipeline-express
[![npm](https://img.shields.io/npm/v/faucet-pipeline-express.svg)](https://www.npmjs.com/package/faucet-pipeline-express)
[![Build Status](https://travis-ci.org/faucet-pipeline/faucet-pipeline-express.svg?branch=master)](https://travis-ci.org/faucet-pipeline/faucet-pipeline-express)
[![Greenkeeper badge](https://badges.greenkeeper.io/faucet-pipeline/faucet-pipeline-express.svg)](https://greenkeeper.io)

This is a middleware for Express to read the manifest file from faucet-pipeline
and get access to it in your views. Initialize it with:

```js
let faucet = require('faucet-pipeline-express');

// ...

app.use(faucet.middleware("./path-to-manifest.json"));
```

Inside your views you now have access to the assetURL function to read from your
manifest:

```pug
head
    link(href=assetURL("assets/foo.css") rel="stylesheet" media="all")
```

See the `example` directory for a usage example with express and pug.

## License

faucet-pipeline-express is licensed under Apache 2.0 License.
