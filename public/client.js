var app = new Vue({
    el: '#app',
    data: {
      photosOrig: photos,
      photos: photos.slice(0, photos.length),
      photos1: photos.slice(0, 10),
      photos2: photos.slice(10, 30),
      photos3: photos.slice(30, 60),
      photos4: photos.slice(60, 85),
      photos5: photos.slice(85, 90),
      orderDesc: true,
      filterX: false,
      selectedText: "alle",
      grid: false,
      number: true
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
      },
      number: function() {
        this.updatePhotos();
      },
      grid: function() {
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
      sortIntoBuckets: function() {
        this.photos1 = [];
        this.photos2 = [];
        this.photos3 = [];
        this.photos4 = [];
        this.photos5 = [];
        this.photos.forEach(photo => {
          switch (photo.number) {
            case 1:
              this.photos1.push(photo);
              break;
            case 2:
              this.photos2.push(photo);
               break;
            case 3:
              this.photos3.push(photo);
              break;
            case 4:
              this.photos4.push(photo);
              break;
            case 5:
              this.photos5.push(photo);
              break;
            default:
              console.log("number does not match " +photo.number)
              break;
          }          

        });
      },
      updatePhotos: function() {
        // Filtern nach x
        this.applyFilterX();

        // Filtern nach text
        this.applySelectedText();

        // Sortieren
        this.sort();

        // Grid berechnen
        if (this.grid) {
          this.calculateGrid();
        }

        if (this.number) {
          this.sortIntoBuckets();
        }
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
