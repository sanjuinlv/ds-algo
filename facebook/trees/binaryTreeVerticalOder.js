/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var verticalOrder = function(root) {
    if (root == null) return [];
    let result = [];
    let column = 0;
    const helper = (node) => {
        if (node == null) return;
        //left 
        if (column > 0) column--;
        helper(node.left);
        if (node.left) {
            if (result[column]) {
                result[column].push(node.left.val)
            } else {
                result[column] = [node.left.val];
            }
        }
        //node
        if (result[column]) {
            //append at begining
            result[column++].splice(1,0,node.val);
        } else {
            result[column++] = [node.val];
        }
        //right
        helper(node.right);
        if (node.right){
            if (result[column]) {
                result[column].push(node.right.val)
            } else {
                result[column] = [node.right.val];
            }
        }
    }
    helper(root);
    return result;
};

/*
[3,9,8,4,0,1,7,null,null,null,2,5]  - FAIL
Expected: [[4],[9,5],[3,0,1],[8,2],[7]]


*/
var verticalOrder = function(root) {
    if (root == null) return [];
    let result = [];
    let column = 0;
    const helper = (node) => {
        if (node == null) return;
        //left 
        if (node.left && column > 0) column--;
        helper(node.left);
        console.log(`node: ${node.val}, column: ${column}`);
        //node
        if (result[column]) {
            //append at begining
            // result[column++].splice(1,0,node.val);
            result[column++].push(node.val);
        } else {
            result[column++] = [node.val];
        }
        //right
        helper(node.right);
        if (node.right) column--;        
    }
    helper(root);
    return result;
};

// BFS traversal
/*
[1,2,3,null,null,4,null,5,null,6] - PASS
[3,9,20,null,null,15,7] - PASS

Time Complexity: O(N)
Space COmplexity: O(N)
Runtime: 76 ms, faster than 96.17% of JavaScript online submissions for Binary Tree Vertical Order Traversal.
Memory Usage: 40.5 MB, less than 24.04% of JavaScript online submissions for Binary Tree Vertical Order Traversal.
 */
var verticalOrder = function(root) {
    if (root == null) return [];
    let result = [];
    let minColumn = 0, maxColumn = 0;
    //Queue
    const queue = [[root, 0]];
    //map for column index and items in that columns
    const nodesByColumn = {};
    while (queue.length > 0){
        const [node, column] = queue.shift();
        if (!nodesByColumn[column]) nodesByColumn[column] = [];
        nodesByColumn[column].push(node.val);
        minColumn = Math.min(minColumn, column);
        maxColumn = Math.max(maxColumn, column);
        if (node.left) queue.push([node.left, column - 1]);
        if (node.right) queue.push([node.right, column + 1]);
    }
    console.log(`minColum: ${minColumn}, maxColum: ${maxColumn}`);
    for (let i = minColumn; i <= maxColumn; i++){
        result.push(nodesByColumn[i]);
    }
    return result;
};

//DFS
/*
[] - PASS
[1] - PASS
[1,2] - PASS
[1,2,null,3] - PASS
[1,2,3,null,null,4,null,5,null,6] - PASS
[3,9,20,null,null,15,7] - PASS
[3,9,8,4,0,1,7,null,null,null,2,5] - FAILS
*/
var verticalOrder = function(root) {
    if (root == null) return [];
    const result = [];
    let minColumn = 0, maxColumn = 0;
    const nodesByColumn = {};
    const DFS = (node, row, column) => {
        if (node == null) return;
        if (!nodesByColumn[column]) nodesByColumn[column] = [];
        nodesByColumn[column].push({rowIndex: row, value: node.val});
        minColumn = Math.min(minColumn, column);
        maxColumn = Math.max(maxColumn, column);
        DFS(node.left, row + 1, column - 1);
        DFS(node.right, row + 1, column + 1);
    }
    DFS(root, 0, 0);
    for (let i = minColumn; i <= maxColumn; i++){
        //sort the data by row (i.e, the lower row index will be first) 
        const sortedColumn = nodesByColumn[i].sort((a, b) => a.rowIndex - b.rowIndex);
        columData = [];
        for (let i=0; i < sortedColumn.length; i++){
            columData.push(sortedColumn[i].value);
        }
        result.push(columData);
    }
    return result;
};


