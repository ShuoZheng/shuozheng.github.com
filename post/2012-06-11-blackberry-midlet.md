## MIDlet应用移植BlackBerry平台的按键问题  
  
  BlackBerry平台支持标准的Java ME，一般MIDlet程序转换为cod文件后可以正确的
  在手机上安装和运行。很多MIDlet应用都使用左右软键响应用户操作，但是在BlackBerry
  手机上并没有左右软键。所以需要重新对左右软键的操作进行适配。  
  
  在网上查了一些方案。  
  
* 将全键盘中的“Q”键映射为左软键，将“P”键映射为右软件。  
  
  这种方法比较简便，改动较小。但是有一定的限制，比如在一个可编辑的域被选中时不能  
  工作，否则用户将无法输入Q字母和P字母。另外，这种方法也不符合BlackBerry用户的操作习惯。

* 将菜单键映射为左软键，将返回键映射为右软键。  
  
  这种方法比较合理，符合用户的习惯。但是Canvas类的按键响应函数并不能捕获这两个按键的事件。
  所以如何取得这两个按键的按键事件是关键问题。  
  
## 实现KeyListener接口  
  
  BlackBerry在支持标准J2ME的同时还拥有一套自己的API用于应用开发。net.rim.device.api.system.KeyListener接口，  
  用于监听按键事件。Canvas实现此接口后可以正常的接收到菜单键和返回键的事件。  
  
  该接口有几个关于按键响应的方法，其中最主要的是keyDown和keyUp。用于响应按键的按下和抬起事件。  
  
        public boolean keyDown( int keycode, int time )；
        
        public boolean keyUp( int keycode, int time )；
        
  其中第一个参数是所按下的按键的键值，第二个值数是与上一次按键相隔的时间，不做重复按键处理的情况下，  
  一般只需要使用第一个参数。使用键值的方法是通过调用Keypad的key方法将键值转换成标准值，  
  然后与Keypad类中对应用静态成员进行比较，菜单键的标准值为Keypad.KEY_MENU，  
  退出键的标准值为Keypad.KEY_ESCAPE。其中类KeyPad在包net.rim.device.api.ui中，虽然是ui包中的类，  
  但是我们只使用静态方法和成员，并不使用ui包中的类进行展现，不会和MIDlet的UI有冲突。  
  
  关于这两个函数的返回值：返回true表明事件已经被处理，系统底层不会再响应此事件，反之则表明应用并没有处理此事件，
  系统底层会响应该事件并做一些默认的响应。所以，如果希望点击菜单键应用将其映射为左软键，同时屏蔽原呼出系统菜单的功能，  
  此时应返回true。

  由于我移植的是一款比较简单的游戏，基本不需要左软键操作。为了达到改动最小最省事的目的，我最后的方案是：  
  
* 将游戏中呼出菜单改为右软键呼出。  
* 实现KeyListener接口，并对返回键进行处理。  
* 将返回键映射为右软键起返回作用。  
* 菜单键保留原系统功能：弹出系统菜单，其中有关闭、切换应用程序两项功能。
* 游戏中其他按键仍使用标准J2ME方法响应。
* 返回键响应后返回false，确保在系统菜单弹出时按返回键能关闭弹出菜单。

## 代码示例  
  
      import net.rim.device.api.system.KeyListener;
      import net.rim.device.api.ui.Keypad;
      import net.rim.device.api.ui.UiApplication;
      
      import javax.microedition.lcdui.Canvas;
      import javax.microedition.lcdui.Graphics;
      
      public class MyCanvas extends Canvas implements KeyListener ...
      {
        //构造
        public MyCanvas( )
        {
          //注册监听器
          UiApplication.getUiApplication().addKeyListener( this );
          ...
        }
        
        //KeyListener接口实现，用于响应返回键按下事件
        public boolean keyDown( int keycode, int time )
        {
          //确定触发事件的按键键值
          int key = Keypad.key( keycode );
          if( key == Keypad.KEY_ESCAPE )
          {
            //将返回键映射为右软键。
          }
          return false;
        }
        
        public boolean keyUp( int keycode, int time )
        {
          int key = Keypad.key( keycode );
          //确定触发事件的按键键值
          int key = Keypad.key( keycode );
          if( key == Keypad.KEY_ESCAPE )
          {
            //将返回键映射为右软键。
          }
          return false;
        }
        
        public boolean keyChar( int arg0, int arg1, int arg2 ){ };
        public boolean keyRepeat( int arg0. int arg2 ){ };
        public boolean keyStatus( int arg0, int arg2 ){ };
        
        //J2ME方法 处理普通按键按下事件
        protected void keyPressed( int key )
        {
          ...
        }
        
        //J2ME方法 处理普通按键抬起事件
        protected void keyReleased( int key )
        {
          ...
        }       
        
        //绘制
        public void paint( Graphics g )
        {
          ...
        }
        
      }  
      
  
  
## 参考
[如何将MIDlet应用移植到BlackBerry]  
  


[如何将MIDlet应用移植到BlackBerry]: http://mobile.51cto.com/blackberry-259429.htm 

