console.log(photos);

var app = new Vue({
    el: '#app',
    data: {
      photos: photos
    },
    created: function () {
      console.log(this.photos)
      this.photos.forEach(photo => {
          photo.columnStart = Math.floor(Math.random() * Math.floor(9)) +1;
          photo.rowStart = Math.floor(Math.random() * Math.floor(9)) +1;
      })
    }
});
