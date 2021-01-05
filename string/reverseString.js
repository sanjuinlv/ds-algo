var reverseString = function(s) {
    const N = s.length;
    for (let i = 0; i < parseInt(N/2); i++){
        let temp = s[i];
        s[i] = s[N-1-i];
        s[N-1-i] = temp;
    }
};

//Using two pointer
var reverseString = function (s) {
    let left = 0, right = s.length - 1, temp;
    while (left < right) {
        temp = s[left];
        s[left++] = s[right];
        s[right--] = temp;
    }
};
