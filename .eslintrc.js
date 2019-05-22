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
        "object-curly-newline": ["error", {"multiline": true, "minProperties": 7}],
        "no-param-reassign": [2, { "props": false }],
        'max-len': "off",
        "no-class-assign": "off",
        "jsx-a11y/label-has-for": [2, {
          "required": {
            "every": ["id"]
          }
        }],
        "react/prop-types": 0,
        "no-console": "off",
        "linebreak-style": "off",
        "jsx-a11y/media-has-caption": "off",
        "no-confusing-arrow": "off"
    }
};
