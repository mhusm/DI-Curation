var app = new Vue({
    el: '#app',
    data: {
      photos: photos,
    },
    methods: {
      randomize: function () {
        this.photos.forEach(photo => {
          photo.isIn = true;
          setTimeout(function(){
            photo.groesse =  Math.floor(Math.random() * Math.floor(3)) +1
            photo.columnStart = Math.floor(Math.random() * Math.floor(9)) +1;
            photo.rowStart = Math.floor(Math.random() * Math.floor(9)) +1;
            photo.grid = photo.rowStart   
              +' / ' +photo.columnStart 
              +' / ' +(photo.rowStart +photo.groesse)  
              +' / ' +(photo.columnStart +photo.groesse);
            photo.isIn = false;
          }, 2000);
        })
      },
      transition: function (event) {
        console.log(event)
        event.target.classList.toggle("test");
      }
    },  
    created: function () {
      photos.splice(10, 50);
      this.randomize();
    }
});
