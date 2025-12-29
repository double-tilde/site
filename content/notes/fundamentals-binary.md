+++
url = '/:section/note-:contentbasename/'
date = '2025-12-29'
updated = '2025-12-29'
title = 'Fundamentals: Binary'
layout =  'note'
+++

### Notes

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
- This feels very limiting to begin with, but we have the same tools available in base 2 that we have in base 10 when we run out of symbols, we add more digits so that we can represent bigger numbers. When we write in base 10, the numbers in the 1s column change every time we increase by 1, the numbers in the 10s column change every time we reach a new multiple of 10, and so on. This is still true for binary numbers, the number in the 1s column flips back and fourth for odd and even numbers, 1 for odd, 0 for even. The numbers in the 10s column flips back and fourth every time we **reach a new multiple of 2** - not 10, because in binary the symbol 10 represents 2 in our usual decimal system.
- It is common to have leading 0s in binary systems, to show the total number of digits or bits you have available on a given machine. In a 4 bit system, you can represent up to 16 different numbers. In an 8 bit system, you can represent up to 256 different numbers. Most personal computers are 64 bit, which means they can represent 18,446,744,073,709,552,000 (over 18 quintillion) different numbers (this is a theoretical maximum, other hardware limitations come in to play here). Which numbers you decide to represent with these available bits depends on whether you need negative numbers or not, but in this example we are just representing positive numbers.

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
- Sometimes we do write numbers in other system too. In CSS, we can write hexadecimal numbers to represent colours in the `#RRGGBB` format, hexadecimal has 16 unique symbols: $0 1 2 3 4 5 6 7 8 9 A B C D E F$. This is useful because each of these primary colours can be represented in 256 unique ways, and $16^2 = 256$. So the following colour `#6a5acd` in decimal would be `RGB(106, 90, 205)` or in binary: $01101010$ $01011010$ $11001101$. You can see that hexadecimal is more concise and easier to intuit in this situation. Other common number formats include octal for file permissions.
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

### Sources

- [Code: The Hidden Language of Computer Hardware and Software 2e - Charles Petzold](https://codehiddenlanguage.com/)
