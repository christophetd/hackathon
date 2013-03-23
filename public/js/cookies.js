function readCookie(cookieName) {
	console.log(document.cookie+"<--");
}
function setCookie(c_name,value,exdays)
 {
	 var exdate=new Date();
	 exdate.setDate(exdate.getDate() + exdays);
	 var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	 document.cookie=c_name + "=" + c_value;
 }
function cookieExists() {

}

setCookie("mytest", "myvalue", 360);
readCookie("mytest");