import Vue from 'vue';
import App from './App.vue';
import VModal from 'vue-js-modal';
Vue.config.productionTip = false;
Vue.use(VModal);

console.log('started main.js');
let projectsPageLoaded = false;
let fileLoaded = false;
let menuOpened = false;
const reactPage = document.getElementById('react-page');
const app = document.createElement('div');
app.id = 'pluginManagerApp';
reactPage.parentNode.insertBefore(app, reactPage.nextSibling);
window.pluginManagerVue = new Vue({
	el: '#pluginManagerApp',
	render: h => h(App)
});

const injectManagerButton = () => {
	const notificationButton = document.querySelector('[data-tooltip-text="Show notifications"]');
	notificationButton.parentElement.style.display = 'flex';
	const managerButton = document.createElement('div');
	managerButton.id = 'managerButton';
	managerButton.innerHTML =
		'<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 1H19V10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1ZM0 10C0 4.47715 4.47715 0 10 0H19H20V1V10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10ZM9.5 9.5V6H10.5V9.5H14V10.5H10.5V14H9.5V10.5H6V9.5H9.5Z" fill="white"/></svg>';
	notificationButton.parentNode.insertBefore(managerButton, notificationButton);
	managerButton.addEventListener(
		'click',
		function() {
			window.pluginManagerVue.$children[0].toggleModal();
		},
		false
	);
};

window.addEventListener('projectsPageLoaded', () => {
	console.log('found2');
	if (document.querySelector('#managerButton') === null) injectManagerButton();
});

window.addEventListener('projectsPageChanged', () => {
	window.pluginManagerVue.$children[0].hide();
	if (document.querySelector('#managerButton') === null) injectManagerButton();
});

window.addEventListener('projectsPageUnloaded', () => {
	window.pluginManagerVue.$children[0].hide();
});

window.addEventListener('fileLoaded', () => {});

window.addEventListener('fileUnloaded', () => {});

window.addEventListener('menuOpened', event => {});

window.addEventListener('menuClosed', () => {});

if (document.querySelector('[data-tooltip-text="Show notifications"]') !== null && !projectsPageLoaded) {
	console.log('found');
	projectsPageLoaded = true;
	window.dispatchEvent(new CustomEvent('projectsPageLoaded'));
} else console.log('not found');

new MutationObserver(mutations => {
	mutations.forEach(mutation => {
		console.log(mutation);
		if (document.querySelector('[data-tooltip-text="Show notifications"]') !== null && !projectsPageLoaded) {
			projectsPageLoaded = true;
			window.dispatchEvent(new CustomEvent('projectsPageLoaded'));
		}
		if (document.querySelector('[data-tooltip-text="Show notifications"]') === null && projectsPageLoaded) {
			projectsPageLoaded = false;
			window.dispatchEvent(new CustomEvent('projectsPageUnloaded'));
		}
		if (mutation.addedNodes[0] === document.querySelector('div[class*="top_bar--header--"]')) {
			window.dispatchEvent(new CustomEvent('projectsPageChanged'));
		}
		if (window.App._fullscreenIsReady && window.App._state.selectedView.fullscreen && !fileLoaded) {
			fileLoaded = true;
			window.dispatchEvent(new CustomEvent('fileLoaded'));
		}
		if (!window.App._state.selectedView.fullscreen && fileLoaded) {
			fileLoaded = false;
			window.dispatchEvent(new CustomEvent('fileUnloaded'));
		}
		if (window.App._state.dropdownShown !== null && !menuOpened) {
			menuOpened = true;
			window.dispatchEvent(new CustomEvent('menuOpened', { detail: window.App._state.dropdownShown }));
		}
		if (!window.App._state.dropdownShown && menuOpened) {
			menuOpened = false;
			window.dispatchEvent(new CustomEvent('menuClosed'));
		}
	});
}).observe(reactPage, { childList: true, subtree: true });

// window.addEventListener('load', () => {
// 	new MutationObserver(mutations => {
// 		mutations.forEach(mutation => {
// 			if (mutation.addedNodes[0] === document.querySelector('div[class*="top_bar--header--"]')) console.log(mutation);
// 		});
// 	}).observe(document.getElementById('react-page'), { childList: true, subtree: true });
// });
