export const FigmaPluginAPI = {
	onFileBrowserLoaded: triggerFunction => {
		window.addEventListener('fileBrowserLoaded', () => {
			triggerFunction();
		});
	},
	onFileBrowserChanged: triggerFunction => {
		window.addEventListener('fileBrowserChanged', () => {
			triggerFunction();
		});
	},
	onFileBrowserUnloaded: triggerFunction => {
		window.addEventListener('fileBrowserUnloaded', () => {
			triggerFunction();
		});
	},
	onFileLoaded: triggerFunction => {
		window.addEventListener('fileLoaded', () => {
			triggerFunction();
		});
	},
	onFileUnloaded: triggerFunction => {
		window.addEventListener('fileUnloaded', () => {
			triggerFunction();
		});
	},
	onMenuOpened: triggerFunction => {
		window.addEventListener('menuOpened', event => {
			triggerFunction(event.detail.menu, event.detail.hasMoreOptions);
		});
	},
	onMoreMenuOpened: triggerFunction => {
		window.addEventListener('moreMenuOpened', event => {
			triggerFunction(event.detail.menu, event.detail.hasMoreOptions);
		});
	},
	onMenuClosed: triggerFunction => {
		window.addEventListener('menuClosed', () => {
			triggerFunction();
		});
	},
	createContextMenuButton: {
		Selection: (id, buttonLabel, triggerFunction) => {
			createContextMenuButton('DROPDOWN_TYPE_SELECTION_CONTEXT_MENU', id, buttonLabel, triggerFunction);
		},
		Canvas: (id, buttonLabel, triggerFunction) => {
			createContextMenuButton('DROPDOWN_TYPE_CANVAS_CONTEXT_MENU', id, buttonLabel, triggerFunction);
		}
	},
	addTooltip: (element, tooltipText, showAfterDelay) => {
		element.addEventListener('mousemove', () => {
			window.App._dispatch({
				type: showAfterDelay ? 'TOOLTIP_SHOW_AFTER_DELAY' : 'TOOLTIP_SHOW_IMMEDIATELY',
				payload: {
					interactive: false,
					position: 0,
					target: { kind: 2, text: tooltipText },
					targetRect: element.getBoundingClientRect(),
					timeoutDelay: 500
				}
			});
		});
	}
};

const createContextMenuButton = (menuType, id, buttonLabel, triggerFunction) => {
	FigmaPluginAPI.onMenuOpened((data, hasMoreOptions) => {
		if (data.type === menuType) {
			if (!hasMoreOptions) {
				const menu = document.querySelector('div[class*="dropdown--dropdown--35dH4"]');
				const newButton = document.createElement('div');
				newButton.className = 'plugin-context-menu-item';
				newButton.id = id;
				newButton.innerText = buttonLabel;
				newButton.onclick = () => {
					triggerFunction();
					window.App._dispatch({ type: 'HIDE_DROPDOWN' });
				};
				menu.appendChild(newButton);
				menu.style.top = `${parseInt(menu.style.top) - 24}px`;
				if (menu.getBoundingClientRect().bottom + 8 > window.innerHeight) {
					menu.style.top = `${window.innerHeight - menu.getBoundingClientRect().bottom - 2}px`;
				}
				newButton.onmouseover = () => {
					const prevNode = newButton.previousSibling;
					const activeClassName = [...prevNode.classList].find(className => className.includes('optionActive'));
					prevNode.classList.remove(activeClassName);
					prevNode.onmouseover = e => {
						prevNode.classList.add(activeClassName);
					};
				};
			}
		}
	});
	FigmaPluginAPI.onMoreMenuOpened((data, hasMoreOptions) => {
		if (data.type === menuType) {
			if (hasMoreOptions) {
				const menu = document.querySelector('div[class*="multilevel_dropdown--menu"]');
				const newButton = document.createElement('div');
				newButton.className = 'plugin-context-menu-item';
				newButton.id = id;
				newButton.innerText = buttonLabel;
				newButton.onclick = () => {
					triggerFunction();
					window.App._dispatch({ type: 'HIDE_DROPDOWN' });
				};
				const numberOfSeparators = [...menu.children].filter(node => node.className.includes('dropdown--separator'))
					.length;
				menu.appendChild(newButton);
				menu.style.top = `${parseInt(menu.style.top) - 24 - numberOfSeparators * 2}px`;
				if (menu.getBoundingClientRect().bottom + 8 > window.innerHeight) {
					menu.style.top = `${window.innerHeight - menu.getBoundingClientRect().height - 2}px`;
				}
				newButton.onmouseover = () => {
					const prevNode = newButton.previousSibling;
					const activeClassName = [...prevNode.classList].find(className => className.includes('optionActive'));
					prevNode.classList.remove(activeClassName);
					prevNode.onmouseover = e => {
						prevNode.classList.add(activeClassName);
					};
				};
			}
		}
	});
};
