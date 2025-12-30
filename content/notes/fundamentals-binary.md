+++
url = '/:section/note-:contentbasename/'
date = '2025-12-29'
updated = '2025-12-29'
title = 'Fundamentals: Binary'
layout =  'note'
+++

## Notes

- We are used to counting in base 10, where we have 10 unique symbols to represent numbers. From 0 to 9 we repeat no symbols, and then when we get to 10 itself we reuse 1 and 0 to create a larger number with 2 digits instead of 1. We keep doing this whenever we reach a multiple of 10, this happens when we go from 99 to 100 for example. This process repeats each time we reach a power of 10 ($10^0 = 1$, $10^1 = 10$, $10^2 = 100$, $10^3 = 1000$, etc).
- Base 10 or decimal comes naturally to us because we have 10 fingers and this is how we learn to count. That does not mean it is the only way to do mathematics, numbers can be represented in all kinds of ways. If we only had 4 fingers, we may have created a number system around base 4 or Quaternary, where we have 4 unique numbers: 0-3. When we reach what would be represented as 4 in decimal systems, we would represent this as 10, converting from base 10 to base 4 would look like this:

| Base 10 / Decminal | Base 4 / Quaternary |
| ------------------ | ------------------- |
| $0$                | $0$                 |
| $1$                | $1$                 |
| $2$                | $2$                 |
| $3$                | $3$                 |
| $4$                | $10$                |
| $5$                | $11$                |
| $6$                | $12$                |
| $7$                | $13$                |
| $8$                | $20$                |
| $9$                | $21$                |
| $10$               | $22$                |

- Computers, or electrical systems in general, do not have an easy way to work with base 10 or base 4 naturally. At the level of the circuit board, only two states exist, 1 and 0, or on and off. Two states means computers work best with 2 unique symbols to match these states, base 2 is what we need. We can convert any number from base 10 to base 2, we use the same technique that we used to convert base 10 to base 4, but with even less symbols available to us. We only have 0 and 1 this time.
- This feels very limiting to begin with, but we have the same tools available in base 2 that we have in base 10 when we run out of symbols, we add more digits so that we can represent bigger numbers. When we write in base 10, the digit in the 1s column change every time we increase by 1, the digit in the 10s column change every time we reach a new multiple of 10, and so on. This is still true for binary numbers, the digit in the 1s column flips back and fourth for odd and even numbers, 1 for odd, 0 for even. The digit in the 10s column flips back and fourth every time we **reach a new multiple of 2** - not 10, because in binary the symbol 10 represents 2 in our usual decimal system.
- It is common to have leading 0s in binary systems, to show the total number of digits or bits you have available on a given machine. In a 4 bit system, you can represent up to 16 different numbers. In an 8 bit system, you can represent up to 256 different numbers. Most personal computers are 64 bit, which means they can represent 18,446,744,073,709,552,000, over 18 quintillion, different numbers (this is a theoretical maximum, other hardware limitations come in to play here). Which numbers you decide to represent with these available bits depends on whether you need negative numbers or not, but in this example we are just representing positive numbers.

| Base 10 / Decimal | Base 2 / Binary (4 bit) |
| ----------------- | ----------------------- |
| $0$               | $0000$                  |
| $1$               | $0001$                  |
| $2$               | $0010$                  |
| $3$               | $0011$                  |
| $4$               | $0100$                  |
| $5$               | $0101$                  |
| $6$               | $0110$                  |
| $7$               | $0111$                  |
| $8$               | $1000$                  |
| $9$               | $1001$                  |
| $10$              | $1010$                  |
| $11$              | $1011$                  |
| $12$              | $1100$                  |
| $13$              | $1101$                  |
| $14$              | $1110$                  |
| $15$              | $1111$                  |

- When we write programs, we get to use the familiar decimal system, compilers convert the programs we write in English with base 10 and convert them into binary machine code (some compilers convert the code to byte code or intermediate representation first, but it becomes machine code eventually).
- Sometimes we do write numbers in other systems too. In CSS, we can write hexadecimal numbers to represent colours in the `#RRGGBB` format, hexadecimal has 16 unique symbols: $0 1 2 3 4 5 6 7 8 9 A B C D E F$. This is useful because each of these primary colours can be represented in 256 unique ways, and $16^2 = 256$. So the following colour `#6a5acd` in decimal would be `RGB(106, 90, 205)` or in binary: $01101010$ - $01011010$ - $11001101$. You can see that hexadecimal is more concise and easier to intuit in this situation.
- Other common number formats include octal for file permissions. You can set file permissions by running the command `chmod 764 filename`. The first digit 7 means the owner of the file can read, write and execute the file. This is because $read = 4$, $write = 2$ and $execute = 1$, adding these together makes 7. The second digit 6 means a group of users set by the admin can read and write to the file ($4+2=6$) and the last digit 4 means all other users can read the file only. This is useful because the largest number that can be represented in a 3 digit octal system is 777 (this number gives read, write and execute permissions to everyone on a Linux machine), if you try and enter 778 or higher, the command won't work.
- Eventually everything on a computer (numbers, strings, images, videos, audio and more) is represented in the binary format. Often, a programming language has an easy way for you to convert your numbers from decimal to other formats, in Go for example:

```go
num1, num2 := 255, 64576

fmt.Printf("Decimal: num1: %d num2: %d\n", num1, num2)
fmt.Printf("Binary: num1: %.16b num2: %.16b\n", num1, num2)
fmt.Printf("Octal: num1: %o num2: %o\n", num1, num2)
fmt.Printf("Hexadecimal: num1: %X num2: %X\n", num1, num2)

// Decimal: num1: 255 num2: 64576
// Binary: num1: 0000000011111111 num2: 1111110001000000
// Octal: num1: 377 num2: 176100
// Hexadecimal: num1: FF num2: FC40
```

## Conversion

- Converting decimal numbers to binary numbers again maps neatly onto our understanding of decimal numbers. When you disect the number 126, you have 1 hundred, 2 tens and 6 ones. This is how we would naturally break the number down into its parts, each time we reach a new power of 10, we add another digit column and say how many of them we need.
- We do the same thing in binary but with powers of 2, each digit or bit is created when we reach a new power of 2 instead of a new power of 10, starting with $2^0$, then $2^1$, $2^2$, $2^3$, etc. The only difference in binary is rather than being able to specify the amount of 16's we need or the amount of 4's we need, we can either have 1 of them or none at all.

| Exponent       | $2^7$ | $2^6$ | $2^5$ | $2^4$ | $2^3$ | $2^2$ | $2^1$ | $2^0$ |
| -------------- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| Decimal Number | $128$ | $64$  | $32$  | $16$  | $8$   | $4$   | $2$   | $1$   |

- We know we won't need any number above 126 to make parts of 126, so we won't need a 128 in this equation. We also know 126 is even, so the bit in the right column (the least significant bit) must be a 0. Other than that, we must compose 126 out of the remaining bits, remembering we only have 1 of each.
- We start from the left, if the bit we are on is less than or equal to our number, we use it and subtract it from the total.
	- $64 <= 126$ so we use it and subtract it.
	- $32 <= 62$ (our new total) so we use it and subtract it.
	- $16 <= 30$ so we use it and subtract it.
	- $8 <= 14$ so we use it and subtract it.
	- $4 <= 6$ so we use it and subtract it.
	- $2 <= 2$ so we use it and subtract it.
	- $1 > 0$ so we do not use it.
- To make the number 126 we need the bits representing 64, 32, 16, 8, 4 and 2. To relate this back to the binary representation, we have:

$$
(0 \times 2^7) + (1 \times 2^6) + (1 \times 2^5) + (1 \times 2^4) + (1 \times 2^3) + (1 \times 2^2) + (1 \times 2^1) + (0 \times 2^0)
$$
 
 - If you look at the 0s and 1s in this equation, they match perfectly the 0s and 1s for 126 represented in 8 bit binary: $01111110$
 - You can make any number this way (in this example, any positive integer under 256, this would be represented as an unsigned 8 bit integer in a programming language), some more examples:

$$\begin{align}
40 = 00101000\\
255 = 11111111\\
1 = 00000001\\
99 = 01100011\\
127 = 01111111\\
128 = 10000000\\
129 = 10000001\\
\end{align}
$$

### Sources

- [Code: The Hidden Language of Computer Hardware and Software 2e - Charles Petzold](https://codehiddenlanguage.com/)