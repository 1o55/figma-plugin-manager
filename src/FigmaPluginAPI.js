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
	onDomChanged: triggerFunction => {
		window.addEventListener('domChanged', event => {
			triggerFunction(event.detail);
		});
	},
	createPluginsMenuItem: (buttonLabel, triggerFunction, condition, shortcut) => {
		window.addEventListener('pluginOptionsFound', () => {
			if (typeof condition === 'function') {
				if (condition()) {
					injectPluginsMenuItem(buttonLabel, triggerFunction, shortcut);
				}
			} else injectPluginsMenuItem(buttonLabel, triggerFunction, shortcut);
		});
	},
	createContextMenuItem: {
		Selection: (buttonLabel, triggerFunction, condition, shortcut, subMenuItems) => {
			addMenuItem(
				'DROPDOWN_TYPE_SELECTION_CONTEXT_MENU',
				buttonLabel,
				triggerFunction,
				condition,
				shortcut,
				subMenuItems
			);
		},
		Canvas: (buttonLabel, triggerFunction, condition, shortcut, subMenuItems) => {
			addMenuItem('DROPDOWN_TYPE_CANVAS_CONTEXT_MENU', buttonLabel, triggerFunction, condition, shortcut, subMenuItems);
		},
		ObjectsPanel: (buttonLabel, triggerFunction, condition, shortcut, subMenuItems) => {
			addMenuItem(
				'DROPDOWN_TYPE_OBJECTS_PANEL_CONTEXT_MENU',
				buttonLabel,
				triggerFunction,
				condition,
				shortcut,
				subMenuItems
			);
		},
		Page: (buttonLabel, triggerFunction, condition, shortcut, subMenuItems) => {
			addMenuItem('DROPDOWN_TYPE_PAGE_CONTEXT_MENU', buttonLabel, triggerFunction, condition, shortcut, subMenuItems);
		},
		Filename: (buttonLabel, triggerFunction, condition, shortcut, subMenuItems) => {
			addMenuItem('FULLSCREEN_FILENAME_DROPDOWN', buttonLabel, triggerFunction, condition, shortcut, subMenuItems);
		},
		Version: (buttonLabel, triggerFunction, condition, shortcut, subMenuItems) => {
			addMenuItem(
				'DROPDOWN_TYPE_SAVEPOINT_CONTEXT_MENU',
				buttonLabel,
				triggerFunction,
				condition,
				shortcut,
				subMenuItems
			);
		},
		File: (buttonLabel, triggerFunction, condition, shortcut, subMenuItems) => {
			addMenuItem('file-actions-dropdown', buttonLabel, triggerFunction, condition, shortcut, subMenuItems);
		}
	},
	createKeyboardShortcut: (shortcut, triggerFunction) => {
		if (document.getElementsByClassName('focus-target').length > 0) {
			const focusTarget = document.getElementsByClassName('focus-target')[0];
			addKeyboardShortcutInFile(focusTarget, shortcut, triggerFunction);
		} else {
			window.addEventListener('focusTargetFound', event => {
				const focusTarget = event.detail;
				addKeyboardShortcutInFile(focusTarget, shortcut, triggerFunction);
			});
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
		element.addEventListener('click', () => {
			if (window.App._state.tooltip.state === 1) window.App._dispatch({ type: 'TOOLTIP_HIDE' });
		});
	},
	showToast: (message, timeoutInSeconds, buttonText, buttonAction) => {
		const toast = {
			type: 'VISUAL_BELL_ENQUEUE',
			payload: {
				type: 'installed_plugin',
				message: message,
				timeout: timeoutInSeconds ? timeoutInSeconds * 1000 : 3000
			}
		};
		buttonText && buttonAction
			? Object.assign(toast.payload, {
					button: {
						text: buttonText,
						action: buttonAction
					}
			  })
			: null;
		window.App._dispatch(toast);
	},
	forEachSelectedNode: triggerFunction => {
		const selectedNodes = Object.keys(App._state.mirror.sceneGraphSelection);
		for (let i = 0; i < selectedNodes.length; i++) {
			const node = selectedNodes[i];
			App.sendMessage('clearSelection');
			App.sendMessage('addToSelection', { nodeIds: [node] });
			triggerFunction(node);
		}
		App.sendMessage('addToSelection', { nodeIds: selectedNodes });
	},
	replaceText: text => {
		App.triggerAction('request-edit-mode');
		var inputNode = document.getElementsByClassName('focus-target')[0];
		inputNode.focus();
		inputNode.value = text;
		inputNode.dispatchEvent(new InputEvent('input'));
		App.triggerAction('leave-edit-mode');
	},
	getNodeType: node => {
		return App._state.mirror.sceneGraph.get(node).type;
	},
	getTextContent: node => {
		return App.sendMessage('inspectNodeForInteractionTests', { nodeId: node }).args.extractedText;
	}
};

const addMenuItem = (menuType, buttonLabel, triggerFunction, condition, shortcut, subMenuItems) => {
	FigmaPluginAPI.onMenuOpened((type, hasMoreOptions) => {
		if (type === menuType) {
			if (typeof condition === 'function') {
				if (condition()) {
					if (!hasMoreOptions) injectMenuItem(menuType, false, buttonLabel, triggerFunction, shortcut, subMenuItems);
				}
			} else {
				if (!hasMoreOptions) injectMenuItem(menuType, false, buttonLabel, triggerFunction, shortcut, subMenuItems);
			}
		}
	});
	FigmaPluginAPI.onSubmenuOpened((type, highlightedOption) => {
		if (type === menuType) {
			if (typeof condition === 'function') {
				if (condition()) {
					if (highlightedOption === 'More')
						injectMenuItem(menuType, true, buttonLabel, triggerFunction, shortcut, subMenuItems);
				}
			} else {
				if (highlightedOption === 'More')
					injectMenuItem(menuType, true, buttonLabel, triggerFunction, shortcut, subMenuItems);
			}
		}
	});
};

const injectMenuItem = (menuType, isSubmenu, buttonLabel, triggerFunction, shortcut, subMenuItems) => {
	const isFatDropdown = menuType === 'FULLSCREEN_FILENAME_DROPDOWN' || menuType === 'file-actions-dropdown';
	const menu = isSubmenu
		? document.querySelector('div[class*="multilevel_dropdown--menu--"]')
		: document.querySelector('div[class*="dropdown--dropdown--"]');
	const newMenuItem = document.createElement('div');
	newMenuItem.className = 'plugin-dropdown-option';
	if (isFatDropdown) newMenuItem.style.padding = '0 12px';
	const labelDiv = document.createElement('div');
	labelDiv.className = 'plugin-dropdown-option-text';
	labelDiv.innerText = buttonLabel;
	newMenuItem.appendChild(labelDiv);
	if (shortcut && subMenuItems) {
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
			newMenuItem.appendChild(shortcutDiv);
		}
	}
	if (subMenuItems) {
		const chevronDiv = document.createElement('div');
		chevronDiv.className = 'plugin-dropdown-option-chevron';
		newMenuItem.appendChild(chevronDiv);
		const pluginSubmenu = document.createElement('div');
		pluginSubmenu.className = 'plugin-dropdown-submenu';
		pluginSubmenu.style.display = 'none';
		subMenuItems.forEach(subMenuItem => {
			const item = document.createElement('div');
			item.className = 'plugin-dropdown-option';
			const labelDiv = document.createElement('div');
			labelDiv.className = 'plugin-dropdown-option-text';
			labelDiv.innerText = subMenuItem.buttonLabel;
			item.appendChild(labelDiv);
			if (subMenuItem.shortcut) {
				let shortcutText = '';
				shortcutText += subMenuItem.shortcut.control ? '⌃' : '';
				shortcutText += subMenuItem.shortcut.option ? '⌥' : '';
				shortcutText += subMenuItem.shortcut.shift ? '⇧' : '';
				shortcutText += subMenuItem.shortcut.command ? '⌘' : '';
				shortcutText += subMenuItem.shortcut.key ? subMenuItem.shortcut.key.toUpperCase() : '';
				if (shortcutText !== '') {
					const shortcutDiv = document.createElement('div');
					shortcutDiv.className = 'plugin-dropdown-option-shortcut';
					shortcutDiv.innerText = shortcutText;
					item.appendChild(shortcutDiv);
				}
			}
			item.onclick = () => {
				subMenuItem.triggerFunction();
				window.App._dispatch({ type: 'HIDE_DROPDOWN' });
			};
			if (typeof subMenuItem.condition === 'function') {
				if (subMenuItem.condition()) {
					pluginSubmenu.appendChild(item);
				}
			} else pluginSubmenu.appendChild(item);
		});
		document.querySelector('div[class*="dropdown--dropdown--"]').parentElement.parentElement.appendChild(pluginSubmenu);
		newMenuItem.onclick = e => {
			e.preventDefault(), e.stopPropagation();
		};
		newMenuItem.onmouseover = e => {
			e.stopPropagation();
			newMenuItem.style.backgroundColor = '#30c2ff';
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
			pluginSubmenu.style.top = `${newMenuItem.getBoundingClientRect().top - 6}px`;
			if (window.innerWidth - newMenuItem.getBoundingClientRect().right > 200)
				pluginSubmenu.style.left = `${newMenuItem.getBoundingClientRect().right}px`;
			else pluginSubmenu.style.left = `${newMenuItem.getBoundingClientRect().left - 200}px`;
			pluginSubmenu.style.display = 'block';
		};
		document.querySelector('div[class*="dropdown--dropdown--"]').onmouseover = () => {
			pluginSubmenu.style.display = 'none';
			newMenuItem.style.backgroundColor = '';
		};
	} else {
		newMenuItem.onclick = () => {
			triggerFunction();
			window.App._dispatch({ type: 'HIDE_DROPDOWN' });
		};
		newMenuItem.onmouseover = () => {
			const submenu = isSubmenu
				? document.querySelectorAll('div[class*="multilevel_dropdown--menu"]')[1]
				: document.querySelector('div[class*="multilevel_dropdown--menu"]');
			if (submenu) {
				submenu.style.display = 'none';
			}
			const activeNode = isSubmenu
				? document.querySelectorAll('div[class*="multilevel_dropdown--optionActive"]')[1]
				: document.querySelector('div[class*="multilevel_dropdown--optionActive"]');
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
		};
	}
	menu.appendChild(newMenuItem);
	const numberOfSeparators = [...menu.children].filter(node => node.className.includes('dropdown--separator')).length;
	if (!isFatDropdown)
		menu.style.top = isSubmenu
			? `${parseInt(menu.style.top) - 24 - numberOfSeparators * 2}px`
			: `${parseInt(menu.style.top) - 24}px`;
};

const addKeyboardShortcutInFile = (focusTarget, shortcut, triggerFunction) => {
	focusTarget.addEventListener('keydown', e => {
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
	});
};

const injectPluginsMenuItem = (buttonLabel, triggerFunction, shortcut) => {
	const pluginOptions = document.getElementById('pluginOptions');
	if (pluginOptions.style.borderBottom === '') {
		pluginOptions.style.borderBottom = '1px solid #2c2c2c';
		pluginOptions.style.paddingBottom = '6px';
		pluginOptions.style.marginBottom = '6px';
	}
	const newMenuItem = document.createElement('div');
	newMenuItem.className = 'plugin-dropdown-option';
	const labelDiv = document.createElement('div');
	labelDiv.className = 'plugin-dropdown-option-text';
	labelDiv.innerText = buttonLabel;
	newMenuItem.appendChild(labelDiv);
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
			newMenuItem.appendChild(shortcutDiv);
		}
	}
	pluginOptions.appendChild(newMenuItem);
	newMenuItem.onclick = () => {
		triggerFunction();
		window.App._dispatch({ type: 'HIDE_DROPDOWN' });
	};
};
