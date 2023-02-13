

prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
  class Node{
    constructor(data = null, left = null, right = null){
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree{
    constructor(inputArray){
        this.inputArray = [...new Set(inputArray)].sort((a,b) => a-b);
        this.root = this.buildTree(this.inputArray, 0, this.inputArray.length -1);
    }

    buildTree(inputArray, start, end) {
        if (start > end) return null;

        let mid = parseInt((start + end) / 2);
        let root = new Node(inputArray[mid]);
        
        root.left = this.buildTree(inputArray, start, mid - 1);
        root.right = this.buildTree(inputArray, mid + 1, end);
        return root;
    }
   
}
const arr = [1, 2,3,4,5,6,7,8];
let tree1 = new Tree(arr);
console.log(tree1.inputArray);
prettyPrint(tree1.root);
