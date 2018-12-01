<template>
	<div class="b-btn-wrap" @click="clickHandler">
		<button :disabled="disabled">
			<slot></slot>
		</button>
	</div>
</template>


<script>
	export default {
		name: "BaseButton",
		props: {
			disabled: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			clickHandler() {
				if (!this.disabled) {
					this.$emit('click');
				}
			}
		}
	};
</script>