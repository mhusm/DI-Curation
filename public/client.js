var app = new Vue({
    el: '#app',
    data: {
      photosOrig: photos,
      photos: photos.slice(0, photos.length),
      orderDesc: true,
      filterX: false
    },
    watch: {
      // whenever filterX changes, this function will run
      filterX: function (newFilterX, oldFilterX) {
        if (newFilterX) {
          this.photos = this.photos.filter(photo => {
            return photo.boolean;
          });
        }
        else {
          this.photos = this.photosOrig.slice(0, this.photosOrig.length);
          this.sort();
        }
      }
    },
    methods: {
      transition: function (event) {
        console.log(event)
        event.target.classList.toggle("test");
      },
      switchSort: function() {
        this.orderDesc = !this.orderDesc;
        this.sort();
      },
      sort: function() {
        if (this.orderDesc) {
          // Photos sortieren
          this.photos.sort((a,b) => {
            return b.rank - a.rank ; //nach "rank", absteigend
          });
        } else {
          // Photos sortieren
          this.photos.sort((a,b) => {
            return a.rank - b.rank ; //nach "rank", aufsteigend
          });
        }
      }
    },  
    created: function () {
      this.sort();
      console.log(this.photos);

    }
});
