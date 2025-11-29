+++
url = '/:section/note-:contentbasename/'
date = '2025-11-29'
updated = '2025-11-29'
title = 'Errors'
prefix = 'Go'
layout =  'note'
+++

### Code

```go
package main

import (
	"errors"
	"fmt"
	"log"
	"log/slog"
	"os"
)

// 1.
var (
	ErrReadingFile = errors.New("no such file or directory")
	ErrClosingFile = errors.New("could not close file")
)

// 2.
func ReadFile(file string) (string, error) {
	f, err := os.ReadFile(file)
	if err != nil {
		return "", err
	}

	contents := string(f)
	return contents, nil
}

// 3.
func ReadFileBetter(file string) (string, error) {
	f, err := os.ReadFile(file)
	if err != nil {
		return "", fmt.Errorf("main: ReadFileBetter: %w", err)
	}

	contents := string(f)
	return contents, nil
}

func closeFile(f *os.File, name string) {
	msg := fmt.Sprintf("closing %v", name)
	slog.Debug("debug", "msg", msg)
	err := f.Close()
	if err != nil {
		slog.Error("error", "msg", err)
	}
}

// 4.
func ReadFileBest(file string) (string, error) {
	f, err := os.OpenFile(file, os.O_RDONLY, 0644)
	if err != nil {
		return "", fmt.Errorf("main: ReadFileBest: %w: %w", ErrReadingFile, err)
	}
	defer closeFile(f, f.Name())

	b := make([]byte, 8)
	_, err = f.Read(b)
	// uncomment this error to see how the different errors are handled
	// err = errors.New("this error should never happen")
	if err != nil {
		return "", fmt.Errorf("main: ReadFileBest: %w", err)
	}

	contents := string(b)
	return contents, nil
}

func main() {
	// 5.
	logFile, err := os.OpenFile("./log.json", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0644)
	if err != nil {
		log.Fatal(err)
	}
	defer func() {
		if err := logFile.Close(); err != nil {
			slog.Error("error", "msg", err)
		}
	}()
	// to see the logs in the terminal, change the writer to be os.Stdout or os.Stderr
	logger := slog.New(slog.NewJSONHandler(logFile, &slog.HandlerOptions{
		Level: slog.LevelDebug,
		ReplaceAttr: func(groups []string, a slog.Attr) slog.Attr {
			if a.Key == slog.TimeKey {
				t := a.Value.Time()
				a.Value = slog.StringValue(t.Format("2006-01-02 15:04:05"))
			}
			return a
		},
	}))

	slog.SetDefault(logger)

	f := "../example.txt"

	// 6.
	contents, err := ReadFile(f)
	if err != nil {
		log.Println(err)
		// or log fatal
		// log.Fatal(err)
	}
	if contents != "" {
		fmt.Println(contents)
	}

	// 7.
	contents2, err := ReadFileBetter(f)
	if err != nil {
		slog.Error("error", "msg", err)
	}
	if contents2 != "" {
		fmt.Println(contents2)
	}

	// 8.
	contents3, err := ReadFileBest(f)
	if err != nil {
		if errors.Is(err, ErrReadingFile) {
			slog.Error("error", "msg", err)
			slog.Info("info", "hint", "check the file path is correct relative to program")
		} else {
			slog.Error("error", "msg", err)
			panic(err)
		}
	}
	if contents3 != "" {
		fmt.Println(contents3)
	}
}
```

### Notes

1. In Go, you can set errors equal to variables and then check their equality which can inform how you handle them as the caller. Always start error variables with err or Err, this is called a sentinel error.
2. This is the most basic form of error handling in Go. When you return two variables from a function. You must return the value first and then the error. Use the zero value of the first variable if you are returning an error. Use nil for the zero value of the error if no error occurred. This is why in Go you will frequently see `if err != nil`.
3. Using the `fmt` package we can format the error, passing useful information in like the file name and the function name where the error occurred and then the error itself. The `%w` verb wraps the error, keeping all of the useful information about the error for unwrapping in the future.
4. Here we use the the error variable and pass more useful information to the returned error if it fails to read, this is the most likely place this function will fail so giving it more attention makes sense.
5. Here the log file is created, the logger is set to write to a file and the options for the logger are set and the formatting for the attributes can be updated. Then the logger is set as the default logger to be used by slog and log.
6. Logging is a simple way to handle errors, it can work well for simple errors.
7. `slog` = structured logging. The newer slog package works well for formatting errors. The slog package works seamlessly with log files as JSON which was previously set up at the start of the main function.
8. With this function we can check the type of the error with the `errors.Is` method, this lets us do different things for expected errors and errors that absolutely should not happen. For unexpected outcomes, I decided to panic, which can be the only option in states where there is no recovery.

### Sources

- [Error handling and Go - Andrew Gerrand](https://go.dev/blog/error-handling-and-go)
- [Effective Error Handling in Golang - Brandon Shurman](https://earthly.dev/blog/golang-errors/)
- [When is it OK to panic in Go? - Alex Edwards](https://www.alexedwards.net/blog/when-is-it-ok-to-panic-in-go)
