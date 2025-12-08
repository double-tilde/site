+++
url = '/:section/note-:contentbasename/'
date = '2025-12-07'
updated = '2025-12-07'
title = 'Go: Worker Pools'
layout =  'note'
+++

### Code

```go
package main

import (
	"fmt"
	"runtime"
	"sync"
	"sync/atomic"
	"time"
)

var processed int64

// isPrime iterates from 2 up to the square root of n, if n is divisible by i,
// then n is not prime
func isPrime(n int) bool {
	if n < 2 {
		return false
	}
	for i := 2; i*i <= n; i++ {
		if n%i == 0 {
			return false
		}
	}
	return true
}

// 1.
func worker(id int, jobs <-chan int, results chan<- bool, wg *sync.WaitGroup) {
	defer wg.Done()
	for j := range jobs {
		prime := isPrime(j)
		results <- prime
		// print occasionally just for some logging, this part is not integral to
		// the program but it keeps track of all workers, using the atomic package
		// to stop race conditions where two goroutines try to increment at the
		// same time, making this information incorrect
		count := atomic.AddInt64(&processed, 1)
		if count%50000 == 0 || count%75000 == 0 {
			fmt.Printf("Worker %d: processed %d jobs\n", id, count)
		}
	}
}

// 2.
func getWorkerCount() int {
	numCPU := runtime.NumCPU()
	workers := numCPU / 2
	workers = max(1, min(workers, 8))
	return workers
}

func main() {
	// 3.
	numWorkers := getWorkerCount()

	// 4.
	numJobs := 2_000_000

	fmt.Printf("Running with %d workers on %d CPUs\n", numWorkers, runtime.NumCPU())

	jobs := make(chan int, 1000)
	results := make(chan bool, 1000)
	var wg sync.WaitGroup

	// see how long the task takes
	start := time.Now()

	// 5.
	go func() {
		for j := 1; j <= numJobs; j++ {
			jobs <- j
		}
		close(jobs)
	}()

	// 6.
	for w := range numWorkers {
		wg.Add(1)
		go worker(w, jobs, results, &wg)
	}

	// 7.
	go func() {
		wg.Wait()
		close(results)
	}()

	// 8.
	countPrimes := 0
	for r := range results {
		if r {
			countPrimes++
		}
	}

	elapsed := time.Since(start)
	fmt.Printf("Found %d primes in %s\n", countPrimes, elapsed)
}
```

### Notes

The worker pool pattern is used to get a number of workers to do jobs in Go. In this small program the number of workers is calculated by how many logical CPUs you have available which can help balance the efficiency of a program but also make sure the program is not overwhelming to an older CPU.

1. This is the worker function to hand out jobs, it takes the current worker, the jobs we need to do from the jobs channel, and the results channel we are putting the results in, The job in this case is running the `isPrime` function. A pointer to the wait group is also passed in to keep track of all of these go routines when each function is finished, the `Done` method is called.
2. This function does a few things to determine how many logical CPUs the workers should use. Firstly, it gets the number of logical CPUs, on my computer that number is is 16 because I have 8 cores and 16 threads on a hyper-threaded CPU, but this number could be 1, 16, 64, etc - for most CPUs on personal computers in 2025 it will be 4-16. To use a reasonable amount of logical CPUs for the workers, we divide this number by 2, we then set that max amount of CPU cores to be 8 and the min to 1, so if my CPU had 16 cores and 32 threads, it would not use 16 workers, it would max out at 8, but if I had a 1 core non-hyper-threaded CPU, it would use that 1 core.
3. For a CPU bound tasks, the optimal amount of workers tends to be close to the number of physical cores, not threads, so for calculating prime, using 8 workers on my CPU may be the fastest, and 16 or any other higher number may be worse for performance because the Go scheduler must manage them. Bench-marking is the only way to know the best number of workers, which is different on all CPUs. Worker number is something that could normally be calculated on installation of a program.
4. In Go you can use underscores in numbers to make them easier to read we have a large amount of jobs simulated here.
5. Use a go routine to funnel jobs into the jobs channel, as this channel can take up to 1000 jobs at once, it will not have all of the `numJobs` inside of it at once, but that is okay because as we are adding jobs into this channel we are taking them out with the worker go routine. With a buffer size of 1000, when this is full the channel will block until a job has been taken by a worker, having a buffer size prevents back-pressure where this channel could take up loads of memory waiting for workers to empty it.
6. Use all of our workers to get through the jobs in the jobs channel. Each time a worker is doing a job we use the `Add` method to keep track of that routine.
7. Use one more go routine to wait for the other go routines to finish and then close the results channel when all of the results have been put in it.
8. Range over the results channel to get all of the results out. The results show how many numbers are prime from the jobs channel.

### Sources

- [Worker Pools in Go - Go Cookbook](https://go-cookbook.com/snippets/concurrency/worker-pools)
- [Worker Pools - Go By Example](https://gobyexample.com/worker-pools)