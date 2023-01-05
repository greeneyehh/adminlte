$(document).ready(function(){

		$("#PositionList").sortable({ opacity: 0.7, cursor: 'move', update: function() {
	
			var order = $(this).sortable( "toArray").toString()			
			var url = $(this).attr('url')
						
			console.log(order)
			
			$.ajax({
				type: 'POST',
				url: url,
				dataType: 'json',
				data:{				
					order: order				
				},
				success: function(response)
				{
					
					if(response.success)
					{
						console.log("order changed")
						
					}
					
				},
				error: function(response)
				{
					// @todo ajax error handler
				}
				
			});
					
										  
		}});

	
})