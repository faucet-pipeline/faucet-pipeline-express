let express = require("express");
let path = require("path");
let faucet = require(".");

let app = express();
app.set("view engine", "pug");
app.set("views", [path.join(__dirname, "views")]);

app.use(faucet.middleware("./manifest.json"));

app.get("/", (req, res) => {
	res.render("index");
});

let server = app.listen(3000, "0.0.0.0", _ => {
	let { address, port } = server.address();
	console.log(`→ http://${address}:${port}`); // eslint-disable-line no-console
});
