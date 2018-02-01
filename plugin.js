import fs from 'fs';
import getAbsoluteImportPath from './getAbsoluteImportPath';
import { stripIndent } from 'common-tags';

global.vue = global.vue || {};
global.vue.cssModules = compileStyles;

function compileStyles({
                         source,
                         inputFile,
                         dependencyManager,
                         tag,
                         cssModules,
                       }) {
  try {
    if (!global.cssModules) {
      console.error('nathantreid:vue-css-modules sometimes requires the nathantreid:css-modules package to be installed. To add the package, run the following command:');
      console.error('\nmeteor add nathantreid:css-modules\n');
      console.error('By default, nathantreid:css-modules will process your .css files as well. To avoid this, add the following to your package.json:');
      console.error(`
        {
          "cssModules": {
            "extensions": ["dont-process-anything"],
          }
        }
      `);
      throw new Error("See above error message");
    }
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
      const moduleName = typeof tag.attrs.module === 'string' ? tag.attrs.module : '$style';
      if (cssModules === undefined) {
        cssModules = {};
      }
      cssModules[moduleName] = compileResult.stylesCode;
    }

    if (compileResult.partialTypescriptDeclaration) {
      const declarationPath = `${getAbsoluteImportPath(compileResult.filePath)}.d.ts`;
      const output = stripIndent`
        interface IStyles {
          ${compileResult.partialTypescriptDeclaration}
        }
        export const $style: IStyles;
      `;
      fs.writeFile(declarationPath, output);
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

