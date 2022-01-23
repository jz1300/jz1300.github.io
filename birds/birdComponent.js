Vue.component('app-bird',{
    template:`
    <div>
        <div class="bird-content">
        
            <h1>{{bird.common_name}}</h1>
            <h5>{{bird.scientific_name}}</h5>
            <p>Habitat: {{bird.habitat}}</p>
            <p>Diet: {{bird.diet}}</p>
            <p>Local status: {{bird.abundance}} {{bird.status}}</p>
            <p>{{bird.description}}</p>
        </div>
        <img :src="'images/'+bird.image">
    </div>
    `,
    
    data(){
        return {
            id:this.$route.params.id,
            bird:{}
        }
    },
    mounted(){
        
        let birds = JSON.parse(sessionStorage.birds)
        this.bird = birds.find(d=>{
            
            return d.index == this.$route.params.id
        })
        console.log(birds);
        console.log(this.bird);

    }


})