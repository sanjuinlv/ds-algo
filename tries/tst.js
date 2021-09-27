/*
tri = new TST();

tri.put("she", 0);
tri.put("sells", 1);
tri.put("sea", 2);
tri.put("shells", 3);
tri.put("by", 4);
tri.put("the", 5);

tri.get("sea"); // 2
tri.put("sea", 6);
tri.get("sea"); // 6
tri.put("shore", 6);

 */
function TST() {
  this.root = null;

  function Node() {
    this.c = null;
    this.val = null;
    this.left = null;
    this.right = null;
    this.middle = null;
  }

  this.get = function (key) {
    const node = this.getByNode(key, this.root, 0);
    if (node == null) return null;
    return node.val;
  };

  this.getByNode = function (key, x, d) {
    if (x == null) return null;
    const c = key.charAt(d);
    if (c < x.c) return this.getByNode(key, x.left, d);
    else if (c > x.c) return this.getByNode(key, x.right, d);
    //match of character but not not complete key
    else if (d < key.length - 1) return this.getByNode(key, x.middle, d + 1);
    //match found for complete key length
    else return x;
  };

  this.put = function (key, value) {
    this.root = this.putByNode(key, value, this.root, 0);
  };

  this.putByNode = function (key, value, x, d) {
    const c = key.charAt(d);
    console.log(`c: ${c}`);
    if (x == null) {
      x = new Node();
      x.c = c;
    }
    if (c < x.c) x.left = this.putByNode(key, value, x.left, d);
    else if (c > x.c) x.right = this.putByNode(key, value, x.right, d);
    //match of character but not not complete key
    else if (d < key.length - 1)
      x.middle = this.putByNode(key, value, x.middle, d + 1);
    else x.val = value;
    return x;
  };
}
