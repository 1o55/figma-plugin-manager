<template lang="pug">
  #pluginManager
    modal(name='pluginManagerModal' ref='modal' @opened='openModal' @closed='modalClosed' draggable='.modal-large-header' width='460' height='auto')
      .modal-large-header
        .modal-header-title Plugins
        .modal-close-button(ref='closeButton' @click='hide')
</template>

<script>
export default {
	data: () => ({
		modalOpened: false
	}),
	methods: {
		show() {
			this.$modal.show('pluginManagerModal');
		},
		hide() {
			this.$modal.hide('pluginManagerModal');
		},
		openModal() {
			document.querySelector('#managerButton').style.backgroundColor = '#30c2ff';
			this.modalOpened = true;
		},
		modalClosed() {
			this.modalOpened = false;
			document.querySelector('#managerButton').style.backgroundColor = '';
		},
		toggleModal() {
			this.modalOpened ? this.hide() : this.show();
		}
	}
};
</script>

<style lang="scss">
@import './css/plugin-modal';

#pluginManager {
	user-select: none;
}

#managerButton {
	width: 42px;
	svg {
		padding: 12px;
	}
	&:hover {
		background-color: #050505;
	}
}
</style>
