#改变Git裸仓库默认分支

删除远程分支时出现错误提示：

	git push --delete origin master
	
	remote: error: By default, deleting the current branch is denied, because the next
	remote: error: 'git clone' won't result in any file checked out, causing confusion.
	remote: error: 
	remote: error: You can set 'receive.denyDeleteCurrent' configuration variable t
	remote: error: 'warn' or 'ignore' in the remote repository to allow deleting th
	remote: error: current branch, with or without a warning message.
	remote: error: 
	remote: error: To squelch this message, you can set it to 'refuse'.
	remote: error: refusing to delete the current branch: refs/heads/master

这是master是远程仓库的当前分支造成的。(如果使用git clone --bare生成裸仓库，那么源仓库当时指向哪个branch哪个就删不掉)。
因为远程仓库是裸仓库，所以不能使用普通的git checkout命令切换分支。要在裸仓库中使用如下命令来切换当前分支：

	git symbolic-ref HEAD refs/heads/develop

这个命令实际上是修改了.git/HEAD文件，试其内容由
	
	ref: refs/heads/master
变为

	ref: refs/heads/develop
	
此时再次执行
	
	git push --delete origin master
	
即可顺利删除远程分支。

##参考
[git裸仓库设置默认分支](http://openwares.net/linux/git_bare_repository_set_defaut_branch.html)





