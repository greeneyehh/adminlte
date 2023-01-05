$(document).ready(function(){
    
$.fn.Popup = function(options) 
{	
	options = $.extend({
		url: false,
		popup: false,
	})

	
	var getContent = function()
	{
				
		options.url = $(this).attr('url')

		
		$.ajax({
			type: 'GET',
			url: options.url,
			dataType: 'json',
			success: function(response)
			{	
			
				if($('body').find('#popup').length)
					closePopup()
						
				if(response.success)
				{
		      
		      $('body').prepend(response.template)
		      options.popup = $('body').find('#popup')
		      
		      options.popup.find('.cancel, .close').bind('click', closePopup)		      		
		      options.popup.find('.save').bind('click', saveContent)
		      $(document).unbind('keydown', keyPressed).bind('keydown', keyPressed)		      		

				
				}
			},
			error: function(response)
			{
				// @todo ajax error handler
			}
			
		});
		
		return false	
		
	}
	
	
	var saveContent = function()
	{
		
		
		content = {}
		
		options.popup.find('form').children('input[type=text], input[type=submit], textarea').each(function(){
			
				content[$(this).attr('name')] = $(this).val() 
			
		})

		
		$.ajax({
			type: 'POST',
			url: options.url,
			dataType: 'json',
//			contentType: "charset=utf-8",
			data: { content : content,},
			success: function(response)
			{				
				if(response.success)
				{
		      
		      console.log(response)
		      
		      closePopup()
		      
		      if($('body').find("#PositionList"))
		      	$('body').find("#PositionList").empty().html(response.template)
		      	$('body').find("#PositionList .each .edit").bind("click", getContent)
		      	
				
				} else // Success false
				{
					
					$.each( response.errors, function( field, error ) {					  					

					  if(!options.popup.find('.error.'+field).length)
					  options.popup.find('form .'+field+'').after('<p class="error '+field+'">'+error+'</p>')
					  //alert( key + ": " + value );
					});
					
				}
				
			},
			error: function(response)
			{
				// @todo ajax error handler
			}
			
		});
		
		return false	
		
		
		
	}
	
	
	var closePopup = function()
	{
		
		$('body').find('#popup').fadeOut(100, function(){
			$(this).remove()
		})
				
		$(document).unbind('keydown', keyPressed)
		
		return false;
		
	}
	
	
	var keyPressed = function(e)
	{	
		
		if(e.keyCode == 27){ 	        
      closePopup();
      $(document).unbind('keydown', keyPressed)
      return false
		}
		
/*
		if(e.keyCode == 13){
      saveContent();
 
      return false
		}
*/
		
	}

	
	
	$(this).click(getContent)

}


	
	$('#PositionCreateTop, #PositionCreateBot, #PositionList .each .edit').Popup({})

	
})