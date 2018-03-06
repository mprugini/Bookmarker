//listen for form submit
document.getElementById("myForm").addEventListener("submit",saveBookmark);

function saveBookmark(e){
	var siteName = document.getElementById("siteName").value;
	var urlName = document.getElementById("urlName").value;
	
	if(!validateForm(siteName,urlName)){
		return false;
	}
	
	var bookmark = {
		name: siteName,
		url: urlName
	}
	
	if(localStorage.getItem("bookmarks") === null){
		//init array
		var bookmarks = [];
		
		//add to array
		bookmarks.push(bookmark);
		
		//set to localStorage
		localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
	}
	
	else {
		//get bookmarks from localStorage
		var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
		
		//add bookmarks to an array
		bookmarks.push(bookmark);
		
		//re-set back to localStorage
		localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
	}
	
	displayBookmarks();
	
	//clear the input fields after submitting it
	document.getElementById("siteName").value = "";
	document.getElementById("urlName").value = "";
	
	//prevent form from submitting
	e.preventDefault();
}

//delete bookmark
function deleteBookmark(url){
	//get bookmarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
	
	for (var i = 0; i < bookmarks.length; i++){
		if(bookmarks[i].url == url){
			//remove from array
			bookmarks.splice(i,1);
		}
	}
	//re-set back to localStorage
	localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
	
	displayBookmarks();
}

//display saved bookmarks 
function displayBookmarks(){
	//get bookmarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
	
	//get output id
	var bookmarksResults = document.getElementById("bookmarksResults");
	
	//build output
	bookmarksResults.innerHTML = "";
	
	for (var i = 0; i < bookmarks.length; i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;
		
		bookmarksResults.innerHTML += '<div class="well">' +
										'<h3>' + name +
										' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
										' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
										'</h3>' +
									  '</div>';
	}
}

//form validation 
function validateForm(siteName, urlName){
	if (!siteName || !urlName){
		alert("Please fill in the form!");
		return false;
	}
	
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);
	
	if(!urlName.match(regex)){
		alert("Please enter a valid URL name");
		return false;
	}
	
	return true;
}