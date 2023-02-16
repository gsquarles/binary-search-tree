/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/node.js":
/*!*********************!*\
  !*** ./src/node.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "prettyPrint": () => (/* binding */ prettyPrint)
/* harmony export */ });
class Node{
    constructor(data = null, left = null, right = null){
        this.data = data;
        this.left = left;
        this.right = right;
    }
}
let prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Node);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/tree.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node */ "./src/node.js");




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
        let root = new _node__WEBPACK_IMPORTED_MODULE_0__["default"](inputArray[mid]);
        
        root.left = this.buildTree(inputArray, start, mid - 1);
        root.right = this.buildTree(inputArray, mid + 1, end);
        return root;
    }

    insert(value, root = this.root){
        if(root == null){
            return (root = new _node__WEBPACK_IMPORTED_MODULE_0__["default"](value));
        }

        if(value < root.data){
            root.left = this.insert(value, root.left);
        }else{
            root.right = this.insert(value, root.right);
        }
        //prettyPrint(this.root);
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
        (0,_node__WEBPACK_IMPORTED_MODULE_0__.prettyPrint)(this.root);
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

    depth(nodeVal, root = this.root, edgeCount = 0){
        if(root == null) return;
        if(root.data === nodeVal) return edgeCount;

        if(nodeVal > root.data){
            return this.depth(nodeVal, root.right, (edgeCount + 1));
        }else{
            return this.depth(nodeVal,root.left, (edgeCount + 1));
        }
    }
        
    isBalanced(root = this.root){
        if(root == null) return false;

        let left = root.left;
        let right = root.right;
        if(Math.abs(this.height(left) - this.height(right)) > 1){
            return false;
        }else{
            return true;
        }
    }

    rebalance(){
        const currentTreeArray = this.inorder();
        this.root = this.buildTree(currentTreeArray, 0, currentTreeArray.length -1);
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

function createRandomArray(n){
    let array = [];

    for(let i = 0; i < n; i++){
        array[i] = Math.floor(Math.random() * 101);
    }
    return array;
}

function addNumbers(n){
    
    for(let i=0; i<n; i++){
        tree1.insert(Math.floor(Math.random() * 101) +100);
    }
}
/*const arr = [1,2,3,4,5,6,7];
console.log(tree1.inputArray);
tree1.insert(8);
console.log(tree1.root);
console.log(tree1.height());
*/
let tree1 = new Tree(createRandomArray(7));
(0,_node__WEBPACK_IMPORTED_MODULE_0__.prettyPrint)(tree1.root)
console.log(tree1.isBalanced());
console.log(tree1.levelOrder());
console.log(tree1.preOrder());
console.log(tree1.postOrder());
console.log(tree1.inorder());
addNumbers(7);
console.log(tree1.isBalanced());
tree1.rebalance();
(0,_node__WEBPACK_IMPORTED_MODULE_0__.prettyPrint)(tree1.root);
console.log(tree1.isBalanced());
console.log(tree1.levelOrder());
console.log(tree1.preOrder());
//console.log(tree1.postOrder());
//console.log(tree1.inorder());







})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQSxpQ0FBaUMsT0FBTyxFQUFFLHlCQUF5QjtBQUNuRTtBQUNBLG1CQUFtQixPQUFPLEVBQUUseUJBQXlCLEVBQUUsVUFBVTtBQUNqRTtBQUNBLGdDQUFnQyxPQUFPLEVBQUUseUJBQXlCO0FBQ2xFO0FBQ0E7QUFDQSxpRUFBZSxJQUFJOzs7Ozs7VUNoQm5CO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOMEI7QUFDVzs7O0FBR3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHVCQUF1Qiw2Q0FBSTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwrQkFBK0IsNkNBQUk7QUFDbkM7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsa0RBQVc7QUFDbkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxtQkFBbUIsT0FBTztBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLEtBQUs7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWUvLi9zcmMvbm9kZS5qcyIsIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmluYXJ5LXNlYXJjaC10cmVlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWUvLi9zcmMvdHJlZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBOb2Rle1xuICAgIGNvbnN0cnVjdG9yKGRhdGEgPSBudWxsLCBsZWZ0ID0gbnVsbCwgcmlnaHQgPSBudWxsKXtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5sZWZ0ID0gbGVmdDtcbiAgICAgICAgdGhpcy5yaWdodCA9IHJpZ2h0O1xuICAgIH1cbn1cbmV4cG9ydCBsZXQgcHJldHR5UHJpbnQgPSAobm9kZSwgcHJlZml4ID0gJycsIGlzTGVmdCA9IHRydWUpID0+IHtcbiAgICBpZiAobm9kZS5yaWdodCAhPT0gbnVsbCkge1xuICAgICAgcHJldHR5UHJpbnQobm9kZS5yaWdodCwgYCR7cHJlZml4fSR7aXNMZWZ0ID8gJ+KUgiAgICcgOiAnICAgICd9YCwgZmFsc2UpO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhgJHtwcmVmaXh9JHtpc0xlZnQgPyAn4pSU4pSA4pSAICcgOiAn4pSM4pSA4pSAICd9JHtub2RlLmRhdGF9YCk7XG4gICAgaWYgKG5vZGUubGVmdCAhPT0gbnVsbCkge1xuICAgICAgcHJldHR5UHJpbnQobm9kZS5sZWZ0LCBgJHtwcmVmaXh9JHtpc0xlZnQgPyAnICAgICcgOiAn4pSCICAgJ31gLCB0cnVlKTtcbiAgICB9XG4gIH1cbmV4cG9ydCBkZWZhdWx0IE5vZGU7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgTm9kZSBmcm9tIFwiLi9ub2RlXCI7XG5pbXBvcnQgeyBwcmV0dHlQcmludCB9IGZyb20gXCIuL25vZGVcIjtcblxuXG5jbGFzcyBUcmVle1xuICAgIGNvbnN0cnVjdG9yKGlucHV0QXJyYXkpe1xuICAgICAgICB0aGlzLmlucHV0QXJyYXkgPSBbLi4ubmV3IFNldChpbnB1dEFycmF5KV0uc29ydCgoYSxiKSA9PiBhLWIpO1xuICAgICAgICB0aGlzLnJvb3QgPSB0aGlzLmJ1aWxkVHJlZSh0aGlzLmlucHV0QXJyYXksIDAsIHRoaXMuaW5wdXRBcnJheS5sZW5ndGggLTEpO1xuICAgICAgICB0aGlzLmlub3JkZXJEYXRhID0gW107XG4gICAgICAgIHRoaXMucHJlT3JkZXJEYXRhID0gW107XG4gICAgICAgIHRoaXMucG9zdE9yZGVyRGF0YSA9IFtdO1xuICAgIH1cblxuICAgIGJ1aWxkVHJlZShpbnB1dEFycmF5LCBzdGFydCwgZW5kKSB7XG4gICAgICAgIGlmIChzdGFydCA+IGVuZCkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgbGV0IG1pZCA9IHBhcnNlSW50KChzdGFydCArIGVuZCkgLyAyKTtcbiAgICAgICAgbGV0IHJvb3QgPSBuZXcgTm9kZShpbnB1dEFycmF5W21pZF0pO1xuICAgICAgICBcbiAgICAgICAgcm9vdC5sZWZ0ID0gdGhpcy5idWlsZFRyZWUoaW5wdXRBcnJheSwgc3RhcnQsIG1pZCAtIDEpO1xuICAgICAgICByb290LnJpZ2h0ID0gdGhpcy5idWlsZFRyZWUoaW5wdXRBcnJheSwgbWlkICsgMSwgZW5kKTtcbiAgICAgICAgcmV0dXJuIHJvb3Q7XG4gICAgfVxuXG4gICAgaW5zZXJ0KHZhbHVlLCByb290ID0gdGhpcy5yb290KXtcbiAgICAgICAgaWYocm9vdCA9PSBudWxsKXtcbiAgICAgICAgICAgIHJldHVybiAocm9vdCA9IG5ldyBOb2RlKHZhbHVlKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZih2YWx1ZSA8IHJvb3QuZGF0YSl7XG4gICAgICAgICAgICByb290LmxlZnQgPSB0aGlzLmluc2VydCh2YWx1ZSwgcm9vdC5sZWZ0KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByb290LnJpZ2h0ID0gdGhpcy5pbnNlcnQodmFsdWUsIHJvb3QucmlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIC8vcHJldHR5UHJpbnQodGhpcy5yb290KTtcbiAgICAgICAgcmV0dXJuIHJvb3Q7XG4gICAgfVxuXG4gICAgZGVsZXRlKHZhbHVlLCByb290ID0gdGhpcy5yb290KXtcbiAgICAgICAgaWYocm9vdCA9PSBudWxsKXtcbiAgICAgICAgICAgIHJldHVybiByb290O1xuICAgICAgICB9XG4gICAgICAgIGlmKHZhbHVlIDwgcm9vdC5kYXRhKXtcbiAgICAgICAgICAgIHJvb3QubGVmdCA9IHRoaXMuZGVsZXRlKHZhbHVlLCByb290LmxlZnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodmFsdWUgPiByb290LmRhdGEpe1xuICAgICAgICAgICAgcm9vdC5yaWdodCA9IHRoaXMuZGVsZXRlKHZhbHVlLCByb290LnJpZ2h0KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAvL05vZGUgd2l0aCBvbmx5IG9uZSBjaGlsZCBvciBubyBjaGlsZFxuICAgICAgICAgICAgaWYocm9vdC5sZWZ0ID09IG51bGwpe1xuICAgICAgICAgICAgICAgIHJldHVybiByb290LnJpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihyb290LnJpZ2h0ID09IG51bGwpe1xuICAgICAgICAgICAgICAgIHJldHVybiByb290LmxlZnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vTm9kZSB3aXRoIHR3byBjaGlsZHJlblxuICAgICAgICAgICAgcm9vdC5kYXRhID0gbWluVmFsdWUocm9vdCk7XG4gICAgICAgICAgICByb290LnJpZ2h0ID0gdGhpcy5kZWxldGUocm9vdC5yaWdodCwgcm9vdC5kYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBwcmV0dHlQcmludCh0aGlzLnJvb3QpO1xuICAgICAgICByZXR1cm4gcm9vdDtcbiAgICB9XG5cbiAgICBmaW5kKGRhdGEsIHJvb3QgPSB0aGlzLnJvb3Qpe1xuICAgICAgICBpZihyb290ID09IG51bGwpe1xuICAgICAgICAgICAgcmV0dXJuIHJvb3Q7XG4gICAgICAgIH1cbiAgICAgICAgaWYocm9vdC5kYXRhID09IGRhdGEpe1xuICAgICAgICAgICAgcmV0dXJuIHJvb3Q7XG4gICAgICAgIH1cblxuICAgICAgICBpZihkYXRhIDwgcm9vdC5kYXRhKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbmQoZGF0YSwgcm9vdC5sZWZ0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGRhdGEgPiByb290LmRhdGEpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmluZChkYXRhLCByb290LnJpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHJvb3Q7XG4gICAgfVxuICAgXG4gICAgbGV2ZWxPcmRlcihyb290ID0gdGhpcy5yb290KXtcbiAgICAgICAgbGV0IHF1ZXVlID0gW107XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgaWYocm9vdCA9PSBudWxsKSByZXR1cm47XG5cbiAgICAgICAgcXVldWUucHVzaChyb290KTtcblxuICAgICAgICB3aGlsZShxdWV1ZS5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIGxldCBjdXJyZW50ID0gcXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGN1cnJlbnQuZGF0YSk7XG5cbiAgICAgICAgICAgIGlmKGN1cnJlbnQubGVmdCAhPT0gbnVsbCkgcXVldWUucHVzaChjdXJyZW50LmxlZnQpO1xuICAgICAgICAgICAgaWYoY3VycmVudC5yaWdodCAhPT0gbnVsbCkgcXVldWUucHVzaChjdXJyZW50LnJpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGlub3JkZXIocm9vdCA9IHRoaXMucm9vdCl7XG4gICAgICAgIFxuICAgICAgICBpZihyb290ID09IG51bGwpIHJldHVybjtcblxuICAgICAgICBpZihyb290LmxlZnQgIT09IG51bGwpe1xuICAgICAgICAgICAgdGhpcy5pbm9yZGVyKHJvb3QubGVmdCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihyb290LmRhdGEgIT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICB0aGlzLmlub3JkZXJEYXRhLnB1c2gocm9vdC5kYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHJvb3QucmlnaHQgIT09IG51bGwpe1xuICAgICAgICAgICAgdGhpcy5pbm9yZGVyKHJvb3QucmlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmlub3JkZXJEYXRhO1xuICAgIH1cblxuICAgIHByZU9yZGVyKHJvb3QgPSB0aGlzLnJvb3Qpe1xuICAgICAgICBcbiAgICAgICAgaWYocm9vdCA9PSBudWxsKSByZXR1cm47XG5cbiAgICAgICAgaWYocm9vdC5kYXRhICE9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgdGhpcy5wcmVPcmRlckRhdGEucHVzaChyb290LmRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGlmKHJvb3QubGVmdCAhPT1udWxsKXtcbiAgICAgICAgICAgIHRoaXMucHJlT3JkZXIocm9vdC5sZWZ0KTtcbiAgICAgICAgfVxuICAgICAgICBpZihyb290LnJpZ2h0ICE9PSBudWxsKXtcbiAgICAgICAgICAgIHRoaXMucHJlT3JkZXIocm9vdC5yaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucHJlT3JkZXJEYXRhO1xuICAgIH1cblxuICAgIHBvc3RPcmRlcihyb290ID0gdGhpcy5yb290KXtcbiAgICAgICAgXG4gICAgICAgIGlmKHJvb3QgPT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgICAgIGlmKHJvb3QubGVmdCAhPT0gbnVsbCl7XG4gICAgICAgICAgICB0aGlzLnBvc3RPcmRlcihyb290LmxlZnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmKHJvb3QucmlnaHQgIT09IG51bGwpe1xuICAgICAgICAgICAgdGhpcy5wb3N0T3JkZXIocm9vdC5yaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYocm9vdC5kYXRhICE9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgdGhpcy5wb3N0T3JkZXJEYXRhLnB1c2gocm9vdC5kYXRhKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wb3N0T3JkZXJEYXRhO1xuICAgIH1cblxuICAgIGhlaWdodChub2RlID0gdGhpcy5yb290KXtcbiAgICAgICAgaWYobm9kZSA9PSBudWxsKSByZXR1cm4gLTE7XG5cbiAgICAgICAgY29uc3QgbGVmdCA9IHRoaXMuaGVpZ2h0KG5vZGUubGVmdCk7XG4gICAgICAgIGNvbnN0IHJpZ2h0ID0gdGhpcy5oZWlnaHQobm9kZS5yaWdodCk7XG5cbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KGxlZnQscmlnaHQpICsgMTtcbiAgICB9XG5cbiAgICBkZXB0aChub2RlVmFsLCByb290ID0gdGhpcy5yb290LCBlZGdlQ291bnQgPSAwKXtcbiAgICAgICAgaWYocm9vdCA9PSBudWxsKSByZXR1cm47XG4gICAgICAgIGlmKHJvb3QuZGF0YSA9PT0gbm9kZVZhbCkgcmV0dXJuIGVkZ2VDb3VudDtcblxuICAgICAgICBpZihub2RlVmFsID4gcm9vdC5kYXRhKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlcHRoKG5vZGVWYWwsIHJvb3QucmlnaHQsIChlZGdlQ291bnQgKyAxKSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGVwdGgobm9kZVZhbCxyb290LmxlZnQsIChlZGdlQ291bnQgKyAxKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgICAgIFxuICAgIGlzQmFsYW5jZWQocm9vdCA9IHRoaXMucm9vdCl7XG4gICAgICAgIGlmKHJvb3QgPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGxldCBsZWZ0ID0gcm9vdC5sZWZ0O1xuICAgICAgICBsZXQgcmlnaHQgPSByb290LnJpZ2h0O1xuICAgICAgICBpZihNYXRoLmFicyh0aGlzLmhlaWdodChsZWZ0KSAtIHRoaXMuaGVpZ2h0KHJpZ2h0KSkgPiAxKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlYmFsYW5jZSgpe1xuICAgICAgICBjb25zdCBjdXJyZW50VHJlZUFycmF5ID0gdGhpcy5pbm9yZGVyKCk7XG4gICAgICAgIHRoaXMucm9vdCA9IHRoaXMuYnVpbGRUcmVlKGN1cnJlbnRUcmVlQXJyYXksIDAsIGN1cnJlbnRUcmVlQXJyYXkubGVuZ3RoIC0xKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG1pblZhbHVlKHJvb3Qpe1xuICAgIGxldCBtaW4gPSByb290LmRhdGE7XG4gICAgd2hpbGUocm9vdCAhPSBudWxsKXtcbiAgICAgICAgbWluID0gcm9vdC5kYXRhO1xuICAgICAgICByb290ID0gcm9vdC5sZWZ0O1xuICAgIH1cbiAgICByZXR1cm4gbWluO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVSYW5kb21BcnJheShuKXtcbiAgICBsZXQgYXJyYXkgPSBbXTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBuOyBpKyspe1xuICAgICAgICBhcnJheVtpXSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMSk7XG4gICAgfVxuICAgIHJldHVybiBhcnJheTtcbn1cblxuZnVuY3Rpb24gYWRkTnVtYmVycyhuKXtcbiAgICBcbiAgICBmb3IobGV0IGk9MDsgaTxuOyBpKyspe1xuICAgICAgICB0cmVlMS5pbnNlcnQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAxKSArMTAwKTtcbiAgICB9XG59XG4vKmNvbnN0IGFyciA9IFsxLDIsMyw0LDUsNiw3XTtcbmNvbnNvbGUubG9nKHRyZWUxLmlucHV0QXJyYXkpO1xudHJlZTEuaW5zZXJ0KDgpO1xuY29uc29sZS5sb2codHJlZTEucm9vdCk7XG5jb25zb2xlLmxvZyh0cmVlMS5oZWlnaHQoKSk7XG4qL1xubGV0IHRyZWUxID0gbmV3IFRyZWUoY3JlYXRlUmFuZG9tQXJyYXkoNykpO1xucHJldHR5UHJpbnQodHJlZTEucm9vdClcbmNvbnNvbGUubG9nKHRyZWUxLmlzQmFsYW5jZWQoKSk7XG5jb25zb2xlLmxvZyh0cmVlMS5sZXZlbE9yZGVyKCkpO1xuY29uc29sZS5sb2codHJlZTEucHJlT3JkZXIoKSk7XG5jb25zb2xlLmxvZyh0cmVlMS5wb3N0T3JkZXIoKSk7XG5jb25zb2xlLmxvZyh0cmVlMS5pbm9yZGVyKCkpO1xuYWRkTnVtYmVycyg3KTtcbmNvbnNvbGUubG9nKHRyZWUxLmlzQmFsYW5jZWQoKSk7XG50cmVlMS5yZWJhbGFuY2UoKTtcbnByZXR0eVByaW50KHRyZWUxLnJvb3QpO1xuY29uc29sZS5sb2codHJlZTEuaXNCYWxhbmNlZCgpKTtcbmNvbnNvbGUubG9nKHRyZWUxLmxldmVsT3JkZXIoKSk7XG5jb25zb2xlLmxvZyh0cmVlMS5wcmVPcmRlcigpKTtcbi8vY29uc29sZS5sb2codHJlZTEucG9zdE9yZGVyKCkpO1xuLy9jb25zb2xlLmxvZyh0cmVlMS5pbm9yZGVyKCkpO1xuXG5cblxuXG5cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9