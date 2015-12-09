#Mac系统关闭Rootless的方法

Mac OS X 10.11 引入了Rootless机制，导致第三方应用即使是运行在root全险种，有一些操作也无法完成。比如向/usr/bin安装软件什么的全都失败。

关闭方法如下:
	
	* 开机按住 Command + R 进入恢复模式。
	* 打开terminal键入：

			csrutil disable

	* 重新启动。

如要重新开启只需将上述操作中的disable改为enable即可。

##参考：
[OS X 10.11中Rootless的实现与解释以及关闭方法](http://tadaland.com/os-x-rootless.html)