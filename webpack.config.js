const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/debounce.js",
    "./js/backend.js",
    "./js/filter.js",
    './js/file.js',
    "./js/form.js",
    "./js/card.js",
    "./js/pin.js",
    "./js/map.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public/js"),
    iife: true
  },
  devtool: false
}

