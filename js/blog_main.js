var blog = 
{
	posts: null,
	title: document.title,
	post_tags: {},
	filter_tags: [],
	current_path: "",
	current_index: 0,
	current_state: "", // post/index
	//con: new Showdown.converter(),
	con: new Showdown.converter( { extensions: [ 'github', 'prettify', 'table' ] } ),
	
	initPostIndex : function( )
	{
		$( "#blogList" ).html( "" );
		var $item_value_list = $("<ul class='index-item-row'>").appendTo( $("#blogList") );
		
		$( blog.posts ).each
		(
			function()
			{
				if( this.tags[ 0 ] != "hide" )
				{
					var $post_list = $( "<li>" ).appendTo( $item_value_list );
					$( "<a title='" + this.title + "'>" ).appendTo( $post_list ).text( this.title ).attr( "href", "blog.html#!" + this.path );
					$("<small>").appendTo( $post_list ).text( this.date );
				}			
			}
		);

	},
	
	initMain : function( )
	{
		$( "#main" ).html( "" );
		
		$( blog.posts ).each
		(
			function()
			{
				if( this.tags[ 0 ] != "hide" )
				{
					var $post = $("<div class='post'>").appendTo( $("#main") );
					blog.loadPost( $post, this );
				}
			}
		);
	},
	
	loadPost : function( post, data )
	{
		post.html( "" );
		var $post_title = $( "<div class='post_title'>" ).appendTo( post );
		$( "<hr />" ).appendTo( post );
		
		//tags		
		var str_tag = "标签："	
		$( data.tags ).each
		(
			function( )
			{
				str_tag += '[' + this + ']';
			}
		);
		$("<small>").appendTo( post ).text( str_tag ).css( { color : 'gray', float: 'right' } );
		
		var $post_content = $( "<div class='post_content'>" ).appendTo( post );
		$( "<hr />" ).appendTo( post );
		var $post_bottom = $( "<div class='post_bottom'>" ).appendTo( post );
		
		//title
		var $t_title = $( "<H1>" ).appendTo( $post_title ); 
		$( "<a title='" + data.title + "'>" ).appendTo( $t_title ).text( data.title ).attr( "href", "blog.html#!" + data.path );
		
		$("<small>").appendTo( $t_title ).text( "[" + data.date + "]" );			
			
		//bottom
		str_tag += "  |  日期：" + "[" + data.date + "]  |  ";
		$( "<a>" ).appendTo( $( "<p>" ).appendTo( $post_bottom ).text( str_tag ).css( { color : 'gray' } ) ).text( "【全文阅读】" ).attr( "href", "blog.html#!" + data.path );
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
		
	indexLoaded : function( data )
	{
		blog.posts = data;
		
		if( blog.posts.length == 0 )
		{
			return;
		}
		
		blog.initPostIndex( );
		blog.initMain( );
				
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