<template lang="pug">
	#pluginManager
		modal(name='pluginManagerModal' ref='modal' @opened='openModal' @closed='modalClosed' draggable='.modal-header' width='460' height='auto' maxHeight='642')
			.modal-header.header-large
				.modal-tabs
					.modal-tab(:class='{"active-tab": !installedScreenOn}' @click='installedScreenOn = false, detailScreenOn = false, searchText = ""') Plugins
					.modal-tab(:class='{"active-tab": installedScreenOn}' @click='installedScreenOn = true, detailScreenOn = false, searchText = ""') Installed
				.modal-close-button(ref='closeButton' @click='hide')
			.modal-content
				.list-screen(v-if='!installedScreenOn || (installedScreenOn && installedPlugins.length > 0)' :class='{detailScreenOn: detailScreenOn}')
					.search-box
						.figma-icon.search
						input(v-model='searchText' placeholder='Search' spellcheck='false')
					.plugins-list
						pluginItem(type='text' v-for='plugin in searchedPlugins' :key='plugin.id' :plugin='plugin' :installed='installedPlugins.find(installedPlugin => installedPlugin.id === plugin.id) !== undefined' :installedScreenOn='installedScreenOn' @goToDetail='goToDetail' @install='install')
						.no-search-results-message(v-if='searchedPlugins.length === 0 && searchText !== ""') No results for '{{ searchText }}'
				detailScreen(:class='{detailScreenOn: detailScreenOn}' :plugin='selectedPlugin' :installed='installedPlugins.find(installedPlugin => installedPlugin.id === selectedPlugin.id) !== undefined' @backToList='detailScreenOn = false' @install='install' @uninstall='uninstall')
				.empty-state(v-if='installedScreenOn && installedPlugins.length === 0') No plugins installed
</template>

<script>
import PluginItem from './components/PluginItem';
import DetailScreen from './components/DetailScreen';
const masterList = require('../masterList.json');
export default {
	components: {
		PluginItem,
		DetailScreen
	},
	data: () => ({
		modalOpened: false,
		searchText: '',
		selectedPlugin: {},
		detailScreenOn: false,
		installedScreenOn: false,
		plugins: [],
		installedPlugins: []
	}),
	watch: {
		installedPlugins: array => {
			localStorage.setItem('installedPlugins', JSON.stringify(array));
		}
	},
	mounted() {
		var self = this;
		if (JSON.parse(localStorage.getItem('installedPlugins')) !== null) {
			this.installedPlugins = JSON.parse(localStorage.getItem('installedPlugins'));
		} else localStorage.setItem('installedPlugins', JSON.stringify([]));
		masterList.forEach(pluginEntry => {
			const pluginRequest = new XMLHttpRequest();
			pluginRequest.addEventListener('load', function() {
				self.plugins.push(JSON.parse(this.responseText));
			});
			pluginRequest.open('GET', pluginEntry.manifest + '?_=' + new Date().getTime());
			pluginRequest.send();
		});
	},
	computed: {
		searchedPlugins() {
			if (!this.installedScreenOn) {
				return this.plugins.filter(plugin => {
					return plugin.name.toLowerCase().match(this.searchText.toLowerCase());
				});
			} else {
				const installedPlugins = this.plugins.filter(plugin => {
					return this.installedPlugins.find(installedPlugin => installedPlugin.id === plugin.id);
				});
				return installedPlugins.filter(plugin => {
					return plugin.name.toLowerCase().match(this.searchText.toLowerCase());
				});
			}
		}
	},
	methods: {
		show() {
			this.$modal.show('pluginManagerModal');
		},
		hide() {
			this.$modal.hide('pluginManagerModal');
		},
		openModal() {
			this.modalOpened = true;
			document.querySelector('#pluginManagerButton').classList.add('active');
		},
		modalClosed() {
			this.installedScreenOn = false;
			this.modalOpened = false;
			this.detailScreenOn = false;
			document.querySelector('#pluginManagerButton').classList.remove('active');
		},
		toggleModal() {
			this.modalOpened ? this.hide() : this.show();
		},
		goToDetail(plugin) {
			this.selectedPlugin = plugin;
			this.detailScreenOn = true;
		},
		install(plugin) {
			this.installedPlugins.push(plugin);
			const toast = {
				type: 'VISUAL_BELL_ENQUEUE',
				payload: {
					type: 'installed_plugin',
					message: window.__figmaDesktop
						? 'Plugin installed. Restart the app to see changes.'
						: 'Plugin installed. Refresh this page to see changes.',
					timeout: 10e3
				}
			};
			window.__figmaDesktop
				? null
				: Object.assign(toast.payload, {
						button: {
							text: 'Refresh',
							action: () => {
								location.reload();
							}
						}
				  });
			window.App._dispatch(toast);
		},
		uninstall(plugin) {
			this.installedPlugins = this.installedPlugins.filter(installedPlugin => installedPlugin.id !== plugin.id);
			this.detailScreenOn = false;
			const toast = {
				type: 'VISUAL_BELL_ENQUEUE',
				payload: {
					type: 'uninstalled_plugin',
					message: window.__figmaDesktop
						? 'Plugin uninstalled. Restart the app to see changes.'
						: 'Plugin uninstalled. Refresh this page to see changes.',
					timeout: 10e3
				}
			};
			window.__figmaDesktop
				? null
				: Object.assign(toast.payload, {
						button: {
							text: 'Refresh',
							action: () => {
								location.reload();
							}
						}
				  });
			window.App._dispatch(toast);
		}
	}
};
</script>

<style lang="scss">
@import './css/FigmaPluginUI';

.plugin-context-menu-item {
	font-size: 11px;
	line-height: 24px;
	padding: 0px 12px;
	color: #fff;
	&:hover {
		background: #30c2ff;
	}
}

.list-screen {
	transition: transform 0.2s ease;
	transform: translateX(0px);
	&.detailScreenOn {
		transform: translateX(-100%);
	}
}

.plugins-list {
	height: 546px;
	max-height: -webkit-calc(70vh - 48px);
	max-height: calc(70vh - 48px);
	overflow-y: auto;
}

.modal-content > .empty-state {
	width: 460px;
	height: 595px;
	max-height: 70vh;
}
</style>
