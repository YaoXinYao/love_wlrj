import {defineStore} from 'pinia'
import {getNew} from '@/service/journalism/journalism'


const journalismStore = defineStore('journalism',{
    state:()=>({
        newList:[]
    }),
    actions:{
        async getNew(){
            const result = await getNew({pageNo:1,pageSize:10})
            console.log(result)
        }
    }
})



export default journalismStore;