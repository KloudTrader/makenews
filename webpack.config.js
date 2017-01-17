const path = require("path");

module.exports = {
    "context": path.join(__dirname, "/client"),

    "entry": "./src/js/index",

    "output": {
        "filename": "app-min.js",
        "path": path.join(__dirname, "/dist/client")
    },

    "resolve": {
        "extensions": ["", ".js", ".jsx", ".json"]
    },

    "module": {
        "loaders": [
            {
                "test": /\.jsx?$/,
                "exclude": /node_modules/,
                "loaders": ["babel-loader"]
            }
        ]
    }
};
