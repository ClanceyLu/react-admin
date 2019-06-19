module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  env: {
    browser: true,
  },
  settings: {
    'import/resolver': {
      'node': {
        paths: ['src'],
      },
    },
  },
  rules: {
    semi: 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'react/prop-types': 0,
    'no-unused-vars': 1,
    'react/prefer-stateless-function': 1,
    // 'import/no-unresolved': 0,
    'newline-per-chained-call': 0,
    'react/no-unused-state': 1,
    "jsx-a11y/anchor-is-valid": [ "error", {
      "components": [ "Link" ],
      "specialLink": [ "to" ]
    }]
  }
};
