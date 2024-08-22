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
var items = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },
    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },
    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
];
var store = new TreeStore(items);
console.log(store.getAll());
console.log(store.getItem(7));
console.log(store.getChildren(5));
console.log(store.getChildren(2));
console.log(store.getAllChildren(2));
console.log(store.getAllParents(7));
