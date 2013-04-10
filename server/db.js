/*
    Represents the CRUD service for everything in the app.
    
    A "party" describes an event that is fired. It has a name, a playlist, 
    a state (on/off), an alias, a message (optionnal, shown on devices that 
    can display it or when the party is off).
    
    When a party is created, a playlist is also created. The playlist can be copied
    from a previously existing playlist. The party's playlist can be saved under a new name
    or overrite a previously playlist.
    The party can be accessed with website/p/<alias>
    The alias is mandatory, otherwise users can't access it (later : generate random alias)
    
    If the party is off but users accesses it, a message should display that the party is currently off
    and show the party's message.
    
    A playlist is just an ordered list of songs. It has also a title, a mark, some data regarding songs.
    A playlistPlayer is based on a playlist but receives votes and has a separate intern list of songs
    to play. The votes can alter the contained playlist which can then be saved.
    
    That way, a playlist can evolve as it is being used. Songs can be added, removed and trends changes in time
    (TODO : find badass algorithm to accurately reflect trends based on party votes)
    
    //Later :
    A member should have a list of playlists and parties.
    He can manage them via an interface and create a party before it is thrown (by setting its state to off).
    
    The home page can show "top hits" and some trends regarding songs. We can easily collect all the required data
    from the parties. The hard part would be to remove doubles and to accurately track song trends.
    Songs should have some properties to keep track of their popularity.
    
    Playlists could be made public so that other "partiers" can rate them and use them in theyr parties.

*/

var store = require('memoryStore');

module.exports = {
    
    // Creates a new party
    createParty: function(){
    
    
    },
    
    // Removes a party
    removeParty: function(){
    
    
    },
    
    // Gets a party
    getParty: function(){
    
    
    },
    
    //Update a party's informations
    updateParty: function(){
    
    
    },
    
    // Adds a song to a playlist
    addSong: function(){
    
    },
    
    //Removes a song from a playlist
    removeSong: function(){
    
    }
    
};