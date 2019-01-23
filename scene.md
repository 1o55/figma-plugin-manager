# Scene

`figmaPlugin.scene` contains a number of functions you can use to get or set properties of your nodes in the document.

## Node

This is the type of object returned by the `getNodeById`, `root`, `currentPage` and `selection` functions. A node object describes the properties of an element in your opened document, which may include the document, pages, frames/groups, layers, etc.

Learn more about node types from [Figma's API documentation](https://www.figma.com/developers/docs#node-types).

### Global properties

Global properties exist on every node. All Global properties are read only unless otherwise specified.

Please refer to [Figma's API documentation](https://www.figma.com/developers/docs#global-properties) for more information on Global properties.

```
id: <String>
type: <String>
parent: <Node>
children: <Array>		// Array of children nodes, if it has any
name: <String>			// Editable using node.name = 'newName'
visible: <Boolean>		// Editable using node.visible = <Boolean>
locked: <Boolean>		// Editable using node.locked = <Boolean>
absoluteBounds: {		// Absolute position and size of the node on the canvas
	x: <Number>,
	y: <Number>,
	width: <Number>,
	height: <Number>
}
relativeTransform: <Array>	// Relative position and rotation to the parent
characters: <String>		// Text content of a text node. Editable using node.characters = 'New Text'

```

### Properties

To get display properties like fill colors and font size, you will need to call `node.getProperties(callback)` in which the provided callback function would receive the node object with properties. (Referred to as `newNode` below)

Non-global properties are all editable simply by setting a new value in the callback function. E.g. `newNode.fontSize = 14`

<!-- prettier-ignore -->
```javascript
// Example code for setting a text node's font size to 14:

node.getProperties(
	(newNode) => {
		newNode.fontSize = 14;
	}
);
```

Please refer to [Figma's API documentation](https://www.figma.com/developers/docs#node-types) for more information on node properties.

### getAllDescendents

Run this function on a node to get an array of all descendents (children, grandchildren, etc.) of a node with children. This is useful for iterating over all nodes inside a subtree without recursion.

```javascript
node.getAllDescendents();
```

---

# Functions

## getNodeById

Look up a node by its ID string.

```javascript
figmaPlugin.scene.getNodeById(nodeId);
```

- **nodeId** (`String`): A node's ID number, e.g. "1:23"

## root

Get the document node. Each child is a page.

```javascript
figmaPlugin.scene.root();
```

## currentPage

Get the current page node. Everything on the current page can be found under this node.

```javascript
figmaPlugin.scene.currentPage();
```

## selection

Get an array of all selected nodes.
You can also set your selection by passing an array of node objects or node ID's.

```javascript
// Get selection
figmaPlugin.scene.selection();

// Set selection by an array of node objects
figmaPlugin.scene.selection([node]);

// Set selection by an array of node ID's
figmaPlugin.scene.selection([nodeId]);
```

- **node** (`Node`): See [Node](#Node) object above.
- **nodeId** (`String`): A node's ID number, e.g. "1:23"

## centerOnPoint

Set the viewport translation and scale values.

```javascript
figmaPlugin.scene.centerOnPoint(
	point: {x, y},
	zoomScale
);
```

- **x** (`Number`): Absolute vertical position on the canvas.
- **y** (`Number`): Absolute horizontal position on the canvas.
- **zoomScale (optional)** (`Number`): The zoom level of the viewport. Default: `1`

## panToNode

Center the viewport to the provided node (Without zooming).

```javascript
// Pan to a node by its node object
figmaPlugin.scene.panToNode(node);

// Pan to a node by its node ID
figmaPlugin.scene.panToNode(nodeId);
```

- **node** (`Node`): See [Node](#Node) object above.
- **nodeId** (`String`): A node's ID number, e.g. "1:23"

## zoomOnNodes

Zoom the viewport to contain the provide nodes.

```javascript
// Pan to a node by an array of node objects
figmaPlugin.scene.zoomOnNodes([node]);

// Pan to a node by an array of node ID's
figmaPlugin.scene.zoomOnNodes([nodeId]);
```

- **node** (`Node`): See [Node](#Node) object above.
- **nodeId** (`String`): A node's ID number, e.g. "1:23"
