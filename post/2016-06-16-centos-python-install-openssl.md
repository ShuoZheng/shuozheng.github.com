#Centos python 2.7.9 安装OpenSSL模块

今天使用twisted的```getPage```发送https请求，结果报了错误:

```python
ImportError: No module named OpenSSL
```

原因是getPage在执行过程中判断如果是https函数，会```from twisted.internet import ssl``` 
而在```twisted.internet.ssl```中有如下引入操作

```python
from OpenSSL import SSL
```

由于python中没有安装OpenSSL模块，所以报错了。

## 解决方法：

* 安装 openssl-devel
	```sh
	yum install openssl-devel 
	```

* 安装 pyOpenSSL

	```sh
	yum install pyOpenSSL
	```

* 安装完毕后进行验证

	```python
	$ python
	import OpenSSL
	```

不再报错则安装成功。

如果仍然报错, 有可能是由于重装或升级过python导致的。

## 继续解决:

* 查看pyOpenSSL安装位置：

```sh
$ rpm -ql pyOpenSSL  
/usr/lib64/python2.6/site-packages/OpenSSL
/usr/lib64/python2.6/site-packages/OpenSSL/SSL.so
/usr/lib64/python2.6/site-packages/OpenSSL/__init__.py
/usr/lib64/python2.6/site-packages/OpenSSL/__init__.pyc
/usr/lib64/python2.6/site-packages/OpenSSL/__init__.pyo
/usr/lib64/python2.6/site-packages/OpenSSL/crypto.so
/usr/lib64/python2.6/site-packages/OpenSSL/rand.so
/usr/lib64/python2.6/site-packages/OpenSSL/test
/usr/lib64/python2.6/site-packages/OpenSSL/test/__init__.py
/usr/lib64/python2.6/site-packages/OpenSSL/test/__init__.pyc
/usr/lib64/python2.6/site-packages/OpenSSL/test/__init__.pyo
/usr/lib64/python2.6/site-packages/OpenSSL/test/test_crypto.py
/usr/lib64/python2.6/site-packages/OpenSSL/test/test_crypto.pyc
/usr/lib64/python2.6/site-packages/OpenSSL/test/test_crypto.pyo
/usr/lib64/python2.6/site-packages/OpenSSL/test/test_rand.py
/usr/lib64/python2.6/site-packages/OpenSSL/test/test_rand.pyc
/usr/lib64/python2.6/site-packages/OpenSSL/test/test_rand.pyo
...
```

	发现pyOpenSSL安装位置处于```/usr/lib64/python2.6/site-packages/OpenSSL```
	而由于进行过升级，新的python处于```/usr/local/lib/pytohn2.7```
	yum将OpenSSL模块装到了老的python里。

* 将OpenSSL目录复制到```/usr/local/lib/pytohn2.7/site-packages```

	```sh
	cp -rf /usr/lib64/python2.6/site-packages/OpenSSL /usr/local/lib/python2.7/site-packages/
	```

此时再进行验证，问题已解决。