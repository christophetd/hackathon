var _this;

function SourcesView(hash, localFiles){
	
	//HTML list holding search results in the library
	var list = $('#library_list');
	
	$('#library_search').submit(function(evt){
		evt.preventDefault();
		
		console.log("hello les pauvres");
		//TODO : implement search
	});
	
	_this = this;
	
	this.openFiles = function(files){
		console.log(files[0]);
		$('#library_filesInput').replaceWith(
			$('<input style="overflow: hidden; width: 1000px; height: 1000px; opacity: 0; position: absolute;" id="library_filesInput" type="file" class="btn" accept="sound/*" multiple onchange="sourcesView.openFiles(this.files)" name="localFileSelection"/>')
		);
		
		for(var i = 0 ; i < files.length ; i++){
			localFiles.add(files[i]);
		}
	};
	
}

function sourceViewOpenFiles(files){
	_this.openFiles(files);
}