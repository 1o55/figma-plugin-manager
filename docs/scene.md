# Scene

The Scene object contains a number of functions you can use to get or set properties of your nodes in the document.

`figmaPlugin.scene`

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

- **node** (`Node`): A node object returned by `getNodeById`, `root`, `currentPage` or `selection`.
- **nodeId** (`String`): A node's ID number, e.g. "1:23"

## node.getAllDescendents

Get and array of all descendents (children, grandchildren, etc.) of a node with children. This is useful for iterating over all nodes inside a subtree without recursion.

```javascript
// Get all nodes in the document.
figmaPlugin.scene.root.getAllDescendents();

// Get all nodes in the current page.
figmaPlugin.scene.currentPage.getAllDescendents();

// Get all descendent nodes of the selected node..
figmaPlugin.scene.selection[0].getAllDescendents();
```

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

- **node** (`Node`): A node object returned by `getNodeById`, `root`, `currentPage` or `selection`.
- **nodeId** (`String`): A node's ID number, e.g. "1:23"

## zoomOnNodes

Zoom the viewport to contain the provide nodes.

```javascript
// Pan to a node by an array of node objects
figmaPlugin.scene.zoomOnNodes([node]);

// Pan to a node by an array of node ID's
figmaPlugin.scene.zoomOnNodes([nodeId]);
```

- **node** (`Node`): A node object returned by `getNodeById`, `root`, `currentPage` or `selection`.
- **nodeId** (`String`): A node's ID number, e.g. "1:23"
