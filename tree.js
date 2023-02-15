

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
        this.inorderData = [];
        this.preOrderData = [];
        this.postOrderData = [];
    }

    buildTree(inputArray, start, end) {
        if (start > end) return null;

        let mid = parseInt((start + end) / 2);
        let root = new Node(inputArray[mid]);
        
        root.left = this.buildTree(inputArray, start, mid - 1);
        root.right = this.buildTree(inputArray, mid + 1, end);
        return root;
    }

    insert(value, root = this.root){
        if(root == null){
            return (root = new Node(value));
        }

        if(value < root.data){
            root.left = this.insert(value, root.left);
        }else{
            root.right = this.insert(value, root.right);
        }
        prettyPrint(this.root);
        return root;
    }

    delete(value, root = this.root){
        if(root == null){
            return root;
        }
        if(value < root.data){
            root.left = this.delete(value, root.left);
        }
        else if(value > root.data){
            root.right = this.delete(value, root.right);
        }else{
            //Node with only one child or no child
            if(root.left == null){
                return root.right;
            }
            else if(root.right == null){
                return root.left;
            }

            //Node with two children
            root.data = minValue(root);
            root.right = this.delete(root.right, root.data);
        }
        prettyPrint(this.root);
        return root;
    }

    find(data, root = this.root){
        if(root == null){
            return root;
        }
        if(root.data == data){
            return root;
        }

        if(data < root.data){
            return this.find(data, root.left);
        }
        else if(data > root.data){
            return this.find(data, root.right);
        }
        
        return root;
    }
   
    levelOrder(root = this.root){
        let queue = [];
        let result = [];
        if(root == null) return;

        queue.push(root);

        while(queue.length > 0){
            let current = queue.shift();
            result.push(current.data);

            if(current.left !== null) queue.push(current.left);
            if(current.right !== null) queue.push(current.right);
        }
        return result;
    }

    inorder(root = this.root){
        
        if(root == null) return;

        if(root.left !== null){
            this.inorder(root.left);
        }

        if(root.data !== undefined){
            this.inorderData.push(root.data);
        }

        if(root.right !== null){
            this.inorder(root.right);
        }
        return this.inorderData;
    }

    preOrder(root = this.root){
        if(root == null) return;

        if(root.data !== undefined){
            this.preOrderData.push(root.data);
        }
        if(root.left !==null){
            this.preOrder(root.left);
        }
        if(root.right !== null){
            this.preOrder(root.right);
        }
        return this.preOrderData;
    }

    postOrder(root = this.root){
        if(root == null) return;

        if(root.left !== null){
            this.postOrder(root.left);
        }
        if(root.right !== null){
            this.postOrder(root.right);
        }
        if(root.data !== undefined){
            this.postOrderData.push(root.data);
        }
        return this.postOrderData;
    }

    height(node = this.root){
        if(node == null) return -1;

        const left = this.height(node.left);
        const right = this.height(node.right);

        return Math.max(left,right) + 1;
    }
        
}

function minValue(root){
    let min = root.data;
    while(root != null){
        min = root.data;
        root = root.left;
    }
    return min;
}

const arr = [1,2,3,4,5,6,7];
let tree1 = new Tree(arr);
console.log(tree1.inputArray);
tree1.insert(8);
tree1.delete(8);
console.log(tree1.root);


