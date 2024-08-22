interface ObjectTreeStore {
    id: number | string;
    parent: number | string;
    type?: string;
}

export class TreeStore {

    treeStore: ObjectTreeStore[];
    constructor(array: ObjectTreeStore[]) {
        this.treeStore = array;
    }

    getAll(): ObjectTreeStore[] {
        return this.treeStore;
    }

    getItem(id: number | string): ObjectTreeStore {
        const foundItem = this.treeStore.find(obj => obj.id == id)

        if (!foundItem) {
            throw new Error('Item not found');
        }
        return foundItem;
    }

    getChildren(id: number | string): ObjectTreeStore[] {
        const foundChildren = this.treeStore.filter(obj => obj.parent == id)
        return foundChildren
    }

    getAllChildren(id: number | string): ObjectTreeStore[] {

        let result: ObjectTreeStore[] = [];
        let arrayStore: ObjectTreeStore[] = this.getChildren(id);
        let index = arrayStore.length - 1;
        const zeroElement = 0;

        while (index >= 0) {
            let currentElement: ObjectTreeStore = arrayStore[zeroElement];
            result.push(currentElement);
            arrayStore.splice(zeroElement, 1);

            let child: ObjectTreeStore[] = this.getAllChildren(currentElement.id);
            if(child.length > 0) {
                arrayStore.push(...child);
            }
            index = arrayStore.length - 1;
        }
        return result;
    }

    getAllParents(id: number | string): ObjectTreeStore[] {
        let  arrayStore: ObjectTreeStore = this.getItem(id);
        let result: ObjectTreeStore[] = [];

        while (arrayStore.parent != 'root') {
            arrayStore = this.getItem(arrayStore.parent);
            result.push(arrayStore);
        }
        return result;
    }

}



