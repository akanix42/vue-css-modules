This package enables integration between [akryum:vue-component](https://github.com/Akryum/vue-meteor) and [nathantreid:css-modules](https://github.com/nathantreid/meteor-css-modules).

## Installation

Prerequisites:

```bash
meteor add akyrum:vue-component
```

Install using Meteor's package management system:

```bash
meteor add nathantreid:vue-css-modules
```

Usage:

Add the `module` attribute to any `<style>` tag in your component file and access the styles via the `$style` property:
```html
<style module>
/* Will only be applied to this component <a> elements */
.red {
   color: red;
   composes: bold from '/imports/ui/types.css';
}
</style>

<template>
  <div :class="$style.red">Red Text</div>
</template>

<script>
  export default {
    created() {
      console.log(this.$style.red);
    }
  }
</script>
```

## Composing from other files
Composition from other .vue files currently doesn't work. To enable composition from other css module files (.css, .scss, etc) install [nathantreid:css-modules](https://github.com/nathantreid/meteor-css-modules).


## Package Options
CSS modules compilation is handled by [nathantreid:css-modules](https://github.com/nathantreid/meteor-css-modules). Please see that package for configuration information.
Options from the `nathantreid:css-modules` package.json configuration will also be applied to these. Note that if you are using less, scss, etc with nathantreid:css-modules, options that affect transpilation (such as `globalVariables`) will not be applied to your .vue styles.
