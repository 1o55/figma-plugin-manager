export function startMutationObserver() {
	let fileBrowserLoaded = false;
	let fileLoaded = false;
	let modalOpened = false;
	let menuOpened = false;
	new MutationObserver(() => {
		if (document.getElementsByClassName('nav-12').length > 0 && !fileBrowserLoaded) {
			fileBrowserLoaded = true;
			window.dispatchEvent(new CustomEvent('fileBrowserLoaded'));
		}

		if (
			!document.getElementById('pluginManagerButton') &&
			document.getElementsByClassName('nav-12').length > 0 &&
			fileBrowserLoaded
		) {
			window.dispatchEvent(new CustomEvent('fileBrowserChanged'));
		}

		if (document.getElementsByClassName('nav-12').length === 0 && fileBrowserLoaded) {
			fileBrowserLoaded = false;
			window.dispatchEvent(new CustomEvent('fileBrowserUnloaded'));
		}

		if (window.App._fullscreenIsReady && window.App._state.selectedView.fullscreen && !fileLoaded) {
			fileLoaded = true;
			window.dispatchEvent(new CustomEvent('fileLoaded'));
		}

		if (window.App._fullscreenIsReady && window.App._state.selectedView.fullscreen === undefined && fileLoaded) {
			fileLoaded = false;
			window.dispatchEvent(new CustomEvent('fileUnloaded'));
		}

		if (document.querySelector('div[class*="modal--header--"]') && !modalOpened) {
			modalOpened = true;
			window.dispatchEvent(
				new CustomEvent('modalOpened', {
					detail: document.querySelector('div[class*="modal--header"]').innerText.trim()
				})
			);
		}

		if (!document.querySelector('div[class*="modal--header--"]') && modalOpened) {
			modalOpened = false;
			window.dispatchEvent(new CustomEvent('modalClosed'));
		}

		if (window.App._state.dropdownShown && !menuOpened) {
			menuOpened = true;
			window.dispatchEvent(
				new CustomEvent('menuOpened', {
					detail: {
						type: window.App._state.dropdownShown.type,
						hasMoreOptions:
							[...document.querySelectorAll('div[class*="multilevel_dropdown--name"]')].find(
								node => node.innerText === 'More'
							) !== undefined
					}
				})
			);
		}

		if (!window.App._state.dropdownShown && menuOpened) {
			menuOpened = false;
			window.dispatchEvent(new CustomEvent('menuClosed'));
		}
	}).observe(document.getElementById('react-page'), { childList: true, subtree: true });
}
