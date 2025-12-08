+++
url = '/:section/note-:contentbasename/'
date = '2025-11-30'
updated = '2025-11-30'
title = 'Go: Generics'
layout =  'note'
+++

### Code

```go
package main

import (
	"fmt"
)

// 1.
type (
	dollars float64
	euros   float32
	pounds  float64
)

// 2.
type Adder[T any] interface {
	Symbol() string
	Add(T) T
}

// 3.
func (d dollars) Symbol() string { return "$" }
func (e euros) Symbol() string   { return "€" }
func (p pounds) Symbol() string  { return "£" }

// 4.
func (d dollars) Add(o dollars) dollars { return d + (o / 100 * 80) }
func (e euros) Add(o euros) euros       { return e + o }
func (p pounds) Add(o pounds) pounds    { return p + o }

// 5.
func sum[T Adder[T]](values []T) T {
	if len(values) == 0 {
		var zero T
		return zero
	}

	var total T
	for _, v := range values {
		total = total.Add(v)
	}

	return total
}

// 6.
func printTotal[T Adder[T]](total T) {
	switch v := any(total).(type) {
	case dollars:
		fmt.Printf("Total: %s%.2f\n", total.Symbol(), dollars(v))
	case euros:
		fmt.Printf("Total: %s%.2f\n", total.Symbol(), euros(v))
	case pounds:
		fmt.Printf("Total: %s%.2f\n", total.Symbol(), pounds(v))
	default:
		fmt.Printf("Total: %s%v\n", total.Symbol(), total)
	}
}

// 7.
func bonus[T ~float64 | ~float32 | ~int](t T) T {
	return t + (t / 100 * 10)
}

func main() {
	// the sum and printTotal functions work on dollars
	dVals := []dollars{12.30, 5.70, 3.00}
	dSum := sum(dVals)
	printTotal(dSum)

	// the sum and printTotoal functions work on euros
	eVals := []euros{7.25, 2.75}
	eSum := sum(eVals)
	printTotal(eSum)
	eSum = bonus(eSum)
	printTotal(eSum)

	// the sum and printTotoal functions work on pounds
	pVals := []pounds{4.50, 1.20, 0.80}
	pSum := sum(pVals)
	printTotal(pSum)
	pSum = bonus(pSum)
	printTotal(pSum)

	// 8.
}
```

### Notes

Generics can be useful in Go but they seem to solve a similar problem to interfaces, usually it's a good idea to use them together where their strengths are. Generics are good for operations on maps and slices where operations will be the same like what happens in the sum function in the code. Interfaces are useful when different types need different implementations of the same methods, for example with the Add method in the code we could imagine that for one currency we apply a tax, we could add this in the implementation of one of these methods and leave the other methods unchanged.

1. Here there are  some type aliases for floats so we can differentiate between the different currencies.
2. We have set up an interface to describe the adding behaviour - it also handles the symbol for the currency we are currently using which is used for printing. On this interface we have the `T any` syntax which basically says the `Add` function can use any type as a parameter and return any type - we apply the constraints later in the program by applying the methods to our types and through the switch statements.
3. Each type is implementing the functions to be an Adder.
4. Interfaces are useful here as we are applying a tax to one of the currencies and not the others, this is where interfaces work best.
5. The sum function takes in a slices of Adders, this means dollars, euros and pounds can all be used in the sum function and we do not need to make a function for each called something like `sumDollars`, `sumEuros`, `sumPounds`, etc. This also means we can add another currency down the line like the krona, implement the Adder functions and then this currency will work, making the program extensible.
6. For printing the total, we use type casting to check the underlying type of the Adder being passed into this function, then for each type we print the symbol of that total and then the amount, we cast the type of the amount mostly so the compiler does not complain about the decimal printing, by using `dollar(v)` we are telling the compiler that `v` has an underlying type of float.
7. This function adds a bonus, it takes in type T which can be a `float` or an `int`, the tilde means that you can use type aliases as well, which means the currencies can be used in this function.
8. This code has been using `T` for the generics which stands for "type". The other common generic symbols are `K` and `V` for "key" and "value" in maps. Sometimes `S` is used for slices too.

### Sources

- [Generics - Go By Example](https://gobyexample.com/generics)
- [Generics - Go Blog](https://go.dev/doc/tutorial/generics)
- [Generics Explained - Code With Ryan](https://www.youtube.com/watch?v=WpTKqnfp5dY)
