#一个看起来很简单的加密算法

今天看到了一套加密解密算法，可以对任意数据流进行加密解密，实现很简单。

	[C++]
	
	unsigned char* encode( unsigned char *data, int length )
	{
		for( int i = 0; i < length; i++ )
		{
			int a = data[ i ];
			a += ( i * i );
			data[ i ] = ( unsigned char )a;
		}
		return data;
	}

	unsigned char* decode( unsigned char *data, int length )
	{
		for( int i = 0; i < length; i ++ )
		{
			int a = data[ i ];
			a -= ( i * i );
			data[ i ] = ( unsigned char )a;
		}
		return data;
	}

这段代码看起来操作非常简单。

* 源数据上加了一个数，然后强转成 unsigned char。 

* 解密时就是把加密数据减去之前加的那个数，然后再强转成 unsigned char。

恩，看起来他就是做了这点事儿。不过从字面上看，总感觉它加密之后没法正确的还原。
因为 a + ( i * i ) 之后很容易就超过1字节的上限（255），当强转回unsigned char时，超出上限的高位部分会被截断丢弃。
得出的这个结果无论怎么看都觉得不可能再还原成源数据。

##但神奇的是它真的能正常工作，而且不会出错！

整个公式的玄机实际就在于那个( i * i )，这是一个平方数。
 
我虽然明明白白的知道它干了什么，但是完全不能领悟其中的原理。
 
写出这个算法的人，当真是个牛人。

下面是对于上面算法的Python版本实现，用于验证算法的正确性：

	[python]

	def encode( input, i ):
	  input += ( i * i )
	  input = input & 0xFF
	  return input

	def decode( input, i ):
	  input -= ( i * i )
	  input = input & 0xFF
	  return input


	if __name__ == '__main__':
	  data = [ i for i in xrange( 255 ) ]
	  data = data + data

	  import random
	  random.shuffle( data )

	  error_count = 0
	  print "input data:"
	  print data
	  print 10 * '='

	  out = []
	  for i in xrange( len(data) ):
	    value_origin = data[ i ]
	    value_encode = encode( value_origin, i )
	    value_decode = decode( value_encode, i )
	    is_same = value_origin == value_decode
	    print "i: %s, origin: %s, encode: %s, decode: %s, same: %s" % ( i, value_encode, value_encode, value_decode, is_same )
	    if not is_same:
	      error_count += 1
	    out.append( value_encode )


	  print 10 * '='
	  print "out data:"
	  print out

	  print 10 * '='
	  print "error_count: %s" % error_count
  
