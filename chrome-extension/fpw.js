(function() {

	var itemId = document.getElementsByName('id')[0].value;
	var appId = document.getElementsByName('appid')[0].value;
	var sessionId = document.getElementsByName('sessionid')[0].value;
	var requiredItems = document.getElementsByName('requiredItems');

	var sendRequest = function (id) {

		var xhr = new XMLHttpRequest();
		var url = 'https://steamcommunity.com/sharedfiles/subscribe/';
		var params = 'id=' + id + '&appid=' + appId + '&sessionid=' + sessionId;
		xhr.responseType = 'json';
		xhr.open('POST', url, true);

		xhr.setRequestHeader('x-requested-with', 'XMLHttpRequest');
		xhr.setRequestHeader('Accept', 'text/javascript, text/html, application/xml, text/xml, */*');
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");

		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4 && xhr.status == 200) {
				switch( xhr.response.success )
				{
					case 1:
					{
						console.log('successfully subscribed to item: ' + id);
					}
					break;

					case 15:
					{
						alert( "You do not have permission to subscribe to this item." );
					}
					break;

					case 25:
					{
						alert( "You cannot subscribe to this item because you have reached the limit of 15,000 subscriptions across all products on Steam." );
					}
					break;

					default:
					{
						alert( "There was a problem trying to subscribe to this item. Please try again later." );
					}
					break;
				}
			}
		}

		xhr.send(params);
	};

	for (i = 0; i < requiredItems.length; i++) {
		sendRequest(requiredItems[i].value);
	}

	sendRequest(itemId);

	setTimeout(function(){
		window.location.reload(1);
	}, 2000);

})();
