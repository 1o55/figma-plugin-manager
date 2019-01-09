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
		Canvas: (itemLabel, triggerFunction, condition, shortcut, subMenuItems) => {
			addMenuItem('DROPDOWN_TYPE_CANVAS_CONTEXT_MENU', itemLabel, triggerFunction, condition, shortcut, subMenuItems);
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
	getNode: node => {
		return getNode(node);
	},
	getScene: () => {
		return {
			root: getNode('0:0'),
			currentPage: getNode(App._state.mirror.appModel.currentPage),
			selection: Object.keys(App._state.mirror.sceneGraphSelection).map(nodeId => getNode(nodeId))
		};
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
			labelDiv.innerText = subMenuItem.itemLabel;
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

const getNode = node => {
	const sceneNode = App._state.mirror.sceneGraph.get(node);
	const childrenGetter = sceneNode.__lookupGetter__('children');
	Object.defineProperties(sceneNode.__proto__, {
		children: {
			get: childrenGetter,
			set: function(val) {
				Object.defineProperty(this, 'children', { value: val, writable: true });
			}
		}
	});
	sceneNode.children = sceneNode.children.map(child => {
		return getNode(child);
	});
	const newNode = { id: sceneNode.guid, type: sceneNode.type };
	if (sceneNode.parent) {
		Object.defineProperty(newNode, 'parent', {
			get: function() {
				return getNode(App, sceneNode.parent);
			}
		});
	}
	Object.defineProperties(newNode, {
		name: {
			get: function() {
				return sceneNode.name;
			},
			set: function(val) {
				App.sendMessage('setNodeProperty', {
					nodeId: sceneNode.guid,
					property: 'name',
					value: val
				});
			}
		},
		visible: {
			get: function() {
				return sceneNode.visible;
			},
			set: function(val) {
				App.sendMessage('setNodeProperty', {
					nodeId: sceneNode.guid,
					property: 'visible',
					value: val
				});
			}
		},
		locked: {
			get: function() {
				return sceneNode.locked;
			},
			set: function(val) {
				App.sendMessage('setNodeProperty', {
					nodeId: sceneNode.guid,
					property: 'locked',
					value: val
				});
			}
		}
	});
	if (sceneNode.children.length !== 0) {
		newNode.children = sceneNode.children;
	}
	if (!(sceneNode.type === 'DOCUMENT' || sceneNode.type === 'CANVAS')) {
		const moreInfo = App.sendMessage('inspectNodeForInteractionTests', { nodeId: sceneNode.guid }).args;
		newNode.size = moreInfo.size;
		newNode.absoluteBounds = moreInfo.absoluteBounds;
		const relativeTransform = moreInfo.relativeTransform;
		newNode.relativeTransform = [
			[relativeTransform.m00, relativeTransform.m01, relativeTransform.m02],
			[relativeTransform.m10, relativeTransform.m11, relativeTransform.m12]
		];
		if (sceneNode.type === 'TEXT') {
			Object.defineProperty(newNode, 'characters', {
				get: function() {
					return moreInfo.extractedText;
				},
				set: function(val) {
					const selectedNodes = Object.keys(App._state.mirror.sceneGraphSelection);
					App.sendMessage('clearSelection');
					App.sendMessage('addToSelection', { nodeIds: [newNode.id] });
					App.triggerAction('request-edit-mode');
					var inputNode = document.querySelector('.focus-target');
					inputNode.focus();
					inputNode.value = val;
					inputNode.dispatchEvent(new InputEvent('input'));
					App.triggerAction('leave-edit-mode');
					App.sendMessage('clearSelection');
					if (selectedNodes.length > 0) App.sendMessage('addToSelection', { nodeIds: selectedNodes });
				}
			});
		}
		newNode.getProperties = function(callback) {
			if (!(newNode.type === 'DOCUMENT' || newNode.type === 'CANVAS')) {
				const selectedNodes = Object.keys(App._state.mirror.sceneGraphSelection);
				App.sendMessage('clearSelection');
				App.sendMessage('addToSelection', { nodeIds: [newNode.id] });
				setTimeout(() => {
					const result = App._state.mirror.selectionProperties;
					Object.defineProperties(newNode, {
						opacity: {
							get: function() {
								return result.opacity;
							},
							set: function(val) {
								App.updateSelectionProperties({ opacity: val });
							}
						},
						blendMode: {
							get: function() {
								return result.blendMode;
							},
							set: function(val) {
								App.updateSelectionProperties({ blendMode: val });
							}
						},
						isMask: {
							get: function() {
								return result.mask;
							},
							set: function(val) {
								App.updateSelectionProperties({ mask: val });
							}
						},
						effects: {
							get: function() {
								return result.effects;
							},
							set: function(val) {
								App.updateSelectionProperties({ effects: val });
							}
						},
						constraints: {
							get: function() {
								return { horizontal: result.horizontalConstraint, vertical: result.verticalConstraint };
							},
							set: function(val) {
								App.updateSelectionProperties({ horizontalConstraint: val.horizontal });
								App.updateSelectionProperties({ verticalConstraint: val.vertical });
							}
						},
						x: {
							get: function() {
								return result.x;
							},
							set: function(val) {
								App.updateSelectionProperties({ x: val });
							}
						},
						y: {
							get: function() {
								return result.y;
							},
							set: function(val) {
								App.updateSelectionProperties({ y: val });
							}
						},
						width: {
							get: function() {
								return result.width;
							},
							set: function(val) {
								App.updateSelectionProperties({ width: val });
							}
						},
						height: {
							get: function() {
								return result.height;
							},
							set: function(val) {
								App.updateSelectionProperties({ height: val });
							}
						}
					});
					if (newNode.type !== 'FRAME' || newNode.type !== 'INSTANCE') {
						Object.defineProperties(newNode, {
							fills: {
								get: function() {
									return result.fillPaints;
								},
								set: function(val) {
									App.updateSelectionProperties({ fillPaints: val });
								}
							},
							strokes: {
								get: function() {
									return result.fillPaints;
								},
								set: function(val) {
									App.updateSelectionProperties({ fillPaints: val });
								}
							},
							strokeWeight: {
								get: function() {
									return result.strokeWeight;
								},
								set: function(val) {
									App.updateSelectionProperties({ strokeWeight: val });
								}
							},
							strokeAlign: {
								get: function() {
									return result.strokeAlign;
								},
								set: function(val) {
									App.updateSelectionProperties({ strokeAlign: val });
								}
							}
						});
					}
					if (newNode.type === 'FRAME' || newNode.type === 'INSTANCE') {
						Object.defineProperties(newNode, {
							backgrounds: {
								get: function() {
									return result.backgroundPaints;
								},
								set: function(val) {
									App.updateSelectionProperties({ backgroundPaints: val });
								}
							},
							clipsContent: {
								get: function() {
									return !result.frameMaskDisabled;
								},
								set: function(val) {
									App.updateSelectionProperties({ frameMaskDisabled: !val });
								}
							}
						});
					}
					if (
						newNode.type === 'BOOLEAN_OPERATION' ||
						newNode.type === 'VECTOR' ||
						newNode.type === 'STAR' ||
						newNode.type === 'REGULAR_POLYGON' ||
						newNode.type === 'RECTANGLE'
					) {
						Object.defineProperty(newNode, 'cornerRadius', {
							get: function() {
								return result.cornerRadius;
							},
							set: function(val) {
								App.updateSelectionProperties({ cornerRadius: val });
							}
						});
					}
					switch (newNode.type) {
						case 'STAR':
							Object.defineProperties(newNode, {
								pointCount: {
									get: function() {
										return result.count;
									},
									set: function(val) {
										App.updateSelectionProperties({ count: val });
									}
								},
								starInnerRadius: {
									get: function() {
										return result.starInnerScale;
									},
									set: function(val) {
										App.updateSelectionProperties({ starInnerScale: val });
									}
								}
							});
							break;
						case 'ELLIPSE':
							Object.defineProperty(newNode, 'arcData', {
								get: function() {
									return {
										startingAngle: result.arcStart,
										endingAngle: result.arcSweep,
										innerRadius: result.arcRadius
									};
								},
								set: function(val) {
									App.updateSelectionProperties({ arcStart: startingAngle });
									App.updateSelectionProperties({ arcSweep: endingAngle });
									App.updateSelectionProperties({ arcRadius: innerRadius });
								}
							});
							break;
						case 'REGULAR_POLYGON':
							Object.defineProperty(newNode, 'pointCount', {
								get: function() {
									return result.count;
								},
								set: function(val) {
									App.updateSelectionProperties({ count: val });
								}
							});
							break;
						case 'TEXT':
							Object.defineProperties(newNode, {
								fontSize: {
									get: function() {
										return result.fontSize;
									},
									set: function(val) {
										App.updateSelectionProperties({ fontSize: val });
									}
								},
								textAlignHorizontal: {
									get: function() {
										return result.textAlignHorizontal;
									},
									set: function(val) {
										App.updateSelectionProperties({ textAlignHorizontal: val });
									}
								},
								textAlignVertical: {
									get: function() {
										return result.textAlignVertical;
									},
									set: function(val) {
										App.updateSelectionProperties({ textAlignVertical: val });
									}
								},
								textDecoration: {
									get: function() {
										return result.textDecoration;
									},
									set: function(val) {
										App.updateSelectionProperties({ textDecoration: val });
									}
								},
								textAutoResize: {
									get: function() {
										return result.textAutoResize;
									},
									set: function(val) {
										App.updateSelectionProperties({ textAutoResize: val });
									}
								},
								fontName: {
									get: function() {
										return result.fontName;
									},
									set: function(val) {
										App.updateSelectionProperties({ fontName: val });
									}
								}
							});
					}
					if (callback !== undefined) callback(newNode);
					App.sendMessage('clearSelection');
					if (selectedNodes.length > 0) App.sendMessage('addToSelection', { nodeIds: selectedNodes });
				}, 16);
			}
		};
	}
	if (sceneNode.type === 'BOOLEAN_OPERATION') {
		newNode.booleanOperation = sceneNode.booleanOperation;
	}
	return newNode;
};
