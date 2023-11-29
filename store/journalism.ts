import {defineStore} from 'pinia'
import {getNew} from '@/service/journalism/journalism'


interface JournalismType {
    newList:any[],
    loading:boolean
}

const journalismStore = defineStore('journalism',{
    state:():JournalismType=>({
        newList:[],
        loading:false
    }),
    actions:{
        async getNews(query:any){

            this.loading = true
            const result = await getNew(query)
            this.loading = false
            // console.log(result.data.value)
            this.newList = result.data.value.data.records
        }
    }
})



export default journalismStore;