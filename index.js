let util = require("util");
let fs = require("fs");
let readFile = util.promisify(fs.readFile);

let PRODUCTION = process.env.NODE_ENV === "production";

exports.middleware = (manifestPath, { caching = PRODUCTION } = {}) => {
	// we load the manifest here so we get an error early if the
	// manifest is not readable/parseable
	// we do it synchronously because we don't want to await the middleware
	let manifest = require(manifestPath);

	let assetURL = identifier => lookup(manifest, identifier);

	return async (req, res, next) => {
		if(!caching) { // refresh the manifest once per request
			manifest = await loadJSON(manifestPath);
		}
		req.app.locals.assetURL = assetURL;
		next();
	};
};

class ManifestError extends Error {
}

exports.ManifestError = ManifestError;

function lookup(manifest, identifier) {
	if(Object.prototype.hasOwnProperty.call(manifest, identifier)) {
		return manifest[identifier];
	} else {
		throw new ManifestError(`Could not find ${identifier} in the manifest`);
	}
}

async function loadJSON(filePath) {
	let raw = await readFile(filePath);
	return JSON.parse(raw);
}
