define(['jquery', 'common/js/models/Song.js'], function($, Song) {
	function FakeSrc(query) {

        this.get = function(from, length, cb) {
            data = [];
            for(i = from ; i < from+length ; i++) {
                data.push(new Song({
                	title: "Resultat n°"+(i+1), 
                	src: 'Fake source'
                }));
            }
            cb(null, data);
        }
	};
	FakeSrc.title = "FakeSrc";

	return FakeSrc;
});