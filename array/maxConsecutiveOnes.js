var findMaxConsecutiveOnes = function(nums) {
    let currentCount = 0, maxCount = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 1) {
            currentCount++;
        } else {
            if (currentCount > maxCount) maxCount = currentCount;
            currentCount = 0;
        }
        // to handle the case when 1's are at the end
        if (currentCount > maxCount) maxCount = currentCount;
    }
    return maxCount;
};