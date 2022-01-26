/*
Bitwise operations:
XOR (^): returns a 1 in each bit position for which the corresponding bits
 of either but not both operands are 1s.
The result in each position is 1 if only one of the bits is 1, but will be 0
 if both are 0 or both are 1.

a | b | a ^ b
---------------
0 | 0 |  0
0 | 1 |  1
1 | 0 |  1
1 | 1 |  0

- XOR of zero and a bit results in that bit
    0 XOR x = x
- XOR of number with itself is zero 
x ^ 0s  = x
x ^ x  = 0
x ^ 1s = ~x

XOR of one and a bit flips that bit
1 XOR x = 1 - x

AND (&): Returns a 1 in each bit position for which the corresponding bits
 of both operands are 1s.

a | b | a & b
---------------
0 | 0 |  0
0 | 1 |  1
1 | 0 |  0
1 | 1 |  1

x & 0s = 0
x & 1s = x
x & x = x

OR (|): Returns a 1 in each bit position for which the corresponding bits 
of either or both operands are 1s.
a | b | a & b
---------------
0 | 0 |  0
0 | 1 |  1
1 | 0 |  1
1 | 1 |  1

x | 0s = x
x | 1s = 1s
x | x = x

*/
//2's compliment 
https://www.tutorialspoint.com/two-s-complement

/* 2's compliment of number
1. flip the bits
2. add 1 to LSB (least significant bit).
E.g. number is 9.
binary        => 1001
flip the bits => 0110
add 1:        => 0111
*/