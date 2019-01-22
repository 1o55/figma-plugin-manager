import { scene } from './scene.js';
import Vue from 'vue';
import VModal from 'vue-js-modal';
import React from 'react';
import ReactDOM from 'react-dom';

Vue.config.productionTip = false;
Vue.use(VModal, { dynamic: true, injectModalsContainer: true });
window.vueInstance = new Vue();

export const FigmaPluginAPI = {
	Vue: Vue,
	React: React,
	ReactDOM: ReactDOM,
	scene: scene,
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
	createPluginsMenuItem: (itemLabel, triggerFunction, condition, shortcut, subMenuItems) => {
		window.addEventListener('pluginOptionsFound', () => {
			if (typeof condition === 'function') {
				if (condition()) {
					injectMenuItem('fullscreen-menu-dropdown', false, itemLabel, triggerFunction, shortcut, subMenuItems);
				}
			} else injectMenuItem('fullscreen-menu-dropdown', false, itemLabel, triggerFunction, shortcut, subMenuItems);
		});
	},
	createContextMenuItem: {
		Canvas: (itemLabel, triggerFunction, condition, shortcut, subMenuItems) => {
			addMenuItem('DROPDOWN_TYPE_CANVAS_CONTEXT_MENU', itemLabel, triggerFunction, condition, shortcut, subMenuItems);
		},
		Selection: (itemLabel, triggerFunction, condition, shortcut, subMenuItems) => {
			addMenuItem(
				'DROPDOWN_TYPE_SELECTION_CONTEXT_MENU',
				itemLabel,
				triggerFunction,
				condition,
				shortcut,
				subMenuItems
			);
		},
		ObjectsPanel: (itemLabel, triggerFunction, condition, shortcut, subMenuItems) => {
			addMenuItem(
				'DROPDOWN_TYPE_OBJECTS_PANEL_CONTEXT_MENU',
				itemLabel,
				triggerFunction,
				condition,
				shortcut,
				subMenuItems
			);
		},
		Page: (itemLabel, triggerFunction, condition, shortcut, subMenuItems) => {
			addMenuItem('DROPDOWN_TYPE_PAGE_CONTEXT_MENU', itemLabel, triggerFunction, condition, shortcut, subMenuItems);
		},
		Filename: (itemLabel, triggerFunction, condition, shortcut, subMenuItems) => {
			addMenuItem('FULLSCREEN_FILENAME_DROPDOWN', itemLabel, triggerFunction, condition, shortcut, subMenuItems);
		},
		Version: (itemLabel, triggerFunction, condition, shortcut, subMenuItems) => {
			addMenuItem(
				'DROPDOWN_TYPE_SAVEPOINT_CONTEXT_MENU',
				itemLabel,
				triggerFunction,
				condition,
				shortcut,
				subMenuItems
			);
		},
		File: (itemLabel, triggerFunction, condition, shortcut, subMenuItems) => {
			addMenuItem('file-actions-dropdown', itemLabel, triggerFunction, condition, shortcut, subMenuItems);
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
	showUI: (modalTitle, callback, width, height, positionX, positionY, draggable) => {
		width = width ? width : 300;
		height = height ? height : 'auto';
		positionX = positionX ? positionX : 0.5;
		positionY = positionY ? positionY : 0.5;
		draggable = draggable !== false ? '.modal-header' : false;
		vueInstance.$modal.hide(modalTitle);
		vueInstance.$modal.show(
			{
				template: `
					<div class='modal'>
						<div class='modal-header'>
							${modalTitle}
							<div class='modal-close-button' @click="$emit('close')"></div>
						</div>
						<div class='modal-content'>
							<div></div>
						</div>
					</div>
			`
			},
			{},
			{ name: modalTitle, draggable: draggable, width: width, height: height, pivotX: positionX, pivotY: positionY },
			{
				opened: e => {
					if (!draggable) {
						const overlay = document.getElementsByClassName('v--modal-overlay')[0];
						overlay.style.setProperty('width', '100%', 'important');
						overlay.style.setProperty('height', '100%', 'important');
					}
					callback(e.ref.children[0].children[1].children[0]);
				}
			}
		);
		if (document.querySelector('div[class*="nav-"]') === null) {
			FigmaPluginAPI.onFileBrowserLoaded(() => {
				vueInstance.$modal.hide(modalTitle);
			});
		} else {
			FigmaPluginAPI.onFileBrowserUnloaded(() => {
				vueInstance.$modal.hide(modalTitle);
			});
		}
	},
	hideUI: modalTitle => {
		vueInstance.$modal.hide(modalTitle);
	}
};

const addMenuItem = (menuType, itemLabel, triggerFunction, condition, shortcut, subMenuItems) => {
	FigmaPluginAPI.onMenuOpened((type, hasMoreOptions) => {
		if (type === menuType) {
			if (typeof condition === 'function') {
				if (condition()) {
					if (!hasMoreOptions) injectMenuItem(menuType, false, itemLabel, triggerFunction, shortcut, subMenuItems);
				}
			} else {
				if (!hasMoreOptions) injectMenuItem(menuType, false, itemLabel, triggerFunction, shortcut, subMenuItems);
			}
		}
	});
	FigmaPluginAPI.onSubmenuOpened((type, highlightedOption) => {
		if (type === menuType) {
			if (typeof condition === 'function') {
				if (condition()) {
					if (highlightedOption === 'More')
						injectMenuItem(menuType, true, itemLabel, triggerFunction, shortcut, subMenuItems);
				}
			} else {
				if (highlightedOption === 'More')
					injectMenuItem(menuType, true, itemLabel, triggerFunction, shortcut, subMenuItems);
			}
		}
	});
};

const injectMenuItem = (menuType, isSubmenu, itemLabel, triggerFunction, shortcut, subMenuItems) => {
	const isFatDropdown = menuType === 'FULLSCREEN_FILENAME_DROPDOWN' || menuType === 'file-actions-dropdown';
	let menu = isSubmenu
		? document.querySelector('div[class*="multilevel_dropdown--menu--"]')
		: document.querySelector('div[class*="dropdown--dropdown--"]');
	menu = menuType === 'fullscreen-menu-dropdown' ? document.getElementById('pluginOptions') : menu;
	const newMenuItem = document.createElement('div');
	newMenuItem.className = 'plugin-dropdown-option';
	if (isFatDropdown) newMenuItem.style.padding = '0 12px';
	const labelDiv = document.createElement('div');
	labelDiv.className = 'plugin-dropdown-option-text';
	labelDiv.innerText = itemLabel;
	newMenuItem.appendChild(labelDiv);
	if (shortcut && !subMenuItems) {
		const shortcutText = createShortcutText(shortcut);
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
			labelDiv.innerText = subMenuItem.itemLabel;
			item.appendChild(labelDiv);
			if (subMenuItem.shortcut) {
				const shortcutText = createShortcutText(shortcut);
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
			const allSubmenus = [...document.getElementsByClassName('plugin-dropdown-submenu')].filter(
				thisSubmenu => thisSubmenu.id !== 'pluginSubmenu'
			);
			allSubmenus.forEach(thisSubmenu => {
				thisSubmenu.style.display = 'none';
			});
			if (document.getElementById('pluginOptions'))
				[...document.getElementById('pluginOptions').children].forEach(item => {
					item.style.backgroundColor = '';
				});
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
			pluginSubmenu.onmouseover = () => {
				newMenuItem.style.backgroundColor = '#30c2ff';
			};
		};
		document.querySelector('div[class*="dropdown--dropdown--"]').addEventListener('mouseover', () => {
			pluginSubmenu.style.display = 'none';
			newMenuItem.style.backgroundColor = '';
		});
	} else {
		newMenuItem.onclick = () => {
			triggerFunction();
			window.App._dispatch({ type: 'HIDE_DROPDOWN' });
		};
		newMenuItem.onmouseover = () => {
			const allSubmenus = [...document.getElementsByClassName('plugin-dropdown-submenu')].filter(
				thisSubmenu => thisSubmenu.id !== 'pluginSubmenu'
			);
			allSubmenus.forEach(thisSubmenu => {
				thisSubmenu.style.display = 'none';
			});
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
			if ((menuType = 'file-actions-dropdown')) {
				const pluginSubmenu = document.getElementsByClassName('plugin-dropdown-submenu')[1];
				if (pluginSubmenu) pluginSubmenu.style.display = 'none';
			}
		};
	}
	menu.appendChild(newMenuItem);
	if (menuType === 'fullscreen-menu-dropdown') {
		if (menu.style.borderBottom === '') {
			menu.style.borderBottom = '1px solid #2c2c2c';
			menu.style.paddingBottom = '6px';
			menu.style.marginBottom = '6px';
		}
	}
	const numberOfSeparators = [...menu.children].filter(node => node.className.includes('dropdown--separator')).length;
	if (!isFatDropdown)
		menu.style.top = isSubmenu
			? `${parseInt(menu.style.top) - 24 - numberOfSeparators * 2}px`
			: `${parseInt(menu.style.top) - 24}px`;
};

const addKeyboardShortcutInFile = (focusTarget, shortcut, triggerFunction) => {
	if (shortcut.mac && shortcut.windows) {
		focusTarget.addEventListener('keydown', e => {
			if (navigator.platform === 'MacIntel') {
				if (
					e.metaKey !== !shortcut.mac.command &&
					e.shiftKey !== !shortcut.mac.shift &&
					e.ctrlKey !== !shortcut.mac.control &&
					e.altKey !== !shortcut.mac.option &&
					e.key.toLowerCase() === shortcut.mac.key.toLowerCase()
				) {
					e.preventDefault();
					triggerFunction();
				}
			}
			if (navigator.platform === 'Win32' || navigator.platform === 'Win64') {
				if (
					e.shiftKey !== !shortcut.windows.shift &&
					e.ctrlKey !== !shortcut.windows.control &&
					e.altKey !== !shortcut.windows.alt &&
					e.key.toLowerCase() === shortcut.windows.key.toLowerCase()
				) {
					e.preventDefault();
					triggerFunction();
				}
			}
		});
	}
};

const createShortcutText = shortcut => {
	let shortcutText = '';
	if (shortcut.mac && shortcut.windows) {
		if (navigator.platform === 'MacIntel') {
			shortcut = shortcut.mac;
			shortcutText += shortcut.control ? '⌃' : '';
			shortcutText += shortcut.option ? '⌥' : '';
			shortcutText += shortcut.shift ? '⇧' : '';
			shortcutText += shortcut.command ? '⌘' : '';
			shortcutText += shortcut.key ? shortcut.key.toUpperCase() : '';
		}
		if (navigator.platform === 'Win32' || navigator.platform === 'Win64') {
			shortcut = shortcut.windows;
			shortcutText += shortcut.control ? 'Ctrl+' : '';
			shortcutText += shortcut.alt ? 'Alt+' : '';
			shortcutText += shortcut.shift ? 'Shift+' : '';
			shortcutText += shortcut.key ? shortcut.key.toUpperCase() : '';
		}
	}
	return shortcutText;
};
