var app = new Vue({
    el: '#app',
    data: {
      photosOrig: photos,
      photos: photos.slice(0, photos.length),
      orderDesc: true,
      filterX: false,
      selectedText: "alle",
      grid: true
    },
    watch: {
      // whenever filterX changes, this function will run
      filterX: function (newFilterX, oldFilterX) {
        if (!newFilterX) {
          this.photos = this.photosOrig.slice(0, this.photosOrig.length);
        }
        this.updatePhotos();
      },
      // whenever selectedText changes, this function will run
      selectedText: function (newSelectedText, oldSelectedText) {
        this.photos = this.photosOrig.slice(0, this.photosOrig.length);       
        this.updatePhotos();
      }
    },
    methods: {
      transition: function (event) {
        console.log(event)
        event.target.classList.toggle("test");
      },
      applyFilterX: function() {
        if (this.filterX) {
          this.photos = this.photos.filter(photo => {
            return photo.boolean;
          });
        }
      },
      applySelectedText: function() {
        if (this.selectedText !=="alle") {
          this.photos = this.photos.filter(photo => {
            return photo.text === this.selectedText;
          });
        }

      },
      updatePhotos: function() {
        // Filtern nach x
        this.applyFilterX();

        // Filtern nach text
        this.applySelectedText();

        // Sortieren
        this.sort();

        // Grid berechnen
        this.calculateGrid();
      },
      switchSort: function() {
        this.orderDesc = !this.orderDesc;
        this.updatePhotos();
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
      },
      calculateGrid: function() {
        var columns = 15; // 15 x 15 ergibt Diagonale fuer 120 Photos
        var rows = 15;
        var maxSize = 3;
        // zufaellige Positionierung und Groesse
        /*
        this.photos.forEach(photo => {
          photo.groesse =  Math.floor(Math.random() * Math.floor(maxSize)) +1;
          photo.columnStart = Math.floor(Math.random() * Math.floor(columns -1)) +1;
          photo.rowStart = Math.floor(Math.random() * Math.floor(rows -1)) +1;
          photo.grid = photo.rowStart   
            +' / ' +photo.columnStart 
            +' / ' +(photo.rowStart +photo.groesse)  
            +' / ' +(photo.columnStart +photo.groesse);
        });
  */
        // diagonal angeordnet
        var current_row = 1;
        var current_column = 1;
        this.photos.forEach((photo, index) => {
          photo.groesse =  1;
          if (current_column < columns+1) {
            photo.columnStart = current_column;
            current_column += 1;
          } else {
            current_row += 1;
            photo.columnStart = 1;
            current_column = 2;
            columns -= 1;
          }
  
          photo.rowStart = current_row;
          photo.grid = photo.rowStart   
            +' / ' +photo.columnStart 
            +' / ' +(photo.rowStart +photo.groesse)  
            +' / ' +(photo.columnStart +photo.groesse);
          console.log(photo.grid);
        });
  
      }
    },  
    created: function () {
      this.updatePhotos();
      console.log(this.photos);


    }
});
