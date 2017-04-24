global.vue = global.vue || {}
// global.vue.lang = global.vue.lang || {}
global.vue.cssModules = compileStyles;

function compileStyles({
                         source,
                         inputFile,
                         dependencyManager,
                         tag
                       }) {
  try {
    const result = global.cssModules.compiler.compileFromSource(source, inputFile);
    const compileResult = result.compileResult;

    let importsCode;
    if (compileResult.imports) {
      importsCode = compileResult.imports.map(importPath => `require ('${importPath}');`).join('\n');
    }
    if (compileResult.importTree) {
      compileResult.importTree.forEach(importPath => dependencyManager.addDependency(importPath));
    }

    const vueResult = {
      css: result.compileResult.stylesheet,
      map: JSON.stringify(result.sourceMap),
      cssModules: result.compileResult.tokens,
      js: importsCode,
    };
    return vueResult;
  } catch (err) {
    console.error(err);
    console.error(err.stack);
    throw err;
  }
}

// global.vue.lang.scss = compileStyles;
// global.vue.lang.css = compileStyles;
