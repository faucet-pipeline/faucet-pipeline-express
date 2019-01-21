# faucet-pipeline-express

This is currently a usage example for using faucet-pipeline with express, but
the `index.js` will be an NPM package, so you only need to do:

```js
app.use(faucet.middleware("./path-to-manifest.json"));
```

See `example.js` for the usage, and `index.js` for the implementation.
