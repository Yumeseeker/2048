var assert = require("assert");
var fs = require("fs");
var path = require("path");
var vm = require("vm");

var source = fs.readFileSync(path.join(__dirname, "..", "js", "tile_theme.js"), "utf8");
var indexSource = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
var actuatorSource = fs.readFileSync(path.join(__dirname, "..", "js", "html_actuator.js"), "utf8");
var scssSource = fs.readFileSync(path.join(__dirname, "..", "style", "main.scss"), "utf8");
var cssSource = fs.readFileSync(path.join(__dirname, "..", "style", "main.css"), "utf8");
var context = {};

vm.runInNewContext(source, context, { filename: "tile_theme.js" });

function assertTheme(value, motif, name, accent) {
  var theme = context.getTileTheme(value);

  assert.strictEqual(theme.motif, motif);
  assert.strictEqual(theme.name, name);
  assert.strictEqual(theme.accent, accent);
}

assertTheme(2, "🐱", "sleepy cat", "sage");
assertTheme(32, "🍓", "strawberry", "berry");
assertTheme(2048, "🎁", "party parcel", "gold");

assert.strictEqual(context.getTileTheme(4096), context.tileThemeFallback);
assertTheme(4096, "✉", "mystery parcel", "forest");

assert.ok(indexSource.indexOf("js/tile_theme.js") < indexSource.indexOf("js/html_actuator.js"));
assert.ok(actuatorSource.indexOf("tile-accent-") !== -1);
assert.ok(actuatorSource.indexOf("tile-value") !== -1);
assert.ok(actuatorSource.indexOf("tile-motif") !== -1);
assert.ok(actuatorSource.indexOf("tile-name") !== -1);

function assertStyleHooks(stylesheet) {
  assert.ok(stylesheet.indexOf(".game-container") !== -1);
  assert.ok(stylesheet.indexOf(".tile-accent-sage") !== -1);
  assert.ok(stylesheet.indexOf(".tile-accent-berry") !== -1);
  assert.ok(stylesheet.indexOf(".tile-accent-gold") !== -1);
  assert.ok(stylesheet.indexOf(".tile-motif") !== -1);
}

assertStyleHooks(scssSource);
assertStyleHooks(cssSource);
assert.ok(cssSource.indexOf("@keyframes $animation-name") === -1);
assert.ok(cssSource.indexOf("@keyframes appear") !== -1);
assert.ok(cssSource.indexOf("@keyframes pop") !== -1);

console.log("tile theme tests passed (4 cases)");
