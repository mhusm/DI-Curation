const config = require('./config.js');
const Flickr = require("flickrapi"),
    flickrOptions = {
      api_key: config.api_key,
 //     api_key: "",
      secret: config.secret
    };
 
const https = require('https');
const fs = require('fs');
const path = require('path');
const util = require('util');
    

Flickr.tokenOnly(flickrOptions, function(error, flickr) {
  // we can now use "flickr" as our API object,
  // but we can only call public methods and access public data
  if (error) {
    console.error(error);
    return;
  }

  const photosearch  = util.promisify(flickr.photos.search);
  const getinfo = util.promisify(flickr.photos.getInfo);


  photosearch({
    text: "architecture",
    tags: "mountains",
    tag_mode: "all",
    page: 1,
    per_page: 10,
    color_codes : '0',
    sort: 'interestingness-desc'
  }).then(result => {
  
    // Photos auf die Festplatte speichern
    result.photos.photo.forEach( (photo, index) => {
      // Photos beim Server holen
      var request = https.get( `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`, function(response) {
        var file = fs.createWriteStream(path.join("public", "photos", `${photo.id}.jpg`));
        response.pipe(file);
      });
    });
    
    //Mehr Infos zu den Photos abfragen
    var infoPromises = result.photos.photo.map(photo => {
      return getinfo({
        photo_id: photo.id,
        secret: photo.secret});
    });
    return Promise.all(infoPromises);
  }).then(result => {
    // Infos zu den Photos in der Datei photoinfo.json auf die Festplatte speichern
    var photoInfo = {};
    result.forEach(p => {
      var photo = p.photo;
      photoInfo[photo.id] = {
        tags: photo.tags.tag.map( tag => {
          return tag._content;
        }),
        description: photo.description._content,
        title: photo.title._content};
    })

    fs.writeFile(path.join('public', 'photoinfo.js'), "var photos = " +JSON.stringify(photoInfo), 'utf8', 
      err => {if(err) throw err;}
    );


  }).catch( err => {
    console.error(err);
    process.exit(1);
  });


});