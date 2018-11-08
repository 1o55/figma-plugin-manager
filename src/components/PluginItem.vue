<template lang="pug">
  .pluginItem
    .name {{ plugin.name }}
    .version {{ plugin.version }}
    .author {{ plugin.author}}
    .description {{ plugin.description }}
    button Install
</template>

<script>
export default {
	name: 'pluginItem',
	props: ['plugin']
};
</script>

<style lang="scss">
.pluginItem {
	margin: 24px;
	position: relative;
}
.name {
	display: inline-block;
	color: #444444;
	font-size: 13px;
	font-weight: 500;
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
}
.pluginItem button {
	position: absolute;
	top: 0px;
	right: 0px;
}
</style>
