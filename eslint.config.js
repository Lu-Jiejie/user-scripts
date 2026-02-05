const antfu = require('@antfu/eslint-config').default

module.exports = antfu(
  {
    ignores: [
      // eslint ignore globs here
    ],
  },
  {
  },
).removeRules(
  'import/no-duplicates',
  'import/no-self-import',
  'no-console',
)
