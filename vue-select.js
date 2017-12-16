Vue.component('test-select',{
    template:`
    <div :class="{'active':visible}" @click.self='togglePanel' ref='main' class="select">
        {{useValue.text}}
        <div class='content' v-show='visible' > 
            <label v-for='s in useOptions' @click='change(s)' >
                <input type='radio' v-model='useValue' :value='s' >
                {{s.text}}              
            </label> 
        </div>
    </div>
    `,
    props:[
        'options',
        'value'
    ],
    model:{
        props:'value',
        event:'change'
    },
    data(){
        return{
            visible:false,
            useValue:'',
            useOptions:[]
        }
    },
    
    beforeMount(){
         this.useValue=this.value?this.value:'' ;
         this.useOptions=this.options?this.options:[] ;
    },
    methods:{
        change:function(s){
            this.visible=false
            this.$emit('change', s)
        },
        togglePanel () {
            this.visible ? this.hide() : this.show()
        },
        show () {
            this.visible = true
            document.addEventListener('click', this.hidePanel, false)
        }, 
        hide () {
            this.visible = false
            document.removeEventListener('click', this.hidePanel, false)
        },
        hidePanel (e) {
            if (!this.$refs.main.contains(e.target)) {
                this.hide()
            }
        }
    },
    beforeDestroy () {
        this.hide()
    }
})