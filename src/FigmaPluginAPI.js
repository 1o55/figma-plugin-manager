export const FigmaPluginAPI = {
	createContextMenuButton: {
		Selection: (id, buttonLabel, triggerFunction) => {
			createContextMenuButton('DROPDOWN_TYPE_SELECTION_CONTEXT_MENU', id, buttonLabel, triggerFunction);
		},
		Canvas: (id, buttonLabel, triggerFunction) => {
			createContextMenuButton('DROPDOWN_TYPE_CANVAS_CONTEXT_MENU', id, buttonLabel, triggerFunction);
		}
	}
};

const createContextMenuButton = (menuType, id, buttonLabel, triggerFunction) => {
	window.addEventListener('menuOpened', event => {
		if (event.detail.menu.type === menuType) {
			if (!event.detail.hasMoreOptions) {
				const menu = document.querySelector('div[class*="dropdown--dropdown--35dH4"]');
				const newButton = document.createElement('div');
				newButton.className = 'plugin-context-menu-item';
				newButton.id = id;
				newButton.innerText = buttonLabel;
				newButton.onclick = () => {
					triggerFunction.call();
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
	window.addEventListener('moreMenuOpened', event => {
		if (event.detail.menu.type === menuType) {
			if (event.detail.hasMoreOptions) {
				const menu = document.querySelector('div[class*="multilevel_dropdown--menu"]');
				const newButton = document.createElement('div');
				newButton.className = 'plugin-context-menu-item';
				newButton.id = id;
				newButton.innerText = buttonLabel;
				newButton.onclick = () => {
					triggerFunction.call();
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
