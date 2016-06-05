# 使用py2app将python打包成mac app

## 安装py2app

我在执行安装前，用```pip list```查看发现已经有py2app了，但是各种不正常，所以一定要用下边的命令重新装一遍。

```sh
$ sudo pip install -U py2app
```

## 使用py2applet生成setup.py

```sh
$ py2applet --make-setup xxxx.py
```

xxxx.py 是python程序的入口

执行完成后 会在xxxx.py同级目录生成setpy.py

## 生成app

执行命令
```sh
$ python setup.py py2app
```

如执行成功则会在同级目录生成build、dist两个目录

build是编译打包时生成的中间文件，dist中就是打包完成的Mac可执行程序。

## app启动方式

* 双击运行

	适用于带UI界面的的程序，否则双击后完全看不到效果 >_<

* 在终端中运行

	如果打包的是个console程序，或者在调试阶段需要使用pdb调试时需要使用这种方法启动

	```sh
	$ ./dist/xxxx.app/Contents/MacOS/xxxx
	```

	程序启动后，stdout和stdin都指向当前终端窗口，可以在当前终端窗口看到程序输出，也可以输入指令。

* 使用open命令 利用 LaunchServices 启动程序：

	```sh
	$ open ./dist/xxxx.app
	```

	官方文档上写的命令执行，我这边会报错:

	```sh
	$ open -a dist/xxxx.app
	Unable to find application named 'dist/xxxx.app'
	```

## 注意：
  
* 双击和open命令启动程序时，stdout和stderr将会输出到系统日志中，可以通过控制台查看输出。 

	```sh
	$ open -a Console
	```

* 如果一个console程序里需要用户输入字符，比如程序里调用了```raw_input( "input something" )```
那么，程序必须通过从终端运行的方式启动才行，否则在执行到raw_input语句的时候会抛出EOFError异常。


##参考
[py2app](http://pythonhosted.org/py2app/index.html)  
[MAC OS X 下用py2app打包PYQT程序](http://wenku.baidu.com/link?url=WRJR0myC5tWR0dlinlyAx542Acsu5AiLetKpUZGFDat74q4pCwrAnoDMWcDAJjVjWMDx5YuQSvFsY84yaupbFvPN5AYBWyxGUrbs-PR-TWK)  
[[译]用Python和py2app写独立的Mac OS X 应用](http://www.jianshu.com/p/afb6b2b97ce9)  


