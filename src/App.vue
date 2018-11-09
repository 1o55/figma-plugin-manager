<template lang="pug">
	#pluginManager
		modal(name='pluginManagerModal' ref='modal' @opened='openModal' @closed='modalClosed' draggable='.modal-large-header' width='460' height='auto' maxHeight='642')
			.modal-large-header
				.modal-header-title Plugins
				.modal-close-button(ref='closeButton' @click='hide')
			.modal-content
				.list-screen(:class='{detailScreenOn: detailScreenOn}')
					.search-box
						.search-icon ō
						input(v-model='searchText' placeholder='Search' spellcheck='false')
					.plugins-list-scroll-container
						.empty-message(v-if='searchedPlugins.length === 0') No results for '{{ searchText }}'
						pluginItem(type='text' v-for='plugin in searchedPlugins' :key='plugin.name' :plugin='plugin' @goToDetail='goToDetail')
				detailScreen(:plugin='selectedPlugin' @backToList='detailScreenOn = false' :class='{detailScreenOn: detailScreenOn}')
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
		plugins: [
			{
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
				images: [
					'https://github.com/jachui/figma-distributor/blob/master/screenshot.png?raw=true',
					'https://github.com/jachui/figma-pdf-export/blob/master/screenshot.png?raw=true'
				]
			},
			{
				name: 'PDF Export',
				version: '1.2.1',
				author: 'Jackie Chui',
				description: "Export a PDF file containing all the frames in the current page. A new PDF option will be added to Figma's export picker."
			},
			{
				name: 'Layer Distributor',
				version: '1.2.3',
				author: 'Jackie Chui',
				description: 'Distribute layers with consistent spacing. Accessible via the alignment tools or keyboard shortcut (Ctrl/Cmd + Shift + D).'
			},
			{
				name: 'Batch Rename',
				version: '1.0.0',
				author: 'Ahmed Al-Haddad',
				description: 'Rename multiple layers at the same time.'
			},
			{
				name: 'Find and Replace',
				version: '1.1.5',
				author: 'Jackie Chui',
				description: 'Find and replace texts and layer names easily. Accessible via the toolbar button or keyboard shortcut (Ctrl/Cmd + F).'
			}
		]
	}),
	computed: {
		searchedPlugins() {
			return this.plugins.filter(plugin => {
				return plugin.name.toLowerCase().match(this.searchText.toLowerCase());
			});
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
</style>
