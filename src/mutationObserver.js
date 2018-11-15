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

		if (!document.querySelector('div[class*="modal"]') && modalOpened) {
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

// export function startMutationObserver() {
// 	let fileBrowserLoaded = false;
// 	let fileLoaded = false;
// 	let menuOpened = false;
// 	new MutationObserver(mutations => {
// 		for (let i = 0; i < mutations.length; i++) {
// 			const mutation = mutations[i];
// 			if (document.querySelector('[data-tooltip-text="Show notifications"]') !== null && !fileBrowserLoaded) {
// 				fileBrowserLoaded = true;
// 				window.dispatchEvent(new CustomEvent('fileBrowserLoaded'));
// 			}
// 			if (document.querySelector('[data-tooltip-text="Show notifications"]') === null && fileBrowserLoaded) {
// 				fileBrowserLoaded = false;
// 				window.dispatchEvent(new CustomEvent('fileBrowserUnloaded'));
// 			}
// 			if (mutation.addedNodes[0] === document.querySelector('div[class*="top_bar--header--"]')) {
// 				window.dispatchEvent(new CustomEvent('fileBrowserChanged'));
// 			}
// 			if (window.App._fullscreenIsReady && window.App._state.selectedView.fullscreen && !fileLoaded) {
// 				fileLoaded = true;
// 				window.dispatchEvent(new CustomEvent('fileLoaded'));
// 			}
// 			if (!window.App._state.selectedView.fullscreen && fileLoaded) {
// 				fileLoaded = false;
// 				window.dispatchEvent(new CustomEvent('fileUnloaded'));
// 			}
// 			if (
// 				mutation.addedNodes[0] &&
// 				mutation.addedNodes[0].className &&
// 				typeof mutation.addedNodes[0].className === 'string' &&
// 				mutation.addedNodes[0].className.includes('modal--')
// 			) {
// 				window.dispatchEvent(
// 					new CustomEvent('modalOpened', {
// 						detail: document.querySelector('div[class*="modal--header"]').innerText
// 					})
// 				);
// 			}
// 			if (
// 				mutation.removedNodes[0] &&
// 				mutation.removedNodes[0].className &&
// 				typeof mutation.removedNodes[0].className === 'string' &&
// 				mutation.removedNodes[0].className.includes('modal--')
// 			) {
// 				window.dispatchEvent(new CustomEvent('modalClosed'));
// 			}
// 			if (window.App._state.dropdownShown !== null && !menuOpened) {
// 				menuOpened = true;
// 				window.dispatchEvent(
// 					new CustomEvent('menuOpened', {
// 						detail: {
// 							menu: window.App._state.dropdownShown,
// 							hasMoreOptions:
// 								[...document.querySelectorAll('div[class*="multilevel_dropdown--name"]')].find(
// 									node => node.innerText === 'More'
// 								) !== undefined
// 						}
// 					})
// 				);
// 			}
// 			if (!window.App._state.dropdownShown && menuOpened) {
// 				menuOpened = false;
// 				window.dispatchEvent(new CustomEvent('menuClosed'));
// 			}
// 			if (
// 				mutation.addedNodes[0] &&
// 				mutation.addedNodes[0].attributes &&
// 				mutation.addedNodes[0].attributes.name &&
// 				mutation.addedNodes[0].attributes.name.value === 'layerMenu' &&
// 				document.querySelectorAll('div[name="layerMenu"]').length === 2 &&
// 				[
// 					...[...document.querySelectorAll('div[class*="multilevel_dropdown--name"]')].find(
// 						node => node.innerText === 'More'
// 					).parentNode.classList
// 				].some(className => className.includes('dropdown--optionActive'))
// 			) {
// 				window.dispatchEvent(
// 					new CustomEvent('moreMenuOpened', {
// 						detail: {
// 							menu: window.App._state.dropdownShown,
// 							hasMoreOptions:
// 								[...document.querySelectorAll('div[class*="multilevel_dropdown--name"]')].find(
// 									node => node.innerText === 'More'
// 								) !== undefined
// 						}
// 					})
// 				);
// 			}
// 		}
// 	}).observe(document.getElementById('react-page'), { childList: true, subtree: true });
// }
