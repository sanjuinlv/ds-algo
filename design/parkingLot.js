/** 
 * Your ParkingSystem object will be instantiated and called as such:
 * var obj = new ParkingSystem(big, medium, small)
 * var param_1 = obj.addCar(carType)
 */
/**
 * @param {number} big
 * @param {number} medium
 * @param {number} small
 */
/* 
Runtime: 140 ms, faster than 71.83% of JavaScript online submissions for Design Parking System.
Memory Usage: 45.9 MB, less than 53.33% of JavaScript online submissions for Design Parking System.
*/
var ParkingSystem = function(big, medium, small) {
    this.slotMap = new Map();
    this.slotMap.set(1, big);    
    this.slotMap.set(2, medium);
    this.slotMap.set(3, small);
};

/** 
 * @param {number} carType
 * @return {boolean}
 */
ParkingSystem.prototype.addCar = function(carType) {
    const slotCount =  this.slotMap.get(carType);
    if (slotCount > 0) {
        this.slotMap.set(carType, slotCount-1);
        return true;
    }
    return false;
};

/* 
Without using Map
Runtime: 144 ms, faster than 54.19% of JavaScript online submissions for Design Parking System.
Memory Usage: 46.2 MB, less than 17.42% of JavaScript online submissions for Design Parking System.
*/
var ParkingSystem = function(big, medium, small) {
    this.slots = [big, medium, small];
};

/** 
 * @param {number} carType
 * @return {boolean}
 */
ParkingSystem.prototype.addCar = function(carType) {
    return this.slots[carType-1]-- > 0;
};

