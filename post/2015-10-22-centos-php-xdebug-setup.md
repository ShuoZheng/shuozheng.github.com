#CentOS编译安装配置XDebug

OS：CentOS 6
PHP: PHP54
XDebug: 2.3.3

##编译安装xdebug
下载[XDebug]源码到本地，并解压

    tar -xvzf xdebug-2.3.3.tgz
    
进入xdebug-2.3.3目录并执行

    phpize
    ./configure --with-php-config=/usr/bin/php-config
    make
    sudo make install
    
注意： 根据情况修改php-config的位置
    
##配置php.ini
    vi /etc/php.ini
在最后添加以下内容，并根据实际情况进行修改

    [Xdebug]
    ; 指定xdebug 扩展文件的位置(路径请根据自己的情况做调整)
    zend_extension="/usr/lib64/php/modules/xdebug.so"
    ; 开启自动跟踪
    xdebug.auto_trace = On
    ;开启异常跟踪
    xdebug.show_exception_trace = On
    ;开启远程调试自动启动
    xdebug.remote_autostart = On
    ;开启远程调试
    xdebug.remote_enable = On
    ;收集变量
    xdebug.collect_vars = On
    ;收集返回值
    xdebug.collect_return = On
    ;收集参数
    xdebug.collect_params = On

    xdebug.trace_output_dir = "/tmp/xdebug"
    xdebug.profiler_output_dir = "/tmp/xdebug"
    xdebug.dump.GET = *
    xdebug.dump.POST = *
    xdebug.dump.COOKIE = *
    xdebug.dump.SESSION = *
    xdebug.var_display_max_data = 4056
    xdebug.var_display_max_depth = 5

    ; 启用xdebug 远程调试
    xdebug.remote_enable = 1
    ; 以下xdebug 调试选项实际上是默认值
    xdebug.remote_host = localhost
    ; remote port端口 注意php-fpm端口有可能冲突 需要酌情修改
    xdebug.remote_port = 9000
    xdebug.remote_mode = req
    xdebug.remote_handler = dbgp


[XDebug]: http://xdebug.org/download.php



