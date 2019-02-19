module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "settings": {
        "import/resolver": {
            "node": {
                "paths": ["src"]
            }
        }
    },
    "globals": {
      "window": true,
      "history": true,
      "document": true
    },
    "env": {
        "browser": true,
        "node": true,
        "jasmine": true
    },
  "rules": {
        "react/jsx-wrap-multilines": false,
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
		"no-param-reassign": [2, { "props": false }],
        "no-class-assign": "off",
        "no-console": "off",
        "linebreak-style": "off",
        "jsx-a11y/media-has-caption": "off",
        "no-confusing-arrow": "off"
    }
};
