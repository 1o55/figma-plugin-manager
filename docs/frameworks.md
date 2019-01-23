# UI Frameworks

We have embedded some UI framework API's to help you build your UI. Using these embedded API's is preferred over pulling in your own build, since it requires loading only one instance of the API instead of one instance per plugin using these frameworks.

## React

Both [React](https://reactjs.org/docs/react-api.html) and [ReactDOM](https://reactjs.org/docs/react-dom.html) API's are available in `figmaPlugin`.

To use [JSX](https://reactjs.org/docs/introducing-jsx.html), you will have to use [babel](https://reactjs.org/docs/add-react-to-a-website.html#add-jsx-to-a-project) to build your project.

```javascript
figmaPlugin.React;

figmaPlugin.ReactDOM;
```

<!-- prettier-ignore -->
```javascript
// Example code for rendering a button inside a modal without JSX:
figmaPlugin.showUI(
	'Hello world',
	(modalElement) => {
		const button = figmaPlugin.React.createElement(
			"button",
			{ class: "button primary"},
			"Button"
		);
		figmaPlugin.ReactDOM.render(button, modalElement);
	}
);

// Example code for rendering a button inside a modal with JSX:
figmaPlugin.showUI(
	'Hello world',
	(modalElement) => {
		const button = <button class="button primary">Button</button>;
		figmaPlugin.ReactDOM.render(button, modalElement);
	}
);
```

## Vue

[Vue](https://vuejs.org/) API is available in `figmaPlugin`.

[Single file components](https://vuejs.org/v2/guide/single-file-components.html) are also supported by building the project with `vue-loader`.

```javascript
figmaPlugin.Vue;
```

<!-- prettier-ignore -->
```javascript
// Example code for rendering a button inside a modal using template literals:
figmaPlugin.showUI(
	'Hello world',
	(modalElement) => {
		new figmaPlugin.Vue({
			el: modalElement,
			template: `<button class="button primary">Button</button>`
		})
	}
);

// Example code for rendering a component inside a modal:
figmaPlugin.showUI(
	'Hello world',
	(modalElement) => {
		new figmaPlugin.Vue({
			el: modalElement,
			render: h => h(component)
		})
	}
);
```
