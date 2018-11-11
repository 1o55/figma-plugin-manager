export function startMutationObserver() {
	let projectsPageLoaded = false;
	let fileLoaded = false;
	let menuOpened = false;
	new MutationObserver(mutations => {
		mutations.forEach(mutation => {
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
				window.dispatchEvent(
					new CustomEvent('menuOpened', {
						detail: {
							menu: window.App._state.dropdownShown,
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
			if (
				mutation.addedNodes[0] &&
				mutation.addedNodes[0].attributes &&
				mutation.addedNodes[0].attributes.name &&
				mutation.addedNodes[0].attributes.name.value === 'layerMenu' &&
				document.querySelectorAll('div[name="layerMenu"]').length === 2 &&
				window.App._state.dropdownShown.type === 'DROPDOWN_TYPE_SELECTION_CONTEXT_MENU' &&
				[
					...[...document.querySelectorAll('div[class*="multilevel_dropdown--name"]')].find(
						node => node.innerText === 'More'
					).parentNode.classList
				].some(className => className.includes('dropdown--optionActive'))
			) {
				window.dispatchEvent(new CustomEvent('moreMenuOpened'));
			}
		});
	}).observe(document.getElementById('react-page'), { childList: true, subtree: true });
}
