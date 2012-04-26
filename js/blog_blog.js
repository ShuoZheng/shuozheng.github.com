var blog = 
{
	posts: null,
	title: document.title,
	post_tags: {},
	filter_tags: [],
	current_path: "",
	current_index: 0,
	current_state: "", // post/index
	con: new Showdown.converter(),
	tags_num: 0,
	
	isHashClass : function( data, name )
	{
		var classes = data.className.split( " " );
		for( i in classes )
		{
			if( classes[ i ] == name )
			{
				return true;
			}
		}
		return false;
	},

	isNeedShow : function( tags, mode )
	{
		var should_show = false;
		if( blog.filter_tags.length > 0 || mode > 0 )
		{
			for( var i in blog.filter_tags )
			{
				should_show = false;
				for( var j in tags )
				{
					if( blog.filter_tags[ i ] == tags[ j ] )
					{
						should_show = true;
						break;
					}
				}		
				if( ( !should_show && mode == 2 )
					|| ( should_show == true && mode == 1 )
				 )
				{
					return should_show;
				}
			}
		}
		else
		{
			should_show = true;
		}
		return should_show;
	},
	
	initPostTags : function( )
	{
		var all_tags = [];
		$( blog.posts ).each
		(
			function( )
			{
				all_tags = all_tags.concat( this.tags );
			}
		);
		
		blog.post_tags = { };
		blog.tags_num = 0;
		
		$( all_tags ).each
		(
			function( )
			{
				if( blog.post_tags[ this ] == undefined )
				{
					blog.post_tags[ this ] = 1;
					blog.tags_num += 1;
				}
				else
					blog.post_tags[ this ] += 1;
			}
		);				
		
	},
	
	initPostIndex : function( )
	{
		$( "#blogList" ).html( "" );
		var $item_value_list = $("<ul class='index-item-row'>").appendTo( $("#blogList") );
		
		var $post_list = $( "<li>" ).appendTo( $item_value_list );
		$( "<a>" ).appendTo( $post_list ).text( "Tags" ).attr( "href", "" );
		$("<small>").appendTo( $post_list ).text( "[" + blog.tags_num + "]" );
		$post_list = $( "<li>" ).appendTo( $item_value_list );
		//$( "<hr />" ).appendTo( $post_list )
		
		$post_list = $( "<li id='postIndex_selecter'>" ).appendTo( $item_value_list );
		
		$( "<a id='postIndex_All' class='selected'>" ).appendTo( $post_list ).text( "[ALL]" );		
		$( "<a id='postIndex_And'>" ).appendTo( $post_list ).text( "[AND]" );						
		$( "<a id='postIndex_Or'>" ).appendTo( $post_list ).text( "[OR]" );

		
		$( "#postIndex_selecter a" ).click
		(
			function( e )
			{
				$( "#postIndex_selecter a" ).removeClass( "selected" );
				$( this ).addClass( "selected" );
				
				if( $( "#postIndex_All.selected" ).length > 0 )
				{
					$( ".selected" ).removeClass( "selected" );
					$( this ).addClass( "selected" );
				}
				blog. updatePostList( );
			}
		);		
		
		$("<small id='postIndex_Num'>").appendTo( $post_list ).text( "[" + blog.posts.length + "]" );
		
		$post_list = $( "<li>" ).appendTo( $item_value_list );
		$( "<hr />" ).appendTo( $post_list )	
		
		$.each
		( 
			blog.post_tags, function( key, value )
			{
				$post_list = $( "<li>" ).appendTo( $item_value_list );
				var $ta = $( "<a class='tag_item'>" ).appendTo( $post_list ).text( key.toString() );
				$("<small>").appendTo( $post_list ).text( "[" + value + "]" );
			}
		);
		
		$( "a.tag_item" ).click
		(
			function( e )
			{
				var isSelected = blog.isHashClass( this, "selected" );
				if( $( "#postIndex_And.selected" ).length == 0 && $( "#postIndex_Or.selected" ).length == 0 )
				{
					$( "a.tag_item" ).removeClass( "selected" )
				}
				if( isSelected )
				{
					$(this).removeClass( "selected" );
				}
				else
				{
					$(this).addClass( "selected" );
				}
				blog.updatePostList( );
			}
		);

	},
	
	updatePostList : function( )
	{
		blog.filter_tags = [];
		$.each
		(
			$( "a.tag_item" ), function( )
			{
				if( blog.isHashClass( this, "selected" ) )
				{
					blog.filter_tags = blog.filter_tags.concat( this.text );
				}
			}
		);
		/*if(blog.current_path.length != 0 ) 
		{
			return;
		}*/
		if(blog.current_path.length != 0 )
		{
			location.hash = "";
			blog.current_path = "";
		}
		blog.initPostList( );
	},
	
	initPostList : function( )
	{
		$( "#main" ).html( "" );
		var $post = $("<div class='post'>").appendTo( $("#main") );
		$post.html( "" );
		var $post_title = $( "<div class='post_title'>" ).appendTo( $post );
		$( "<hr />" ).appendTo( $post );
		var $post_content = $( "<div class='post_content'>" ).appendTo( $post );
		$( "<hr />" ).appendTo( $post );
		var $post_bottom = $( "<div class='post_bottom'>" ).appendTo( $post );
		
		//title
		var $t_title = $( "<H1>" ).appendTo( $post_title ); 
		$( "<a>" ).appendTo( $t_title ).text( "Blog List" );
		$("<small id='filter'>").appendTo( $t_title ).text( "[All]" );				
		
		var mode = 0;
		if( blog.filter_tags.length != 0 )
		{
			if( $( "#postIndex_Or.selected" ).length > 0 )
			{
				mode = 1;
			}
			else if( $( "#postIndex_And.selected" ).length > 0 )
			{
				mode = 2;
			}
			var t_tags = ""
			$( blog.filter_tags ).each
        		(
        			function()
        			{
					t_tags = t_tags + "[" + this + "]";
				}
			);
			$( "#filter" ).text( t_tags );
		}

		var postNum = 0;
		
		$( blog.posts ).each
		(
			function()
			{
				if( !blog.isNeedShow( this.tags, mode ) )
				{
					return;
				}
				postNum += 1;
				var $post_list = $( "<ul class='postList_item'>" ).appendTo( $post_content );
				var $postList_title = $( "<li class='postList_title'>" ).appendTo( $post_list );
				$( "<a>" ).appendTo( $postList_title ).text( this.title ).attr( "href", "#!" + this.path );

				$( "<li class='postList_date'>" ).appendTo( $post_list ).text( this.date );
				
				var $post_tags = $("<li class='postList_tags'>").appendTo( $post_list );
				
        			$( this.tags ).each
				(
					function( )
					{
						$("<a class='postList_tagsItem'>").appendTo( $post_tags ).text( "[" + this + "]" );
					}
				);
			}
		);
		
		$( "a.postList_tagsItem" ).click
		(
			function( e )
			{
				var item = this;
				
				$( "#postIndex_selecter a" ).removeClass( "selected" );
				$( "#postIndex_All" ).addClass( "selected" );
				$( "a.tag_item" ).removeClass( "selected" )

				$( "a.tag_item" ).each
				(
					function( )
					{
						if( this.text == item.text.replace( "[", "" ).replace( "]", "" ) )
						{
							$(this).addClass( "selected" );
						}
					}
				);
				blog.updatePostList( );
			}
		);

		
		if( postNum <= 0 )
		{
			$( "<H1>" ).appendTo( $post_content ).text( "no post" );
		}
		$( "#postIndex_Num" ).text( "[" + postNum + "]" );
	},
	
	loadPost : function( post, data )
	{
		post.html( "" );
		var $post_title = $( "<div class='post_title'>" ).appendTo( post );
		$( "<hr />" ).appendTo( post );
		var $post_content = $( "<div class='post_content'>" ).appendTo( post );
		$( "<hr />" ).appendTo( post );
		var $post_bottom = $( "<div class='post_bottom'>" ).appendTo( post );
		
		//title
		var $t_title = $( "<H1>" ).appendTo( $post_title ); 
		$( "<a>" ).appendTo( $t_title ).text( data.title ).attr( "href", "blog.html#!" + data.path );
		$("<small>").appendTo( $t_title ).text( "[" + data.date + "]" );				
			
		//bottom
		//$( "<p>" ).appendTo( $post_bottom ).text( "底栏，随便放点什么。比如【阅读】【评论】【日期】【返回顶部】" );
		$( "<a>" ).appendTo( $( "<p>" ).appendTo( $post_bottom ).text( "底栏，随便放点什么。比如【阅读】【评论】【日期】" ) ).text( "【返回顶部】" ).attr( "href", "#top" );
		
		//content
		$.ajax
		(
			{
				url : "post/" + data.path + ".md",
				dataType : 'text',
				success : function(t){ blog.loadPostContent( t, $post_content ); }
			}
		);

	},
	
	loadPostContent : function( data, content )
	{
		var post_content = blog.con.makeHtml(data);
		$(content).html(post_content);
		$('pre code').each(function(i, e) {hljs.highlightBlock(e, '    ')});
	},
	
	updatePostContent : function( )
	{
		var hash = location.hash;
		blog.current_path = hash.replace(/^#/, '' ).replace(/^!/, '');
		if(blog.current_path.length == 0 || hash.indexOf(  "!" ) < 0 ) 
		{
			location.hash = "";
			blog.current_path = "";
			return;
		}
		$( "#main" ).html( "" );
		var $post = $("<div class='post'>").appendTo( $("#main") );
		
		blog.current_index = -1;
		for(i = 0; i < blog.posts.length; i++) 
		{
			if(blog.posts[i].path == blog.current_path) 
			{
				blog.current_index = i;
				break;
			}
		}
		
		if( blog.current_index == -1 )
			return;
		blog.loadPost( $post, blog.posts[ blog.current_index ] );
	},
		
	indexLoaded : function( data )
	{
		blog.posts = data;
		
		if( blog.posts.length == 0 )
		{
			return;
		}
		
		blog.initPostTags( );
		blog.initPostIndex( );
		blog.initPostList( );
		
		blog.updatePostContent( );
		
		// Event handler
		$(window).hashchange(function() {
			blog.updatePostContent( );
		});
	}	
}

$(document).ready
(
	function() 
	{
    // load post index
    $.ajax({
        url : "post/index.json",
        dataType : 'json',
        success : blog.indexLoaded
    });  
	}
);