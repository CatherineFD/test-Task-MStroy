const { TreeStore } = require('./index');

describe('TreeStore', () => {
    let treeStore;

    beforeEach(() => {
        const data = [
            { id: 1, parent: 'root' },
            { id: 2, parent: 1, type: 'test' },
            { id: 3, parent: 1, type: 'test' },
            { id: 4, parent: 2, type: 'test' },
            { id: 5, parent: 2, type: 'test' },
            { id: 6, parent: 2, type: 'test' },
            { id: 7, parent: 4, type: null },
            { id: 8, parent: 4, type: null },
        ];
        treeStore = new TreeStore(data);
    });

    test('getAll should return all items', () => {
        const result = treeStore.getAll();
        expect(result).toHaveLength(8);
    });

    test('getItem should return the correct item', () => {
        const result = treeStore.getItem(3);
        expect(result).toEqual({ id: 3, parent: 1, type: 'test' });
    });

    test('getChildren should return children of a given item', () => {
        const result = treeStore.getChildren(2);
        expect(result).toHaveLength(3);
        expect(result).toEqual([
            { id: 4, parent: 2, type: 'test' },
            { id: 5, parent: 2, type: 'test' },
            { id: 6, parent: 2, type: 'test' }
        ]);
    });

    test('getAllChildren should return all descendants of a given item', () => {
        const result = treeStore.getAllChildren(2);
        expect(result).toHaveLength(5);
        expect(result).toEqual([
            { id: 4, parent: 2, type: 'test' },
            { id: 5, parent: 2, type: 'test' },
            { id: 6, parent: 2, type: 'test' },
            { id: 7, parent: 4, type: null },
            { id: 8, parent: 4, type: null }
        ]);
    });

    test('getAllParents should return all parents of a given item', () => {
        const result = treeStore.getAllParents(7);
        expect(result).toHaveLength(3);
        expect(result).toEqual([
            { id: 4, parent: 2, type: 'test' },
            { id: 2, parent: 1, type: 'test' },
            {id: 1,parent: "root"}
        ]);
    });
});
