var Enum = require('enum');

class Place{
    constructor(){
        this.id = 0;
        this.name = '';
        this.photo = '';
        this.photoType = PlaceType;
        this.photoUrl = '';
    }
}

const PlaceType = new Enum({'Image': "IMG", 'URL': "URL"});
