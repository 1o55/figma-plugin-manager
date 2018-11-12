<template lang="pug">
	.pluginItem(@click='goToDetail')
		.name {{ plugin.name }}
		.author {{ plugin.author}}
		.description {{ plugin.description }}
		button.button(v-show='!installed && !installedScreenOn' @click.stop='install') Install
		button.button(v-show='installed && !installedScreenOn' disabled='true') Installed
		.chevron œ
</template>

<script>
export default {
	props: ['plugin', 'installed', 'installedScreenOn'],
	methods: {
		goToDetail(event) {
			this.$emit('goToDetail', this.plugin);
		},
		install() {
			this.$emit('install', this.plugin);
		}
	}
};
</script>

<style lang="scss">
.pluginItem {
	padding: 16px 24px;
	position: relative;
	&:hover {
		background: #f8f8f8;
	}
	.name {
		display: inline-block;
		color: #444444;
		font-size: 14px;
	}
	.version {
		display: inline-block;
		color: #aaaaaa;
		margin-left: 8px;
	}
	.author {
		margin-top: 3px;
		color: #aaaaaa;
	}
	.description {
		margin-top: 8px;
		color: #aaaaaa;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	button {
		position: absolute;
		top: 16px;
		right: 48px;
	}
	.chevron {
		font-family: 'FigmaIcons';
		font-size: 12px;
		position: absolute;
		top: 24px;
		right: 24px;
	}
}
</style>
