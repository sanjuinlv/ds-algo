/* Bag si similar ot Stack LIFO() */
/* 
bag = new Bag()
bag.add(1)
for(let val of bag) {
    console.log(`val: ${val}`);
}
*/
function Bag() {
    this.first = null;
    this.N = 0;

    function Node(item) {
        this.item = item;
        this.next = null;
    }

    this.add = function(item) {
        let oldFirst = this.first;
        this.first = new Node(item);
        this.first.next = oldFirst;
        this.N++;
    }

    this.size = function() {
        return this.N;
    }

    //Iterator implementation
    this[Symbol.iterator] = function() {
        this.current = this.first;
        return this;
    }

    //The next method which will be called by iterator 
    this.next = function() {
        if (this.current != null) {
            const value = this.current.item;
            this.current = this.current.next;
            return {done: false, value: value}
        } else {
            return {done: true};
        }
    }
     
    /**
     * @override toString of object prototype
     */
    this.toString = function() {
        let nodes = ""
        for (let v of this){
            console.log(v);
            nodes += `v: ${v}\n`;
        }
        return nodes;
    }
}