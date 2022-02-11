Vue.component('app-bird',{
    template:`
    <div class="bird-component">
        <div v-if="$route.params.id" class="bird-container">
            <div class="bird-content">
            
                <h1>{{bird.common_name}}</h1>
                <h5>{{bird.scientific_name}}</h5>
                <p>Habitat: {{bird.habitat}}</p>
                <p>Diet: {{bird.diet}}</p>
                <p>Local status: {{bird.abundance}} {{bird.status}}</p>
                <p>{{bird.description}}</p>
            </div>
            <div class="img-container">
            <div class="tape tape-top"></div>
            <div class="tape tape-bottom"></div>
            <img :src="[bird.image=='default.jpg' ? './images/'+bird.image : bird.image]">
            </div>
        </div>
        
    </div>
    
    `,
    
    data(){
        return {
            bird:{}
        }
    },
    mounted(){
        console.log(this.$route.params.id);
        
        //let birds = JSON.parse(sessionStorage.birds)
        this.bird = birds.find(d=>{
            
            return d.index == this.$route.params.id
        })
        console.log(birds);
        console.log(this.bird);

    }


})
