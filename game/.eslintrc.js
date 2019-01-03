module.exports = {
  "extends": "airbnb-base",
  "globals": {
  "window": true,
  "document": true,
  "localStorage": true,
  "fetch": true,
  },
  "env": {
  "browser": true,
  "node": true,
  "jest": true,
  },
  "rules": {
  "max-len": ["error", { "code": 80 }],
  },
};
