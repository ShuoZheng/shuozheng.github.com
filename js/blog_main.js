var blog = 
{
	posts: null,
	title: document.title,
	post_tags: {},
	filter_tags: [],
	current_path: "",
	current_index: 0,
	current_state: "", // post/index
	con: new showdown.Converter( { tables: true, literalMidWordUnderscores: true } ),
	max_load_counter: 5,

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
		
		var $load_counter = 0;
		$( blog.posts ).each
		(
			function()
			{
				if( this.tags[ 0 ] != "hide" )
				{
					var $post = $("<div class='post'>").appendTo( $("#main") );
					blog.loadPost( $post, this );
					$load_counter += 1;
					if( $load_counter >= blog.max_load_counter ) {
						return false;
					}
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
		$('pre code').each(function(i, e) {
			var is_has_numbering = blog.isHashClass( this, "has-numbering" );
			if( is_has_numbering ) {
				return
			}
			hljs.highlightBlock(e)

			var lines = $(this).text().split('\n').length - 1;
	        var $numbering = $('<ul/>').addClass('pre-numbering');
	        $(this)
	            .addClass('has-numbering')
	            .parent()
	            .append($numbering);
	        for(i=1;i<=lines;i++){
	            $numbering.append($('<li/>').addClass('pre-numbering').text(i));
	        }
	        $('.pre-numbering li').css("height",$(this).height()/lines);

		});
		
	    //为超链接加上target='_blank'属性
		$('a[href^="http"]').each(function() {
			$(this).attr('target', '_blank');
		});
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
				
	},
  
  initData : function() {
    // load post index
    $.ajax({
        url : "post/index.json",
        dataType : 'json',
        success : blog.indexLoaded
    });  
  }
  
}
