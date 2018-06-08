// 在前面的例子中，我们看看产生外部进程。 当需要一个运行的Go进程可访问的外部进程时，我们就可以这样做。
// 有时只是想用另一个(可能是非Go)完全替换当前的Go进程。可使用Go的经典exec函数来实现。
// 在下面的例子将执行ls命令。
// Go需要一个我们想要执行的二进制的绝对路径，所以将使用exec.LookPath来找到它(可能是/bin/ls)

package main

import "syscall"
import "os"
import "os/exec"
import "gitee.com/jntse/testgo/helloworld/common"

func TestExecProcess() {
	common.PrintSeparateLine("TestExecProcess")
	defer common.PrintSeparateLine("TestExecProcess")

	// For our example we'll exec `ls`. Go requires an
	// absolute path to the binary we want to execute, so
	// we'll use `exec.LookPath` to find it (probably
	// `/bin/ls`).
	binary, lookErr := exec.LookPath("ls")
	if lookErr != nil {
		panic(lookErr)
	}

	// `Exec` requires arguments in slice form (as
	// apposed to one big string). We'll give `ls` a few
	// common arguments. Note that the first argument should
	// be the program name.
	args := []string{"ls", "-a", "-l", "-h"}

	// `Exec` also needs a set of [environment variables](environment-variables)
	// to use. Here we just provide our current
	// environment.
	env := os.Environ()

	// Here's the actual `syscall.Exec` call. If this call is
	// successful, the execution of our process will end
	// here and be replaced by the `/bin/ls -a -l -h`
	// process. If there is an error we'll get a return
	// value.
	execErr := syscall.Exec(binary, args, env)
	if execErr != nil {
		panic(execErr)
	}
}
