+++
url = '/:section/note-:contentbasename/'
date = '2025-12-04'
updated = '2025-12-04'
title = 'Interfaces'
prefix = 'Go'
layout =  'note'
+++

### Code

```go
package main

import (
	"fmt"
	"math"
)

var Currency = "£"

// 1.
type Describer interface {
	Describe() string
}

2.
func PrintDescription(d Describer) {
	fmt.Println("Description:", d.Describe())
}

type Inventory struct {
	Brand    string
	Cost     float64
	Quantity int
}

type Guitar struct {
	// 3.
	Inventory
	Name      string
	stringNum int
	Electric  bool
}

type Drums struct {
	Inventory
	Name     string
	drumNum  int
	Electric bool
	Cymbals  bool
}

// 4.
func (g Guitar) Describe() string {
	return fmt.Sprintf(
		"From %v, we have %v in stock at %v%v",
		g.Brand,
		g.Quantity,
		Currency,
		g.Cost,
	)
}

// 5.
func (d Drums) Describe() string {
	return fmt.Sprintf(
		"We have %v %v drums in stock from %v%v",
		d.Quantity,
		d.Name,
		Currency,
		d.Cost,
	)
}

// 6.
func (d Drums) ApplyDiscount(discount int) float64 {
	raw := d.Cost / 100 * (100 - float64(discount))
	return math.Round(raw*100) / 100
}

func main() {
	g := Guitar{
		Inventory: Inventory{
			Brand:    "Fender",
			Cost:     799.99,
			Quantity: 5,
		},
		Name:      "Stratocaster",
		stringNum: 6,
		Electric:  true,
	}

	d := Drums{
		Inventory: Inventory{
			Brand:    "Yamaha",
			Cost:     499.99,
			Quantity: 3,
		},
		Name:     "Stage Custom",
		drumNum:  5,
		Electric: false,
		Cymbals:  true,
	}

	// 7.
	PrintDescription(g)
	PrintDescription(d)

	// 8.
	fmt.Printf("Discount applied: from %v%v ", Currency, d.Cost)
	d.Cost = d.ApplyDiscount(30)
	fmt.Printf("to %v%v\n", Currency, d.Cost)
}
```

### Notes

An interface is a type that specifies a set of method signatures, it allows different types to be treated the same when they share common behaviour.

1. It is considered idiomatic Go to name interfaces with the suffix "er", such as "Reader", "Writer", or in this case a Describer. The interface Describer outlines the Describe behaviour, which takes in no parameters and returns a string.
2. The `PrintDescription` function takes in anything that conforms to the Describer interface and then prints the output of the `Describe` method that all Describers must have implemented.
3. Embedding `Inventory` like this instead of `Inventory Inventory` allows you to access the Inventory fields directly through an instance of the Guitar type: `g.Cost` rather than: `g.Inventory.Cost`. This is called struct embedding, and accessing fields and methods through the Guitar type is promoting those fields and methods.
4. Any instance of the Guitar struct has a Describe method on it, this method satisfies the Describer interface, so any Guitar instance is also a Describer.
5. Any instance of the Drums struct has a Describe method on it, this method satisfies the Describer interface, so any Drums instance is also a Describer.
6. It does not matter if a struct also has other methods on it, this `ApplyDiscount` method on an instance of the `Drums` type does not mean that instance cannot be used as a Describer.
7. Since `g` and `d` have a `Describe` method on them, they are Describers and can be used in the `PrintDescription` function which takes in a `Describer`. In Go, types implement interfaces implicitly - you do not need to declare it as long as a type has all the methods an interface requires, it satisfies that interface.
	- This means if we were to add a Piano struct and implement all of the methods needed, we would not need to do this: `fmt.Println(p.Describe())`, instead, we could just implement a `Describe` method on the piano struct, make sure it returns a string and the `Piano` instance will be treated as a `Describer` - which can be called like this: `PrintDescription(p)`.
	- This is very useful when we have functions operating on struct types, rather than having a function that takes in a `Guitar` instance and another that takes in a `Drums` instance, or using generics to handle the different types, or using case statements for different behaviour, we can have functions that take in an interface instead like `PrintDescription` does.
8. As seen above, just because the `Drums` type has the `ApplyDiscount` method, it does not mean it cannot be used as a `Describer`.
	- In Go it is considered best practise to keep interfaces and structs small and only implement what needs to be used across many types as a method on an interface.

### Sources

- [How To Use Interfaces in Go - Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-use-interfaces-in-go)
- [Polymorphism in Go - GeeksforGeeks](https://www.geeksforgeeks.org/go-language/polymorphism-in-golang/)
- [Composition in Go - GeeksforGeeks](https://www.geeksforgeeks.org/go-language/composition-in-golang/)