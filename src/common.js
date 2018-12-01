// require polyfill
import '@babel/polyfill';


// require scripts
import '@js/newScript.js';


// require app
import Vue from 'vue';
import App from '@components/app.vue';
import Store from '@store/store.js';

new Vue({
	el: '#app',
	store: Store,
	render: (createElement) => {
		return createElement(App);
	}
});