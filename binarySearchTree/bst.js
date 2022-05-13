/* 
bst = new BST();
bst.put("S", 1);
bst.put("E", 2);
bst.put("X", 3);
bst.put("A", 4);
bst.put("R", 5);
bst.put("C", 6);
bst.put("H", 7);
bst.put("M", 8);
*/
function BST() {
  this.root = null;

  function Node(key, value, N) {
    this.key = key;
    this.value = value;
    this.N = N;
    this.left = null;
    this.right = null;
  }

  this.size = function (node = this.root) {
    if (node == null) return 0;
    return node.N;
  };

  //recursive searching of the key
  this.get = function (key, node = this.root) {
    // Return value associated with key in the subtree rooted at node;
    // return null if key not present in subtree rooted at node.
    if (node == null) return null;
    console.log(
      `key: ${key}, node key: ${node.key}, node value: ${node.value}`
    );
    // key is same as root
    if (key == node.key) return node.value;
    // key is less than root
    else if (key < node.key) return this.get(key, node.left);
    // key is greater than root
    else if (key > node.key) return this.get(key, node.right);
  };

  this.put = function (key, value) {
    // Search for key. Update value if found; grow table if new.
    this.root = this.putWithNode(key, value, this.root);
  };

  this.putWithNode = function (key, value, node) {
    //node doesn't exist, then create new node and return
    if (node == null) return new Node(key, value, 1);
    if (key < node.key) {
      node.left = this.putWithNode(key, value, node.left);
    } else if (key > node.key) {
      node.right = this.putWithNode(key, value, node.right);
    } else {
      node.value = value;
    }
    //update the node size
    node.N = 1 + this.size(node.left) + this.size(node.right);
    return node;
  };

  this.delete = function (key) {
    this.root = this.deletWithNode(key, this.root);
  };

  this.deletWithNode = function (key, node) {
    if (key == null) return null;
    if (key < node.key) node.left = this.deletWithNode(key, node.left);
    else if (key > node.key) node.right = this.deletWithNode(key, node.right);
    else {
      if (node.right == null) return node.left;
      if (node.left == null) return node.right;
      let temp = node;
      node = this.min(node.rigth);
      node.right = this.deletMinWithNode(temp.right);
      node.left = temp.left;
    }
    node.N = 1 + this.size(node.left) + this.size(node.right);
    return node;
  };

  this.deleteMin = function () {
    this.root = this.deletMinWithNode(this.root);
  };

  this.deletMinWithNode = function (node) {
    if (node.left == null) return node.right;
    node.left = this.deletMinWithNode(node.left);
    node.N = 1 + this.size(node.left) + this.size(node.right);
    return node;
  };

  /**
   * If the left link of the root is null, the smallest key in a BST is the key at the root;
   * if the left link is not null, the smallest key in the BST is the smallest key in the subtree
   * rooted at the node referenced by the left link.
   * @param {*} node
   */
  this.min = function (node = this.root) {
    // node itself is null
    if (node == null) return null;
    if (node.left == null) {
      return node.key;
    } else {
      return this.min(node.left);
    }
  };

  this.max = function (node = this.root) {
    // node itself is null
    if (node == null) return null;
    if (node.right == null) {
      return node.key;
    } else {
      return this.max(node.right);
    }
  };

  /* 
        If a given key key is less than the key at the root of a BST, then the floor 
        of key (the largest key in the BST less than or equal to key) must be in the 
        left subtree. 
        If key is greater than the key at the root, then the floor of key 
        could be in the right subtree, but only if there is a key smaller than or equal
        to key in the right subtree; 
        if not (or if key is equal to the key at the root), then the key at the root is 
        the floor of key. 
        Again, this description serves both as the basis for the recursive floor() method
        and for an in- ductive proof that it computes the desired result. 
        Interchanging right and left (and less and greater) gives ceiling().    
    */
  this.floor = function (key) {
    const node = this.floorWithNode(key, this.root);
    if (node == null) return null;
    return node.key;
  };

  this.floorWithNode = function (key, node) {
    console.log(`key: ${key}`);
    console.log(node);
    if (node == null) return null;
    if (node.key === key) return node;
    else if (key < node.key) return this.floorWithNode(key, node.left);
    const rightNodeFloor = this.floorWithNode(key, node.right);
    if (rightNodeFloor != null) return rightNodeFloor;
    return node;
  };

  this.ceiling = function () {
    const node = this.ceilingWithNode(key, this.root);
    if (node == null) return null;
    return node.key;
  };

  this.ceilingWithNode = function (key, node) {
    console.log(`key: ${key}`);
    console.log(node);
    if (node == null) return null;
    if (node.key === key) return node;
    else if (key < node.key) return this.ceilingWithNode(key, node.right);
    const rightNodeFloor = this.ceilingWithNode(key, node.left);
    if (rightNodeFloor != null) return rightNodeFloor;
    return node;
  };
}

// *************** Using class syntax (requires Node class to be created separately)
class BST {
  constructor() {
    this.root = null;
  }

  size(node = this.root) {
    if (node == null) return 0;
    return node.N;
  }

  //recursive searching of the key
  get(key, node = this.root) {
    // Return value associated with key in the subtree rooted at node;
    // return null if key not present in subtree rooted at node.
    if (node == null) return null;
    console.log(
      `key: ${key}, node key: ${node.key}, node value: ${node.value}`
    );
    // key is same as root
    if (key == node.key) return node.value;
    // key is less than root
    else if (key < node.key) return this.get(key, node.left);
    // key is greater than root
    else if (key > node.key) return this.get(key, node.right);
  }

  put(key, value) {
    // Search for key. Update value if found; grow table if new.
    this.root = this.putWithNode(key, value, this.root);
  }

  putWithNode(key, value, node) {
    //node doesn't exist, then create new node and return
    if (node == null) return new Node(key, value, 1);
    if (key < node.key) {
      node.left = this.putWithNode(key, value, node.left);
    } else if (key > node.key) {
      node.right = this.putWithNode(key, value, node.right);
    } else {
      node.value = value;
    }
    //update the node size
    node.N = 1 + this.size(node.left) + this.size(node.right);
    return node;
  }

  /**
   * If the left link of the root is null, the smallest key in a BST is the key at the root;
   * if the left link is not null, the smallest key in the BST is the smallest key in the subtree
   * rooted at the node referenced by the left link.
   * @param {*} node
   */
  min(node = this.root) {
    // node itself is null
    if (node == null) return null;
    if (node.left == null) {
      return node.key;
    } else {
      return this.min(node.left);
    }
  }

  max(node = this.root) {
    // node itself is null
    if (node == null) return null;
    if (node.right == null) {
      return node.key;
    } else {
      return this.max(node.right);
    }
  }

  /* 
        If a given key key is less than the key at the root of a BST, then the floor 
        of key (the largest key in the BST less than or equal to key) must be in the 
        left subtree. 
        If key is greater than the key at the root, then the floor of key 
        could be in the right subtree, but only if there is a key smaller than or equal
        to key in the right subtree; 
        if not (or if key is equal to the key at the root), then the key at the root is 
        the floor of key. 
        Again, this description serves both as the basis for the recursive floor() method
        and for an in- ductive proof that it computes the desired result. 
        Interchanging right and left (and less and greater) gives ceiling().    
    */
  floor(key) {
    const node = this.floorWithNode(key, this.root);
    if (node == null) return null;
    return node.key;
  }

  floorWithNode(key, node) {
    console.log(`key: ${key}`);
    console.log(node);
    if (node == null) return null;
    if (node.key === key) return node;
    else if (key < node.key) return this.floorWithNode(key, node.left);
    const rightNodeFloor = this.floorWithNode(key, node.right);
    if (rightNodeFloor != null) return rightNodeFloor;
    return node;
  }

  // floor(key, node = this.root) {
  //     console.log(`key: ${key}`);
  //     console.log(node);
  //     if (node == null) return null;
  //     if (node.key === key) return node.key;
  //     else if (key < node.key) return this.floor(key, node.left);
  //     const rightNodeFloor = this.floor(key, node.right);
  //     if (rightNodeFloor != null) return rightNodeFloor.key;
  //     return node.key;
  // }

  ceiling() {
    const node = this.ceilingWithNode(key, this.root);
    if (node == null) return null;
    return node.key;
  }

  ceilingWithNode(key, node) {
    console.log(`key: ${key}`);
    console.log(node);
    if (node == null) return null;
    if (node.key === key) return node;
    else if (key < node.key) return this.ceilingWithNode(key, node.right);
    const rightNodeFloor = this.ceilingWithNode(key, node.left);
    if (rightNodeFloor != null) return rightNodeFloor;
    return node;
  }
}

//node class
//left
//right
//key
//value
class Node {
  constructor(key, value, N) {
    this.key = key;
    this.value = value;
    this.N = N;
    this.left = null;
    this.right = null;
  }
}

/*
    delete() {

    }

    select() {

    }

    rank() {

    }


    deleteMin() {

    }

    deleteMax() {

    }

    keys() {

    }

        //this approach is not working as, the reference  this.root is not getting the updated value
    put4(key, value, node = this.root) {
        //node doesn't exist, then create new node and return
        if (node == null) {
            node = new Node(key, value, 1);
            console.log(this);
            return node;
        };
        if (key < node.key) {
            node.left = this.put4(key, value, node.left);
        } else if (key > node.key) {
            node.right = this.put4(key, value, node.right);
        } else {
            node.value = value;
        }
        //update the node size
        node.N = 1 + this.size(node.left) + this.size(node.right);
        console.log(node);
        return node;
    }

*/
