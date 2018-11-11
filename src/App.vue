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
						.search-icon ō
						input(v-model='searchText' placeholder='Search' spellcheck='false')
					.plugins-list-scroll-container
						.empty-message(v-if='searchedPlugins.length === 0 && searchText !== ""') No results for '{{ searchText }}'
						pluginItem(type='text' v-for='plugin in searchedPlugins' :key='plugin.id' :plugin='plugin' :installed='installedPlugins.find(installedPlugin => installedPlugin.id === plugin.id) !== undefined' :installedScreenOn='installedScreenOn' @goToDetail='goToDetail' @install='install')
				detailScreen(:class='{detailScreenOn: detailScreenOn}' :plugin='selectedPlugin' :installed='installedPlugins.find(installedPlugin => installedPlugin.id === selectedPlugin.id) !== undefined' @backToList='detailScreenOn = false' @install='install' @uninstall='uninstall')
				.no-installed-message(v-if='installedScreenOn && installedPlugins.length === 0') No plugins installed
</template>

<script>
import PluginItem from './components/PluginItem';
import DetailScreen from './components/DetailScreen';
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
		plugins: [
			{
				id: 'repeat-grids',
				name: 'Repeat Grids',
				version: '0.0.1',
				author: 'Tony Tung',
				github: 'https://github.com/jachui/figma-pdf-export',
				description:
					"Enables users to quickly duplicate the selected layer in the grid layout, so it's easier to assemble list view, table view, or other organized UI layout with a single element.",
				instructions:
					"Enables users to quickly duplicate the selected layer in the grid layout, so it's easier to assemble list view, table view, or other organized UI layout with a single element.",
				updates: [
					{
						version: '0.0.1',
						date: '8/12/2018',
						notes: 'Added a lot of features'
					}
				],
				images: ['https://github.com/jachui/figma-distributor/blob/master/screenshot.png?raw=true']
			},
			{
				id: 'pdf-export',
				name: 'PDF Export',
				version: '1.2.1',
				author: 'Jackie Chui',
				description:
					"Export a PDF file containing all the frames in the current page. A new PDF option will be added to Figma's export picker."
			},
			{
				id: 'layer-distributor',
				name: 'Layer Distributor',
				version: '1.2.3',
				author: 'Jackie Chui',
				description:
					'Distribute layers with consistent spacing. Accessible via the alignment tools or keyboard shortcut (Ctrl/Cmd + Shift + D).'
			},
			{
				id: 'batch-rename',
				name: 'Batch Rename',
				version: '1.0.0',
				author: 'Ahmed Al-Haddad',
				description: 'Rename multiple layers at the same time.'
			},
			{
				id: 'find-and-replace',
				name: 'Find and Replace',
				version: '1.1.5',
				author: 'Jackie Chui',
				description:
					'Find and replace texts and layer names easily. Accessible via the toolbar button or keyboard shortcut (Ctrl/Cmd + F).'
			}
		],
		installedPlugins: []
	}),
	watch: {
		installedPlugins: array => {
			localStorage.setItem('installedPlugins', JSON.stringify(array));
		}
	},
	mounted() {
		if (JSON.parse(localStorage.getItem('installedPlugins')) !== null) {
			this.installedPlugins = JSON.parse(localStorage.getItem('installedPlugins'));
		} else localStorage.setItem('installedPlugins', JSON.stringify([]));
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
			document.querySelector('#managerButton').style.backgroundColor = '#30c2ff';
			this.detailScreenOn = false;
			this.modalOpened = true;
		},
		modalClosed() {
			this.modalOpened = false;
			this.detailScreenOn = false;
			document.querySelector('#managerButton').style.backgroundColor = '';
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
		},
		uninstall(plugin) {
			this.installedPlugins = this.installedPlugins.filter(installedPlugin => installedPlugin.id !== plugin.id);
			this.detailScreenOn = false;
		}
	}
};
</script>

<style lang="scss">
@import './css/plugin-modal';

.plugin-context-menu-item {
	font-size: 11px;
	line-height: 24px;
	padding: 0px 12px;
	color: #fff;
	&:hover {
		background: #30c2ff;
	}
}

#pluginManager {
	user-select: none;
	cursor: default;
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

.list-screen {
	transition: transform 0.2s ease;
	transform: translateX(0px);
	&.detailScreenOn {
		transform: translateX(-100%);
	}
}

.search-box {
	position: relative;
	height: 48px;
	border-bottom: 1px solid #d4d4d4;
	.search-icon {
		font-family: 'FigmaIcons';
		font-size: 12px;
		height: 12px;
		width: 12px;
		position: absolute;
		top: 17px;
		left: 24px;
		color: #444;
	}
	input {
		background: none;
		height: 32px;
		padding: 8px 46px;
		width: 368px;
		&::placeholder {
			color: #aaa;
		}
	}
}

.plugins-list-scroll-container {
	height: 546px;
	max-height: -webkit-calc(70vh - 48px);
	max-height: calc(70vh - 48px);
	overflow-y: auto;
}

.empty-message {
	color: #aaa;
	padding: 24px 24px 0;
}

.no-installed-message {
	font-size: 14px;
	width: 460px;
	height: 595px;
	max-height: 70vh;
	display: flex;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	flex-direction: column;
	text-align: center;
	-webkit-box-pack: center;
	-webkit-justify-content: center;
	-ms-flex-pack: center;
	justify-content: center;
}
</style>
