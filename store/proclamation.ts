import {defineStore} from 'pinia'
import {getAffiches} from '@/service/proclamation/proclamation'
interface proclamationType {
    latestProclamation:string ,
    proclamation:[]
}

const proclamationStore = defineStore('proclamationStore',{
    state: ():proclamationType =>({
        latestProclamation:'',
        proclamation:[]
    }),
    actions:{
        async getProlamation(query:any){
            const result = await getAffiches(query)
            this.proclamation = result.data.value.data.records
            this.latestProclamation =  result.data.value.data.records[0]
            console.log(result.data.value)
        }
    }
})



export default proclamationStore