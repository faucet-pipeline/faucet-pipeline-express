let util = require("util");
let fs = require("fs");
let readFile = util.promisify(fs.readFile);

exports.middleware = (manifestPath, { caching } = {}) => {
	if(caching === undefined) {
		caching = (process.env.NODE_ENV === "production");
	}

	// we load the manifest here so we get an error early if the
	// manifest is not readable/parseable
	// we do it synchronous, because we don't want to await the middleware
	let manifest = loadJSONSync(manifestPath);

	return async (req, res, next) => {
		// if caching is disabled, refresh the manifest once per request
		if(!caching) {
			manifest = await loadJSON(manifestPath);
		}
		req.app.locals.assetURL = identifier => lookup(manifest, identifier);
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

function loadJSONSync(filePath) {
	let raw = fs.readFileSync(filePath);
	let parsed = JSON.parse(raw);
	return parsed;
}

async function loadJSON(filePath) {
	let raw = await readFile(filePath);
	let parsed = JSON.parse(raw);
	return parsed;
}
