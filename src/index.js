"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeStore = void 0;
var TreeStore = /** @class */ (function () {
    function TreeStore(array) {
        this.treeStore = array;
    }
    TreeStore.prototype.getAll = function () {
        return this.treeStore;
    };
    TreeStore.prototype.getItem = function (id) {
        var foundItem = this.treeStore.find(function (obj) { return obj.id == id; });
        if (!foundItem) {
            throw new Error('Item not found');
        }
        return foundItem;
    };
    TreeStore.prototype.getChildren = function (id) {
        var foundChildren = this.treeStore.filter(function (obj) { return obj.parent == id; });
        return foundChildren;
    };
    TreeStore.prototype.getAllChildren = function (id) {
        var result = [];
        var arrayStore = this.getChildren(id);
        var index = arrayStore.length - 1;
        var zeroElement = 0;
        while (index >= 0) {
            var currentElement = arrayStore[zeroElement];
            result.push(currentElement);
            arrayStore.splice(zeroElement, 1);
            var child = this.getAllChildren(currentElement.id);
            if (child.length > 0) {
                arrayStore.push.apply(arrayStore, child);
            }
            index = arrayStore.length - 1;
        }
        return result;
    };
    TreeStore.prototype.getAllParents = function (id) {
        var arrayStore = this.getItem(id);
        var result = [];
        while (arrayStore.parent != 'root') {
            arrayStore = this.getItem(arrayStore.parent);
            result.push(arrayStore);
        }
        return result;
    };
    return TreeStore;
}());
exports.TreeStore = TreeStore;
