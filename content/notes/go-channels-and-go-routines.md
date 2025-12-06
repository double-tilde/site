+++
url = '/:section/note-:contentbasename/'
date = '2025-12-05'
updated = '2025-12-05'
title = 'Channels and Go Routines'
prefix = 'Go'
layout =  'note'
+++

### Code

```go
package main

import (
	"fmt"
	"math/rand"
	"sync"
	"time"
)

// 1.
func printNums(str string) time.Duration {
	var total time.Duration
	for i := range 100 {
		wait := time.Duration(10+rand.Intn(20)) * time.Millisecond
		time.Sleep(wait)
		fmt.Println(str, i, wait)
		total += wait
	}

	return total
}

// 2.
func printNumsAlt(str string, wg *sync.WaitGroup, ch chan<- time.Duration) {
	defer wg.Done()

	var total time.Duration
	for i := range 100 {
		wait := time.Duration(10+rand.Intn(20)) * time.Millisecond
		time.Sleep(wait)
		fmt.Println(str, i, wait)
		total += wait
	}

	ch <- total
}

func main() {
	// 3.
	startNow1 := time.Now()
	t1 := printNums("first call")
	t2 := printNums("second call")
	fmt.Printf("first total: %vms ", t1.Milliseconds())
	fmt.Printf("second total: %vms\n", t2.Milliseconds())

	startNow1Since := time.Since(startNow1).Milliseconds()
	fmt.Printf("this operation took: %vms\n", startNow1Since)

	// 4.
	ch := make(chan time.Duration, 2)

	// 5.
	startNow2 := time.Now()
	var wg sync.WaitGroup
	wg.Add(1)
	go printNumsAlt("first go routine", &wg, ch)
	wg.Add(1)
	go printNumsAlt("second go routine", &wg, ch)

	// 6.
	fmt.Println("this message will be seen with the go routines")

	// 7.
	go func() {
		wg.Wait()
		close(ch)
		fmt.Println("this message will be seen when all routines are done")
	}()

	// 8.
	var duration time.Duration
	for d := range ch {
		duration += d
		fmt.Println("Received:", d.Milliseconds())
	}

	// 9.
	startNow2Since := time.Since(startNow2).Milliseconds()
	fmt.Printf("this operation took: %vms\n", startNow2Since)
	fmt.Printf("one go routine %vms vs many go routines %vms\n", startNow1Since, startNow2Since)

	// fmt.Printf("first total: %vms\n", t1.Milliseconds())
	// fmt.Printf("second total %vms\n", t2.Milliseconds())
}
```

### Notes

>***quote*** "Concurrency is about dealing with lot of things at once, Parallelism is about doing a lot of things at once" - Rob Pike

1. These functions simulate API calls and how they can reliably take a bit of time to respond if all is running normally.
2. This function does not return anything and instead puts the results in a channel
3. Calling the functions in the main go routine process is the usual way to call functions, Go always has at least one go routine running, this call to `printNums` has to finish before the second call can start and the data can be processed. The `startNow1` variable will show that the total amount of time it takes to run these two functions is equal to $t1 + t2$.
4. This bi-directional channel gets results from the functions that are going to be called in different go routines, it accepts `time.Duration` values and has a buffer size of 2 which means it can collect 2 results and then it will be full. In the function we use the channel, it is set to send-only which help keep the use of the channel in that function clear.
5. Using separate go routines you can run functions that would normally block the execution of further functions - we create a `WaitGroup` which allows us to track how many go routines we have by using the `wg.Add` method.
	- Along with `wg.Wait` which tells the main go routine to wait until the wait group is back down to 0. `printNumsAlt` has a defer `wg.Done` method which is what removes 1 from the wait group, when all of the go routines have finished, the rest of the program can execute.
	- The `startNow2` variable will show the total amount of time it takes to run - these two functions will be equal to just above $(t3 + t4) / 2$ on my computer.
6. Since this message comes before the `Wait` method, it will also be called as the other go routines are called, since those routines are no longer running on the main go routine anymore so there is no reason for it not to run. 
	- It also shows why the `Wait` method call is needed, if there were only a few quick things left to do, the main go routine would finish and close before the other go routines had finished and their values would be lost, the other message waits until the `Wait` method is called before executing.
7. This anonymous function is also a go routine which waits for all of the other go routines to finish and closes the channel, the `Wait` method will be called when the wait group is back down to 0 and then the channel will close.
8. To get the results from the channel, we can put them into variables like normal: `t3 := <-ch` and `t4 := <-ch` and then print them: `fmt.Printf("first go routine: %vms ", t3.Milliseconds())` and `fmt.Printf("second go routine: %vms\n", t4.Milliseconds())`. Or we can loop over the channel itself and get the values out, which can be safer if the channel grows in size as the loop will take care of this change for us and put the results in one variable.
9. On average the first two function calls to `printNum`s takes twice as long as the calls to `printNumsAlt` because Go can utilise concurrency and parallelism to complete the tasks together. Your CPU will change how Go does this, sometimes it will use concurrency which can be thought of as one person cooking and switching between tasks, they might start boiling the water, then chop some vegetables, then put some food in the oven, then go back to the water and put the vegetables in the pan. Parallelism can be thought of as many cooks in a kitchen doing separate tasks. Both have their pros and cons, if one cook is waiting for another to finish a task, that can actually take longer than one person doing all the tasks if they are efficient, it all depends on the tasks.

### Sources

- [Concurrency is not Parallelism - Rob Pike](https://www.youtube.com/watch?v=oV9rvDllKEg)