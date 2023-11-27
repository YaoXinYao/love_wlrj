import {defineStore} from 'pinia'
import {getNew} from '@/service/journalism/journalism'


const journalismStore = defineStore('journalism',{
    state:()=>({
        newList:[],
        loading:false
    }),
    actions:{
        async getNew(query:any){
            this.Loading = true
            const result = await getNew(query)
            this.Loading = false
            console.log(result.data.value)
            this.newList = result.data.value.data.records
        }
    }
})



export default journalismStore;