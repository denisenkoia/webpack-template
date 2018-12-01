# webpack-template

### Stack ###

* Vue
* Vuex
* Vue-router
* @babel/polyfill
* markup-inline-loader ( https://github.com/asnowwolf/markup-inline-loader )

### Run ###

* yarn install
* yarn run dev

### Build ###

* yarn run build ( build dev version )
* yarn run buildProd ( build prod version )

### Entry point ###

* ./src/common.js 
* ./src/scss/main.scss

### Output ###

* ./src/assets/js/common.js ( common.js.map deleted, when build production )
* ./src/assets/css/main.css ( main.css.map deleted, when build production )