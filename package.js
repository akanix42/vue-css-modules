Package.describe({
  name: 'nathantreid:vue-css-modules',
  version: '0.0.5-beta.1',
  // Brief, one-line summary of the package.
  summary: 'CSS modules compiler for akryum:vue-component using nathantreid:css-modules',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/nathantreid/vue-css-modules',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.registerBuildPlugin({
  name: 'vue-css-modules',
  use: [
    'ecmascript@0.10.0',
    'nathantreid:css-modules@3.2.0-beta.1',
  ],
  sources: [
    'getAbsoluteImportPath.js',
    'plugin.js'
  ],
  npmDependencies: {
    'common-tags': '1.3.1',
    'meteor-project-path': '0.0.3',
  }
});
