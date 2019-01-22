export const getNode = node => {
	const sceneNode = App._state.mirror.sceneGraph.get(node);
	const newNode = { id: sceneNode.guid, type: sceneNode.type };
	if (sceneNode.parent) {
		Object.defineProperty(newNode, 'parent', {
			get: function() {
				return getNode(sceneNode.parent);
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
		Object.defineProperty(newNode, 'children', {
			value: sceneNode.children.map(child => {
				return getNode(child);
			})
		});
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
								App.updateSelectionProperties({
									horizontalConstraint: val.horizontal,
									verticalConstraint: val.vertical
								});
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
							},
							strokeCap: {
								get: function() {
									return result.strokeCap;
								},
								set: function(val) {
									App.updateSelectionProperties({ strokeCap: val });
								}
							},
							strokeJoin: {
								get: function() {
									return result.strokeJoin;
								},
								set: function(val) {
									App.updateSelectionProperties({ strokeJoin: val });
								}
							},
							dashPattern: {
								get: function() {
									return result.dashPattern;
								},
								set: function(val) {
									App.updateSelectionProperties({ dashPattern: val });
								}
							}
						});
					}
					if (newNode.type === 'FRAME' || newNode.type === 'INSTANCE' || newNode.type === 'SYMBOL') {
						Object.defineProperties(newNode, {
							backgrounds: {
								get: function() {
									return result.backgroundPaints;
								},
								set: function(val) {
									App.updateSelectionProperties({ backgroundPaints: val });
								}
							},
							layoutGrids: {
								get: function() {
									return result.layoutGrids;
								},
								set: function(val) {
									App.updateSelectionProperties({ layoutGrids: val });
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
						Object.defineProperties(newNode, {
							cornerRadius: {
								get: function() {
									return result.cornerRadius;
								},
								set: function(val) {
									App.updateSelectionProperties({ cornerRadius: val });
								}
							},
							cornerSmoothing: {
								get: function() {
									return result.cornerSmoothing;
								},
								set: function(val) {
									App.updateSelectionProperties({ cornerSmoothing: val });
								}
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
									App.updateSelectionProperties({
										arcStart: val.startingAngle,
										arcSweep: val.endingAngle,
										arcRadius: val.innerRadius
									});
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
						case 'RECTANGLE':
							Object.defineProperties(newNode, {
								rectangleBottomLeftCornerRadius: {
									get: function() {
										return result.rectangleBottomLeftCornerRadius;
									},
									set: function(val) {
										App.updateSelectionProperties({ rectangleBottomLeftCornerRadius: val });
									}
								},
								rectangleBottomRightCornerRadius: {
									get: function() {
										return result.rectangleBottomRightCornerRadius;
									},
									set: function(val) {
										App.updateSelectionProperties({ rectangleBottomRightCornerRadius: val });
									}
								},
								rectangleTopLeftCornerRadius: {
									get: function() {
										return result.rectangleTopLeftCornerRadius;
									},
									set: function(val) {
										App.updateSelectionProperties({ rectangleTopLeftCornerRadius: val });
									}
								},
								rectangleTopRightCornerRadius: {
									get: function() {
										return result.rectangleTopRightCornerRadius;
									},
									set: function(val) {
										App.updateSelectionProperties({ rectangleTopRightCornerRadius: val });
									}
								},
								rectangleCornerRadiiIndependent: {
									get: function() {
										return result.rectangleCornerRadiiIndependent;
									},
									set: function(val) {
										App.updateSelectionProperties({ rectangleCornerRadiiIndependent: val });
									}
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
								},
								letterSpacing: {
									get: function() {
										return result.letterSpacing;
									},
									set: function(val) {
										App.updateSelectionProperties({ letterSpacing: val });
									}
								},
								lineHeight: {
									get: function() {
										return result.lineHeight;
									},
									set: function(val) {
										App.updateSelectionProperties({ lineHeight: val });
									}
								},
								paragraphIndent: {
									get: function() {
										return result.paragraphIndent;
									},
									set: function(val) {
										App.updateSelectionProperties({ paragraphIndent: val });
									}
								},
								paragraphSpacing: {
									get: function() {
										return result.paragraphSpacing;
									},
									set: function(val) {
										App.updateSelectionProperties({ paragraphSpacing: val });
									}
								},
								textCase: {
									get: function() {
										return result.textCase;
									},
									set: function(val) {
										App.updateSelectionProperties({ textCase: val });
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
	if (newNode.children) {
		newNode.getAllDescendents = () => getAllDescendents(newNode);
	}
	return newNode;
};

const getAllDescendents = node => {
	let descendents = [];
	const addToDescendents = node => {
		if (node.children) {
			for (let i = 0; i < node.children.length; i++) {
				const thisNode = node.children[i];
				descendents.push(thisNode);
				addToDescendents(thisNode);
			}
		}
	};
	addToDescendents(node);
	return descendents;
};

export const scene = {
	getNodeById: function(nodeId) {
		return getNode(nodeId);
	},
	zoomOnNodes: function(nodes) {
		const selectedNodes = Object.keys(App._state.mirror.sceneGraphSelection);
		if (nodes.length === 0) return;
		nodes = typeof nodes[0] === 'object' ? nodes.map(node => node.id) : nodes;
		App.sendMessage('clearSelection');
		App.sendMessage('addToSelection', { nodeIds: nodes });
		App.triggerAction('zoom-to-selection');
		App.sendMessage('clearSelection');
		if (selectedNodes.length > 0) App.sendMessage('addToSelection', { nodeIds: selectedNodes });
	},
	panToNode: function(node) {
		node = typeof node === 'object' ? node.id : node;
		App.panToNode(node);
	},
	centerOnPoint: function(point, zoomScale) {
		zoomScale = zoomScale ? zoomScale : 1;
		App.sendMessage('setCanvasSpaceCenter', { x: point.x, y: point.y });
		App.sendMessage('updateActiveCanvasCurrentZoom', { zoom: zoomScale });
	}
};
Object.defineProperties(scene, {
	root: {
		get: function() {
			return getNode('0:0');
		}
	},
	currentPage: {
		get: function() {
			return getNode(App._state.mirror.appModel.currentPage);
		}
	},
	selection: {
		get: function() {
			return Object.keys(App._state.mirror.sceneGraphSelection).map(nodeId => getNode(nodeId));
		},
		set: function(selections) {
			if (selections.length === 0) {
				App.sendMessage('clearSelection');
				return;
			}
			selections = typeof selections[0] === 'object' ? selections.map(selection => selection.id) : selections;
			App.sendMessage('clearSelection');
			App.sendMessage('addToSelection', { nodeIds: selections });
			App.fromFullscreen._listenersByEvent.scrollToNode[0]({ nodeId: selections[0] });
		}
	}
});
