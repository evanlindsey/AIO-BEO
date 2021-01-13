module.exports = {
    'env': {
        'es2021': true,
        'node': true,
        'mocha': true
    },
    'extends': [
        'eslint:recommended'
    ],
    'parserOptions': {
        'ecmaVersion': 12,
        'sourceType': 'module'
    },
    'rules': {
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'no-multi-spaces': ['error'],
        'eol-last': ['error', 'always'],
    }
};
