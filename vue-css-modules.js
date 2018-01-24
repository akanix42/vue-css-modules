global.vue = global.vue || {}
// global.vue.lang = global.vue.lang || {}
global.vue.cssModules = compileStyles;

function compileStyles({
                         source,
                         inputFile,
                         dependencyManager,
                         tag,
                         cssModules,
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

    if (compileResult.stylesCode) {
      const moduleName = typeof tag.attribs.module === 'string' ? tag.attribs.module : '$style';
      if (cssModules === undefined) {
        cssModules = {};
      }
      cssModules[moduleName] = compileResult.stylesCode;
    }

    const vueResult = {
      css: result.compileResult.stylesheet,
      map: JSON.stringify(result.sourceMap),
      cssModules,
      js: importsCode,
    };
    return vueResult;
  } catch (err) {
    console.error(err);
    // console.error(err.stack);
    throw err;
  }
}
