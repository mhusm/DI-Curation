var app = new Vue({
    el: '#app',
    data: {
      photos: photos,
      photos1: photos,
      photos2: photos,
      photos3: photos,
      photos4: photos,
      photos5: photos,
      photos6: photos
    },
    methods: {
      randomize: function () {
      },
      transition: function (event) {
        console.log(event)
        event.target.classList.toggle("test");
      }
    },  
    created: function () {
      this.photos1 = photos.slice(0, 5);
      this.photos2 = photos.slice(5, 15);
      this.photos3 = photos.slice(15, 27);
      this.photos4 = photos.slice(27, 37);
      this.photos5 = photos.slice(37, 45);
      this.photos6 = photos.slice(45, 50);
      this.randomize();
    }
});
