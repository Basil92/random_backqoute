var quote = document.getElementById('quote');
var author = document.getElementById('author');
var twitter = document.getElementsByClassName('twitter-share-button')[0];
var newQuote = document.getElementById('new-quote');
var themeColors = ['rgb(22, 160, 133)','rgb(39, 174, 96)','rgb(44, 62, 80)','rgb(47, 79, 79)','rgb(30, 144, 255)','rgb(95, 158, 160)','rgb(155, 89, 182)','rgb(199, 21, 133)','rgb(231, 21, 133)','rgb(243, 156, 18)'];
var color = 0;

function getXmlHttp(){
	var xmlhttp;
	try {
    	xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
  	} catch (e) {
	    try {
	    	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	    } catch (E) {
	    	xmlhttp = false;
	    }
	}
	if (!xmlhttp && typeof XMLHttpRequest!='undefined'){
		xmlhttp = new XMLHttpRequest();
  	}
	return xmlhttp;
}

var quoteList;
var xmlhttp = getXmlHttp()
xmlhttp.open('GET', 'quotes.json', true);
xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == 4) {
		if(xmlhttp.status == 200) {
	    	quoteList = JSON.parse(xmlhttp.responseText);
	    	generateNewQuote();
			newQuote.addEventListener("click", generateNewQuote, false);
		}
	}
};
xmlhttp.send(null)

// console.log(quoteList);


generateNewQuote = function(){
	if (quoteList) {
		var index = Math.floor(Math.random()*quoteList.quotes.length);
		var quoteHtm = quoteList.quotes[index].quote;
		var authorHtm = '- ' + quoteList.quotes[index].author;
		quote.innerHTML = quoteHtm;
		author.innerHTML = authorHtm;
		twitter.href = "https://twitter.com/intent/tweet?text=" + quoteHtm + authorHtm +"&url=" + "http%3A%2F%2Fbasil.github.io";
		less.modifyVars({
		'@themeColor' : changeTheme()
		})
	}
}

function changeTheme(){
	if (color===10){
		color = 0;
	}
	return themeColors[color++];
}
