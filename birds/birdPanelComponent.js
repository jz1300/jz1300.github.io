Vue.component('app-bird-panel', {
    template:`
  
    <div class="birds-panel">
        <div class="birds-panel-header">
        <div>
            <div class="habitat-select">
                    <span class="habitat">Habitat</span>
                    <select v-model="selected_h" @change="load()">
                            <option selected></option>
                            <option v-for="h in habitats" v-if="h" :value="h">
                            {{h.replace('_', " ")}}
                            </option>
                    </select>
            </div>
        </div>
            <p>{{count}} results</p>
        <div class="search">
            
            <input type="text" v-model="search" @keyup="load($event)" placeholder="Search">
        </div>
        </div>
        <div class="birds-panel-content">
            
            <div class="birds-grid">
                <div class="card" v-for="b in birds" v-if="b" @click="selected_bird=b;birdSelected=true">
                
                    <img :src="[b.image=='default.jpg' ? './images/'+b.image : b.image]">
                    <p>{{b.scientific_name}}</p>
                    <h2>{{b.common_name}}</h2>
               
                </div>
            </div>
            <div class="bird-families">
                <div class="order" v-for="(o, oi) in orders">
                    <h2>{{o.o}}</h2>
                    <p v-for="(f,index) in o.f" @click="family_click(f, index, oi)" :class="orders[oi].f[index].clicked?'f-highlight':''">{{f.f}}</p>

                </div>
            </div>
        </div>
        <div class="selected_bird" v-if="birdSelected" @click.self="birdSelected=false">
            <div class="bird">
                <img :src="[selected_bird.image=='default.jpg' ? './images/'+selected_bird.image : selected_bird.image]">
                <div class="bird-content">
                    <p>{{selected_bird.scientific_name}}</p>
                    <h1>{{selected_bird.common_name}}</h1>
                    <br>
                    <p><span class="habitat">Habitat</span> {{selected_bird.habitat_desc}}</p>
                    <br>
                    <p><span class="diet">Diet</span> {{selected_bird.diet}}</p>
                    <br>
                    <p><span class="local-status">Local status</span> {{selected_bird.abundance}} {{selected_bird.status}}</p>
                    <br><br>
                    <p>{{selected_bird.description}}</p>
                </div>
            </div>
        </div>
    </div>
    `,
    data(){
        return {
            search:'',
            families:[],
            family:'',
            birds,
            habitats,
            orders:[],
            selected_h:"",
            selected_bird:{},
            birdSelected:false,
            count:0,

        }
    },
    methods:{
        family_click(f, index, oi){
            
            if(f.clicked){
                this.orders[oi].f[index].clicked=false;
                this.family = ''
            }
            else{
                this.family=f.f;
                this.orders = this.orders.map(o=>{
                    o.f = o.f.map(f=>{
                        f.clicked = false;
                        return f
                    })
                    return o;
                })
                
                this.orders[oi].f[index].clicked=true;

            }
            // console.log(f.clicked);
            // if(f.clicked){
            //     console.log('ue');
            //     this.families[index].clicked = false
            //     this.family = '';
            // }
            // else{

            //     this.families[index].clicked=true;
            // }
            this.load();
        },
        load(e){
           //console.log(this.family);
            this.count = 0
            this.birds = birds.map(b=>{
                if(this.selected_h==""){
                    if(b.common_name.toLowerCase().includes(this.search) || b.scientific_name.toLowerCase().includes(this.search)){
                        
                        if(b.family.includes(this.family)){
                            this.count++
                            return b;

                        }
                    }
                }
                else if(b.habitat.includes(this.selected_h))
                    if(b.common_name.toLowerCase().includes(this.search) || b.scientific_name.toLowerCase().includes(this.search)){
                        
                        if(b.family.includes(this.family)){
                            this.count++
                            return b;
                        }
                    }
            })
            
            
        }
    },
    mounted(){
        let f = new Set
        let o = new Set
        let orders = []
        let families = []
        //console.log(birds);
        for(let i =0;i<birds.length;i++){
       //     console.log(birds[i]);
        }
        birds.forEach(b=>{
           // console.log(b)
            f.add(b.family+","+b.order)
            o.add(b.order)
            
           
        })
        this.count = birds.length
        families = Array.from(f)
        families = families.map(f=>{
            return {f:f.split(',')[0],clicked:false, o:f.split(',')[1]};
        })

        orders = Array.from(o);
       
        orders = orders.map(o=>{
            return {
                o:o,
                f:[]
            }
        })
        orders.forEach(o=>{
            families.forEach(f=>{
             //   console.log(f.f,o.o);
                if(f.o == o.o){
                    o.f.push(f);
                }
            })

        })
        this.families = families;
        this.orders = orders;
        console.log(this.orders);
        
    }
})