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
	onSubmenuOpened: triggerFunction => {
		window.addEventListener('submenuOpened', event => {
			triggerFunction(event.detail.type, event.detail.highlightedOption);
		});
	},
	onMenuClosed: triggerFunction => {
		window.addEventListener('menuClosed', () => {
			triggerFunction();
		});
	},
	createContextMenuButton: {
		Selection: (id, buttonLabel, triggerFunction, shortcut) => {
			addMenuOption('DROPDOWN_TYPE_SELECTION_CONTEXT_MENU', id, buttonLabel, triggerFunction, shortcut);
		},
		Canvas: (id, buttonLabel, triggerFunction, shortcut) => {
			addMenuOption('DROPDOWN_TYPE_CANVAS_CONTEXT_MENU', id, buttonLabel, triggerFunction, shortcut);
		},
		ObjectsPanel: (id, buttonLabel, triggerFunction, shortcut) => {
			createContextMenuButton('DROPDOWN_TYPE_OBJECTS_PANEL_CONTEXT_MENU', id, buttonLabel, triggerFunction, shortcut);
		},
		Page: (id, buttonLabel, triggerFunction, shortcut) => {
			createContextMenuButton('DROPDOWN_TYPE_PAGE_CONTEXT_MENU', id, buttonLabel, triggerFunction, shortcut);
		},
		Filename: (id, buttonLabel, triggerFunction, shortcut) => {
			createContextMenuButton('FULLSCREEN_FILENAME_DROPDOWN', id, buttonLabel, triggerFunction, shortcut);
		},
		Savepoint: (id, buttonLabel, triggerFunction, shortcut) => {
			createContextMenuButton('DROPDOWN_TYPE_SAVEPOINT_CONTEXT_MENU', id, buttonLabel, triggerFunction, shortcut);
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
			if (window.App._state.tooltip.state === 1) window.App._dispatch({ type: 'TOOLTIP_HIDE' });
		});
	}
};

const addMenuOption = (menuType, id, buttonLabel, triggerFunction, shortcut) => {
	FigmaPluginAPI.onMenuOpened((type, hasMoreOptions) => {
		if (type === menuType) {
			if (!hasMoreOptions) injectMenuOption(false, id, buttonLabel, triggerFunction, shortcut);
		}
	});
	FigmaPluginAPI.onSubmenuOpened((type, highlightedOption) => {
		if (type === menuType) {
			if (highlightedOption === 'More') injectMenuOption(true, id, buttonLabel, triggerFunction, shortcut);
		}
	});
};

const injectMenuOption = (isSubmenu, id, buttonLabel, triggerFunction, shortcut) => {
	const menu = isSubmenu
		? document.querySelector('div[class*="multilevel_dropdown--menu--"]')
		: document.querySelector('div[class*="dropdown--dropdown--"]');
	const newMenuOption = document.createElement('div');
	newMenuOption.className = 'plugin-dropdown-option';
	newMenuOption.id = id;
	const labelDiv = document.createElement('div');
	labelDiv.className = 'plugin-dropdown-option-text';
	labelDiv.innerText = buttonLabel;
	newMenuOption.appendChild(labelDiv);
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
			newMenuOption.appendChild(shortcutDiv);
		}
	}
	menu.appendChild(newMenuOption);
	const numberOfSeparators = [...menu.children].filter(node => node.className.includes('dropdown--separator')).length;
	menu.style.top = isSubmenu
		? `${parseInt(menu.style.top) - 24 - numberOfSeparators * 2}px`
		: `${parseInt(menu.style.top) - 24}px`;
	newMenuOption.onclick = () => {
		triggerFunction();
		window.App._dispatch({ type: 'HIDE_DROPDOWN' });
	};
	newMenuOption.onmouseover = () => {
		const submenu = isSubmenu
			? document.querySelectorAll('div[class*="multilevel_dropdown--menu"]')[1]
			: document.querySelector('div[class*="multilevel_dropdown--menu"]');
		if (submenu) {
			submenu.style.display = 'none';
		}
		const activeNode = isSubmenu
			? document.querySelectorAll('div[class*="multilevel_dropdown--optionActive"]')[1]
			: document.querySelector('div[class*="multilevel_dropdown--optionActive"]');
		const activeClassName = [...activeNode.classList].find(className => className.includes('optionActive'));
		activeNode.classList.remove(activeClassName);
		activeNode.onmouseover = e => {
			if (submenu) {
				submenu.style.display = '';
			}
			activeNode.classList.add(activeClassName);
		};
	};
};
