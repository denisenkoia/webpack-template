import '!style-loader!css-loader!sass-loader!../scss/main.scss';
import { storiesOf } from '@storybook/vue';

// Components
import BaseButton from '../components/BaseButton.vue';


// Stories
storiesOf('BaseButton', module)
  	.add('default', () => ({
		components: { BaseButton },
		template: '<base-button class="green">BaseButton</base-button>'
	}))
	.add('disabled', () => ({
		components: { BaseButton },
		template: '<base-button :disabled="true">BaseButton</base-button>'
  	}))