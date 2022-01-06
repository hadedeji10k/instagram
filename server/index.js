const path = require("path");
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const config = require(path.join(__dirname, "../webpack.config.js"));
const compiler = webpack(config);
const app = express();
const cors = require("cors")


app.use((req, res, next) => {
	req.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	)
	next()
})

app.options('*', cors())

app.use(
	cors({
		origin: '*',
	})
)

const { script } = require("./script");

app.use(webpackDevMiddleware(compiler, config.devServer));
app.use(webpackHotMiddleware(compiler));
app.use(express.static(path.join(__dirname, "../build")));

app.get("/api/getData/:username", async (req, res) => {
  console.log(`Getting data for user ${req.params.username}`);
  await script(req.params.username)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });

  console.log(`stopping for user ${req.params.username}`);
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.listen(4000);
