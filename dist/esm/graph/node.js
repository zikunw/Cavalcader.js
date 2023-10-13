export class Node {
    constructor(id, label, shape) {
        this.id = id;
        this.label = label;
        this.shape = shape;
        this.parents = [];
        this.children = [];
    }
    addParent(parent) {
        if (typeof parent === "string") {
            this.parents.push(parent);
        }
        else {
            this.parents.push(parent.id);
        }
    }
    getParents() {
        return this.parents.slice();
    }
    addChild(child) {
        if (typeof child === "string") {
            this.children.push(child);
        }
        else {
            this.children.push(child.id);
        }
    }
    getChildren() {
        return this.children.slice();
    }
    toString() {
        return `Node {${this.id}, ${this.label}, ${this.shape}}`;
    }
    printNode() {
        console.log(`Node {${this.id}, ${this.label}, ${this.shape}}`);
    }
}
