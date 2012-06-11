# 在Github上写博客  
  
## 起因

* 某天偶然在网上瞎翻看到了[用 Git 维护博客？酷！]这篇文章，觉得太帅了～  
  
* 一次偶然的机会接触到了git，然后知道了有个叫GitHub的东西，了解到Github是程序员展示自己的最佳网站。
  我想去上面找找自己感兴趣的开源项目，并且有参与开源项目的愿望。学会使用git是实现愿望的第一步。
  
* 我认为未来是个web的时代。随着各种web技术的不断发展，web应用越来越强大，显示效果也越来越绚丽。现在各种各样的应用跑在浏览器上，
  人们只要打开浏览器就可以使用它们。用户的信息都保存在服务器上，随时随地都可以通过不同的终端进行访问。这些给人们带来了更多的方便，
  它们正在渐渐取代传统的应用程序。学习web技术是一件很有必要的事情。
  
* 我需要一个地方来记录一些东西。一些工作中累积的经验，学习中的一些笔记，生活中的一些感悟。
  之前我总是把在网上查到的资料的页面保存下来，或者自己的一些笔记保存成txt放在当时正在做的那个项目里。结果就弄得哪里都有，既不便于管理又不便于查阅。
  有时候一做备份就弄出来好几份，项目归档了笔记也跟着一块儿归档了... 有的时间长了就记不起来放在什么地方了，想看又找不着。实在是太混乱了。

* 写作能力太差，像找个机会练练手。

  所以我就自己动手弄了这个博客。

## 选择哪种方案

  通过[用 Git 维护博客？酷！]了解了大概的搭建方法和原理。文中提出了一个成熟的方案[Jekyll]。  
  而后我有看到了[在Github上写博客]这篇文章。文中提出用javascript动态加载[Markdown]格式的文章，在前台进行转换。  
  无论是[Jekyll]还是javascript，甚至是html对我来说都是陌生的。所以我针对这两种方案都进行了研究。  
  
  我分别用git检出这两个博客项目源码，并查阅了大量资料。
  
* [Jekyll]方案 

  整个仓库的结构大概是这样的：  
  
  * _config.yml -- 存储了一些设置。
  
  * _layouts --用于存放模板文件，文章会被渲染到这些模板里，变量指代的是文章内容。
  
  * _posts  --存放博客文章，用[Markdown]格式编写。
  
  * index.html --首页，其实是一个html片段。  
    
 在html文件的头部会有类似 
  
        ---
        layout: post
        title: This is Title
        ---

  这种东西来说明这个页面使用哪个模板。  
  
  当执行生成后，会在目录中生成\_site文件夹。所有非以"\_"开头的文件夹都会被放到\_site中，
  并且每个文件都会被解析，当在文件头部识别到模板命令，便会对此文件进行处理，根据定义的模板生成完整的页面。
  用[Markdown]书写的文章这时也会被转换成html页面。  
  也就是说，[jekyll]存在一个生成的过程。他会把所有的文章都转换成完整的html页面，然后部署到GitHub上。当有人进行访问的时候，实际是在访问
  已经生成好的静态页面，也就是_site文件夹中的内容。不过这个生成过程是当你把仓库push到GitHub服务器的时候，GitHub自动完成的。

  优点：由于是静态页面，访问速度很快。文章在部署的时候就已经转换成页面了。而且利用模板生成，修改页面样式很方便。只要修改一处，所有的页面就全都变了。
  而且可以定义各种各样的模板，用在不同的页面里。
  缺点：如果想在本地看效果，必须装[jekyll]进行生成，并开启一个服务器，才能进行浏览。当然，这一步装完[jekyll]还是很方便的，只要输入
  
        $ jekyll --server  
  
  [jekyll]就会自动生成\_site文件夹，并且部署到4000端口上。
  
* javascript方案

  这个完全是靠浏览器加载页面时，执行javascript脚本进行动态转换。  
  当选择一篇文章时，使用[jQuery hashChange]插件获取hashChange事件。
  然后通过location.hash获取文章路径，用ajax向服务器请求文件。当得到文件后
  使用[showdown.js]进行转换，并插入到页面中。最后再用[highlight.js]处理代码高亮。  
  
  优点：不用生成。想要浏览直接用浏览器打开页面就行了。而且javascript很强大，通过它能做很多很多东西。  
  缺点：需要多次向服务器申请资源，并且需要在前端进行处理。速度上会慢一些。不同的浏览器可能有不同的效果？

  我最终选择了第二个方案，用javascript在前台进行动态转换。为什么？因为我完全不会用～甚至连html都不会写，
  我需要能及时的看到效果，我可能需要一句一句的去调试，而[jekyll]需要生成，而且还得部署。我每修改一次想看看效果都得重新生成  
  这太麻烦了，显然无法满足我的需求。

## 部分细节

我主要是参照[在Github上写博客]的方案做的。并以他的仓库为原型进行修改。

* 关于样式

  关于样式我想了很久，在网上看了很多博客。背景颜色来自于[新浪微博],有一种小清新的感觉^_^
  圆角框体来自于[ddatsh.com]  
  最基本的css样式和html结构其实是来自于[w3school]。而后我又在这个基础上进行修改。估计现在已经看不出来了。
  总之就是看见好的就抄了过来～

* 关于Tag筛选、导航

  其实原理很简单就是给这些Tag标签加click事件，通过"addClass( "selected" )"标记Tag是否被选中。
  根据是否存在"selected"决定显示样式，以及文章列表的显示内容。  
  
  值得一说的是"[ALL]、[AND]、[OR]"这一组按钮。这是三种不同的筛选模式。当点击[ALL]时，所有筛选条件都会被清除。
  此时再选择Tag是单选模式。只能进行单类的筛选。而切换到[AND]或[OR]则可以进行多类筛选。
  [AND]模式下文章必须满足所有Tag才予以显示。[OR]模式则相反，只要满足一个标签就予以显示。就像代码中的逻辑与运算和逻辑或运算一样。

  还有一点特别的就是 我加入了一个叫做"hide"的tag。被标记为hide的文章和图片不会出现在列表中。比如About。
  
* 关于图片列表  
  
  这其实只是文章列表的一个变体而已。处理方式和处理博客文章一样，也是通过维护一个index.json来获取图片的。

* 关于模板  

  如果我这个也能叫模板的话..我将页面的标题栏、底栏还有边栏分别存成了三个html片段，然后通过  
  
        <script type="text/javascript">
          $( "#header" ).load( "template/head.html" );
          $( "#footer" ).load( "template/footer.html" );
          $( "#side" ).load( "template/side.html" );
        </script>  
       
   把他们插入到对应的元素中。这样对于这三个部分我之要修改一处就全改变了。

## 非常感谢
[lvkun]  感谢您的文章以及项目仓库。我的博客可以说完全都是基于您的方案才得以完成的。非常感谢。

## 参考
[在Github上写博客]  
[用 Git 维护博客？酷！]  
[ddatsh.com]  
<http://yihui.name/cn/>  
[mojombo.github.com]  
[w3school]  
<http://blog.leezhong.com/tech/2010/08/25/make-github-as-blog-engine.html>    
[Markdown语法简单介绍]  



[lvkun]: http://lvkun.github.com/#!about
[Markdown语法简单介绍]: http://sebug.net/node/t-24
[mojombo.github.com]: http://tom.preston-werner.com/
[w3school]: http://www.w3school.com.cn/
[ddatsh.com]: http://ddatsh.com
[新浪微博]: http://weibo.com/
[在Github上写博客]: http://lvkun.github.com/#!2012-01-29-write-blog-on-github
[Markdown]: http://daringfireball.net/projects/markdown/
[用 Git 维护博客？酷！]: http://www.worldhello.net/2011/11/29/jekyll-based-blog-setup.html
[Jekyll]: https://github.com/mojombo/jekyll
[showdown.js]: https://github.com/coreyti/showdown
[jQuery hashChange]: http://benalman.com/projects/jquery-hashchange-plugin/
[highlight.js]: https://github.com/isagalaev/highlight.js

