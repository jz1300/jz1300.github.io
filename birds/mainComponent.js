Vue.component('app-main', {
    template:
    `
    <div>
        <h1>TEST</h1>
        <div class="circle-carousel" :style="'transform:rotate('+angle+'deg)'">
            <div class="carousel-page" style="background-color:red;"></div>
            <div class="carousel-page" style="background-color:blue;"></div>
            <div class="carousel-page" style="background-color:green;"></div>
            <div class="carousel-page" style="background-color:yellow;"></div>
        </div>
        <button @click="rotate()">Next</button>
    </div>
    `,
    data(){
        return {
            birds,
            angle:-5,
        }
    },
    methods:{
      rotate(){
        this.angle -= 90;
      }  
    },
    mounted(){
      console.log(this.birds);
        
       
        
    }
})