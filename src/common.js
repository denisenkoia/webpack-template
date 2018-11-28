// require polyfill
import '@babel/polyfill';



// require scripts
import './js/_newScript';


// require app component
import Vue from 'vue';
import App from './components/app.vue';


new Vue({
    el: '#app',
    render: (createElement) => {
        return createElement(App);
    }
});