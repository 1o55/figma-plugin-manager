import { startMutationObserver } from './mutationObserver';
import { FigmaPluginAPI } from './FigmaPluginAPI';
import Vue from 'vue';
import App from './App.vue';
import VModal from 'vue-js-modal';
Vue.config.productionTip = false;
Vue.use(VModal);

window.figmaPlugin = FigmaPluginAPI;
const app = document.createElement('div');
app.id = 'pluginManagerApp';
document.body.appendChild(app);
const vue = new Vue({
	el: '#pluginManagerApp',
	render: h => h(App)
});

const injectpluginManagerButton = () => {
	const notificationButton = document.querySelector('[data-tooltip-text="Show notifications"]');
	notificationButton.parentElement.style.display = 'flex';
	const pluginManagerButton = document.createElement('div');
	pluginManagerButton.id = 'pluginManagerButton';
	pluginManagerButton.className = vue.$children[0].numberOfUpdates > 0 ? 'top-bar-button has-badge' : 'top-bar-button';
	pluginManagerButton.innerHTML = '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 1H19V10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1ZM0 10C0 4.47715 4.47715 0 10 0H19H20V1V10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10ZM9.5 9.5V6H10.5V9.5H14V10.5H10.5V14H9.5V10.5H6V9.5H9.5Z" fill="white"/></svg>';
	notificationButton.parentNode.insertBefore(pluginManagerButton, notificationButton);
	pluginManagerButton.onclick = vue.$children[0].toggleModal;
	FigmaPluginAPI.addTooltip(pluginManagerButton, 'Plugins', true);
};

FigmaPluginAPI.onFileBrowserLoaded(() => {
	if (document.querySelector('#pluginManagerButton') === null) injectpluginManagerButton();
});

FigmaPluginAPI.onFileBrowserChanged(() => {
	vue.$children[0].hide();
	if (document.querySelector('#pluginManagerButton') === null) injectpluginManagerButton();
});

FigmaPluginAPI.onFileBrowserUnloaded(() => {
	vue.$children[0].hide();
});

if (document.querySelector('[data-tooltip-text="Show notifications"]') !== null) {
	if (document.querySelector('#pluginManagerButton') === null) injectpluginManagerButton();
}

if (!window.__figmaDesktop) startMutationObserver();

if (JSON.parse(localStorage.getItem('installedPlugins')) !== null) {
	const installedPlugins = JSON.parse(localStorage.getItem('installedPlugins'));
	installedPlugins.forEach(plugin => {
		plugin.css.forEach(css => {
			const styles = document.createElement('link');
			styles.rel = 'stylesheet';
			styles.type = 'text/css';
			styles.href = css + '?_=' + new Date().getTime();
			document.body.appendChild(styles);
		});
		plugin.js.forEach(js => {
			const script = document.createElement('script');
			script.src = js + '?_=' + new Date().getTime();
			document.body.appendChild(script);
		});
	});
}
