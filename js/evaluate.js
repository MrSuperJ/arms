$(function(){
	jQuery(window).load(function(){ 
		$(".mark_pj .mark_star_m .eval_star").each(function(){
            $(this).find('b').click(function(){
                var _index = $(this).index();
                $(this).parent('.eval_star').parent().find('.evaluate').val(parseInt(_index+1));
                for(var i = 0;i<=_index;i++){
                    $(this).parent('.eval_star').find('b').eq(i).attr('class','yellow');
                    for(var j = _index+1; j<=4 ; j++){
                        $(this).parent('.eval_star').find('b').eq(j).attr('class','gray');
                    }
                }
            });
        });
	})
})		