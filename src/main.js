import { startMutationObserver } from './mutationObserver';
import { FigmaPluginAPI } from './FigmaPluginAPI';
import App from './App.vue';
import shajs from 'sha.js';
import axios from 'axios';

let masterList = JSON.parse(localStorage.getItem('masterList'));

window.figmaPlugin = FigmaPluginAPI;
const app = document.createElement('div');
app.id = 'pluginManagerApp';
document.body.appendChild(app);
const vue = new FigmaPluginAPI.Vue({
	el: '#pluginManagerApp',
	render: h => h(App)
});

const injectpluginManagerButton = () => {
	const notificationButton = document.querySelector('[data-tooltip-text="Show notifications"]');
	notificationButton.parentElement.style.display = 'flex';
	const pluginManagerButton = document.createElement('div');
	pluginManagerButton.id = 'pluginManagerButton';
	pluginManagerButton.className = vue.$children[0].numberOfUpdates > 0 ? 'top-bar-button has-badge' : 'top-bar-button';
	pluginManagerButton.innerHTML =
		'<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 1H19V10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1ZM0 10C0 4.47715 4.47715 0 10 0H19H20V1V10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10ZM9.5 9.5V6H10.5V9.5H14V10.5H10.5V14H9.5V10.5H6V9.5H9.5Z" fill="white"/></svg>';
	notificationButton.parentNode.insertBefore(pluginManagerButton, notificationButton);
	pluginManagerButton.onclick = vue.$children[0].toggleModal;
	FigmaPluginAPI.addTooltip(pluginManagerButton, 'Plugins', true);
};

FigmaPluginAPI.onFileBrowserLoaded(() => {
	vue.$children[0].hide();
	if (document.querySelector('#pluginManagerButton') === null) injectpluginManagerButton();
});

FigmaPluginAPI.onFileBrowserChanged(() => {
	vue.$children[0].hide();
	if (document.querySelector('#pluginManagerButton') === null) injectpluginManagerButton();
});

FigmaPluginAPI.onFileBrowserUnloaded(() => {
	vue.$children[0].hide();
});

FigmaPluginAPI.createKeyboardShortcut(
	{ mac: { shift: true, command: true, key: 'P' }, windows: { shift: true, control: true, key: 'P' } },
	vue.$children[0].toggleModal
);

if (document.querySelector('[data-tooltip-text="Show notifications"]') !== null) {
	if (document.querySelector('#pluginManagerButton') === null) injectpluginManagerButton();
}

FigmaPluginAPI.onMenuOpened(type => {
	if (type === 'fullscreen-menu-dropdown') {
		const preferences = document.querySelectorAll('div[class*="multilevel_dropdown--option"]')[8];
		const pluginMenuOption = document.createElement('div');
		pluginMenuOption.className = 'plugin-dropdown-option';
		pluginMenuOption.id = 'plugin-menu';
		const labelDiv = document.createElement('div');
		labelDiv.className = 'plugin-dropdown-option-text';
		labelDiv.innerText = 'Plugins';
		const shortcutDiv = document.createElement('div');
		shortcutDiv.className = 'plugin-dropdown-option-chevron';
		pluginMenuOption.appendChild(labelDiv);
		pluginMenuOption.appendChild(shortcutDiv);
		preferences.parentNode.insertBefore(pluginMenuOption, preferences.nextSibling);
		const pluginSubmenu = document.createElement('div');
		pluginSubmenu.id = 'pluginSubmenu';
		pluginSubmenu.className = 'plugin-dropdown-submenu';
		const pluginOptions = document.createElement('div');
		pluginOptions.id = 'pluginOptions';
		const managePluginButton = document.createElement('div');
		managePluginButton.className = 'plugin-dropdown-option';
		managePluginButton.onclick = () => {
			vue.$children[0].toggleModal();
		};
		const managePluginButtonLabel = document.createElement('div');
		managePluginButtonLabel.className = 'plugin-dropdown-option-text';
		managePluginButtonLabel.innerText = 'Manage Plugins';
		managePluginButton.appendChild(managePluginButtonLabel);
		const managePluginButtonShortcut = document.createElement('div');
		managePluginButtonShortcut.className = 'plugin-dropdown-option-shortcut';
		managePluginButtonShortcut.innerText = '⇧⌘P';
		managePluginButton.appendChild(managePluginButtonShortcut);
		pluginSubmenu.appendChild(pluginOptions);
		pluginSubmenu.appendChild(managePluginButton);
		pluginSubmenu.style.display = 'none';
		document.querySelector('div[class*="dropdown--dropdown--"]').parentElement.parentElement.appendChild(pluginSubmenu);
		pluginMenuOption.onclick = e => {
			e.preventDefault(), e.stopPropagation();
		};
		pluginMenuOption.onmouseover = e => {
			e.stopPropagation();
			pluginMenuOption.style.backgroundColor = '#30c2ff';
			const submenu = document.querySelector('div[class*="multilevel_dropdown--menu"]');
			if (submenu) {
				submenu.style.display = 'none';
			}
			const activeNode = document.querySelector('div[class*="multilevel_dropdown--optionActive"]');
			if (activeNode) {
				const activeClassName = [...activeNode.classList].find(className => className.includes('optionActive'));
				activeNode.classList.remove(activeClassName);
				activeNode.onmouseover = e => {
					if (submenu) {
						submenu.style.display = '';
					}
					activeNode.classList.add(activeClassName);
				};
			}
			pluginSubmenu.style.top = `${pluginMenuOption.getBoundingClientRect().top - 6}px`;
			pluginSubmenu.style.left = `${pluginMenuOption.getBoundingClientRect().right}px`;
			pluginSubmenu.style.display = 'block';
		};
		document.querySelector('div[class*="dropdown--dropdown--"]').addEventListener('mouseover', () => {
			pluginSubmenu.style.display = 'none';
			pluginMenuOption.style.backgroundColor = '';
		});
	}
});

const installedPlugins = JSON.parse(localStorage.getItem('installedPlugins'));
if (installedPlugins !== null) {
	installedPlugins.forEach(plugin => {
		if (plugin.css) {
			plugin.css.forEach(css => {
				const styles = document.createElement('link');
				styles.rel = 'stylesheet';
				styles.type = 'text/css';
				styles.href = css + '?_=' + new Date().getTime();
				document.body.appendChild(styles);
			});
		}
		if (plugin.js) {
			const promises = [];
			plugin.js.forEach(js => {
				promises.push(axios.get(js + '?_=' + new Date().getTime()));
			});
			axios.all(promises).then(
				axios.spread((...args) => {
					const scripts = args.map(response => response.data);
					const loadedHash = shajs('sha256')
						.update(scripts.join())
						.digest('hex');
					if (loadedHash === masterList.find(pluginEntry => pluginEntry.id === plugin.id).hash) {
						args.forEach(response => {
							eval(response.data);
						});
					} else {
						console.log(`masterListHash: ${masterList.find(pluginEntry => pluginEntry.id === plugin.id).hash}`);
						console.log(`loadedHash: ${loadedHash}`);
						window.addEventListener('appLoaded', () => {
							FigmaPluginAPI.showToast(`This version of "${plugin.name}" has not been approved and will not run.`, 3);
						});
					}
				})
			);
		}
	});
	const localServer = JSON.parse(localStorage.getItem('localServer'));
	if (localServer !== null) {
		if (localServer.connected) {
			localServer.cssFiles.forEach(css => {
				const styles = document.createElement('link');
				styles.rel = 'stylesheet';
				styles.type = 'text/css';
				styles.href = 'http://localhost:' + localServer.port + '/' + css + '?_=' + new Date().getTime();
				document.body.appendChild(styles);
			});
			const promises = [];
			localServer.jsFiles.forEach(js => {
				promises.push(axios.get(`http://localhost:${localServer.port}/${js}?_=${new Date().getTime()}`));
				const script = document.createElement('script');
				script.src = 'http://localhost:' + localServer.port + '/' + js + '?_=' + new Date().getTime();
				document.body.appendChild(script);
			});
			axios.all(promises).then(
				axios.spread((...args) => {
					const scripts = args.map(response => response.data);
					const loadedHash = shajs('sha256')
						.update(scripts.join())
						.digest('hex');
					localServer.hash = loadedHash;
					localStorage.setItem('localServer', JSON.stringify(localServer));
				})
			);
		}
	}
}

startMutationObserver();
