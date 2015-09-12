#Windows下使用Beyond Compare代替Git比对和合并工具

网上很多介绍的方法是用执行命令

    Diff
    At a Windows command prompt enter the commands: 
      git config --global diff.tool bc3
      git config --global difftool.bc3.cmd "\"c:/program files/beyond compare 3/bcomp.exe\" \"$LOCAL\" \"$REMOTE\""
      git config --global difftool.prompt false
    To launch a diff with BC3, use the command "git difftool foofile.txt".

    Merge 
    At a Windows command prompt, enter the commands: 
      git config --global merge.tool bc3
      git config --global mergetool.bc3.cmd "\"c:/program files/beyond compare 3/bcomp.exe\" \"$LOCAL\" \"$REMOTE\" \"$BASE\" \"$MERGED\""
      git config --global mergetool.bc3.trustExitCode true
      
但是我设置完之后还是用不了，后来找到了直接修改配置文件的方法。

配置文件通常存放在"C:\Users\[用户名]\.gitconfig"，如果找不到也可以直接打开git bash
  cd ~
  vi .gitconfig

然后在文件中做如下配置：
对比工具：

    [diff]
      tool = bc3
    [difftool "bc3"]
      cmd = "\"C:/Program Files (x86)/Beyond Compare 3/BComp.exe\" \"$LOCAL\" \"$REMOTE\""
    [difftool]
      prompt = false

合并工具：

    [merge]
      tool = bc3
    [mergetool "bc3"]
      cmd = "\"C:/Program Files (x86)/Beyond Compare 3/BComp.exe\" \"$LOCAL\" \"$REMOTE\" \"$BASE\" \"$MERGED\""
      trustExitCode = true
    [mergetool]
      keepBackup = false

注：git在合并时会生成备份文件(*.orig)，通过上面最后两行的设置可以关闭生成备份。

参考：  
[用Beyond Compare代替git的difftool和mergetool](http://blog.csdn.net/jiubugeinifo/article/details/9357121)  
[Windows下使用Beyond Compare作为git的比对与合并工具](http://my.oschina.net/u/1010578/blog/348731)  
[让git mergetool不再生成烦人的备份文件（*.orig）](http://bbs.mfunz.com/thread-718528-1-1.html)  







