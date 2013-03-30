SquareTune
=========
SquareTune is a collaborative music system for your parties, designed for you.
Create playlists by importing music from YouTube or your hard drive and let your friends vote from their smartphone for the music they want to listen to. Anyone can also suggest a song via an integrated YouTube search.

Setup
=====

Clone the project into your working dir
`git clone [project_uri]`

Install node dependecies
`npm install`

Then run the server
`node index.js`

Navigate to http://localhost:5000/ with your favourite browser and enjoy :)


Guidelines
==========

Here are a few guidelines to keep the project consistent. Feel free to extend them

File structure
--------------

	+- index.js 		: node entry point
	+- server/			: server files executed by node.js
	+- package.json 	: node dependencies declaration
	+-+ www/			: public files served statically
	| +- index.html 	: desktop app index file here so that the url doesn't look crappy
	| +- m/				: mobile app
	| +- app/			: desktop app
	| +-+ common/		: shared files between
	+-+ html/			: html files explicitely sent by the router
	| +- desktop.html 	: page for the desktop app
	| +- mobile.html	: page for the mobile app
	+- old/				: files from the hackathon to recycle and then delete

If a mobile user navigates to the root ( '/' ), he will be redirected to /m so there is no problem.

In '/server/' files are camel-cased, beginning with lower case (ex: server/myServerFile.js)
In '/www/' every js file is under a js/ folder, css under css/ and images under img/ (ex : www/app/js/main.js or www/common/js/lib/jquery.min.js)
Client-side js class files are camel-cased 'java-like' (starts with upper case). It concerns models, views, collections and anything that looks like a class.

Backbone models should be shared between desktop and mobile, therefore placed into '/www/common/'
Third parties libraries should also be placed in /www/common.
