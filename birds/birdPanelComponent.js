Vue.component('app-bird-panel', {
    template:`
  
    <div class="birds-panel">
        <div class="birds-panel-header">
        <h1>Birds of singapore</h1>
        <div class="search">
            <input type="text" v-model="search" @keyup="load($event)" placeholder="Search">
        </div>
        </div>
        <div class="birds-panel-content">
            
            <div class="birds-grid">
                <div class="card" v-for="b in birds" v-if="b" @click="location.href='./#/birds/'+b.index">
                
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
    </div>
    `,
    data(){
        return {
            search:'',
            families:[],
            family:'',
            birds,
            orders:[],
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
           console.log(this.family);
            this.birds = birds.map(b=>{
                if(b.common_name.toLowerCase().includes(this.search) || b.scientific_name.toLowerCase().includes(this.search)){
                    
                    if(b.family.includes(this.family)){
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
        console.log(birds);
        for(let i =0;i<birds.length;i++){
            console.log(birds[i]);
        }
        birds.forEach(b=>{
            console.log(b)
            f.add(b.family+","+b.order)
            o.add(b.order)
            
           
        })
       
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
                console.log(f.f,o.o);
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