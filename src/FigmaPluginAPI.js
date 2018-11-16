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
	onModalOpened: triggerFunction => {
		window.addEventListener('modalOpened', event => {
			triggerFunction(event.detail);
		});
	},
	onModalClosed: triggerFunction => {
		window.addEventListener('modalClosed', () => {
			triggerFunction();
		});
	},
	onMenuOpened: triggerFunction => {
		window.addEventListener('menuOpened', event => {
			triggerFunction(event.detail.type, event.detail.hasMoreOptions);
		});
	},
	onMoreMenuOpened: triggerFunction => {
		window.addEventListener('moreMenuOpened', event => {
			triggerFunction(event.detail.type, event.detail.hasMoreOptions);
		});
	},
	onMenuClosed: triggerFunction => {
		window.addEventListener('menuClosed', () => {
			triggerFunction();
		});
	},
	createContextMenuButton: {
		Selection: (id, buttonLabel, triggerFunction, shortcut) => {
			createContextMenuButton('DROPDOWN_TYPE_SELECTION_CONTEXT_MENU', id, buttonLabel, triggerFunction, shortcut);
		},
		Canvas: (id, buttonLabel, triggerFunction, shortcut) => {
			createContextMenuButton('DROPDOWN_TYPE_CANVAS_CONTEXT_MENU', id, buttonLabel, triggerFunction, shortcut);
		}
	},
	createKeyboardShortcut: (shortcut, triggerFunction) => {
		document.querySelector('.focus-target').onkeydown = e => {
			if (
				e.metaKey !== !shortcut.command &&
				e.shiftKey !== !shortcut.shift &&
				e.ctrlKey !== !shortcut.control &&
				e.altKey !== !shortcut.option &&
				e.key.toLowerCase() === shortcut.key.toLowerCase()
			) {
				e.preventDefault();
				triggerFunction();
			}
		};
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
		element.addEventListener('click', () => {
			if (window.App._state.tooltip.state === 1)
				window.App._dispatch({
					type: 'TOOLTIP_HIDE'
				});
		});
	}
};

const createContextMenuButton = (menuType, id, buttonLabel, triggerFunction, shortcut) => {
	FigmaPluginAPI.onMenuOpened((type, hasMoreOptions) => {
		if (type === menuType) {
			if (!hasMoreOptions) {
				const menu = document.querySelector('div[class*="dropdown--dropdown--35dH4"]');
				const newButton = document.createElement('div');
				newButton.className = 'plugin-dropdown-option';
				newButton.id = id;
				const labelDiv = document.createElement('div');
				labelDiv.className = 'plugin-dropdown-option-text';
				labelDiv.innerText = buttonLabel;
				newButton.appendChild(labelDiv);
				if (shortcut) {
					let shortcutText = '';
					shortcutText += shortcut.control ? '⌃' : '';
					shortcutText += shortcut.option ? '⌥' : '';
					shortcutText += shortcut.shift ? '⇧' : '';
					shortcutText += shortcut.command ? '⌘' : '';
					shortcutText += shortcut.key ? shortcut.key.toUpperCase() : '';
					if (shortcutText !== '') {
						const shortcutDiv = document.createElement('div');
						shortcutDiv.className = 'plugin-dropdown-option-shortcut';
						shortcutDiv.innerText = shortcutText;
						newButton.appendChild(shortcutDiv);
					}
				}
				newButton.onclick = () => {
					triggerFunction();
					window.App._dispatch({ type: 'HIDE_DROPDOWN' });
				};
				menu.appendChild(newButton);
				menu.style.top = `${parseInt(menu.style.top) - 24}px`;
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
	FigmaPluginAPI.onMoreMenuOpened((type, hasMoreOptions) => {
		if (type === menuType) {
			if (hasMoreOptions) {
				const menu = document.querySelector('div[class*="multilevel_dropdown--menu"]');
				const newButton = document.createElement('div');
				newButton.className = 'plugin-dropdown-option';
				newButton.id = id;
				const labelDiv = document.createElement('div');
				labelDiv.className = 'plugin-dropdown-option-text';
				labelDiv.innerText = buttonLabel;
				newButton.appendChild(labelDiv);
				if (shortcut) {
					let shortcutText = '';
					shortcutText += shortcut.control ? '⌃' : '';
					shortcutText += shortcut.option ? '⌥' : '';
					shortcutText += shortcut.shift ? '⇧' : '';
					shortcutText += shortcut.command ? '⌘' : '';
					shortcutText += shortcut.key ? shortcut.key.toUpperCase() : '';
					if (shortcutText !== '') {
						const shortcutDiv = document.createElement('div');
						shortcutDiv.className = 'plugin-dropdown-option-shortcut';
						shortcutDiv.innerText = shortcutText;
						newButton.appendChild(shortcutDiv);
					}
				}
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
