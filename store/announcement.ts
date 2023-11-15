import {defineStore} from 'pinia'
import type {Announcement} from './store'
import {insertNotice, getNotice} from '@/service/announcement/announcement'


const annoucementStore = defineStore('annoucementStore',{
    state: ():Announcement =>({
        announcementList: []
    }),
    actions:{
        async getAnoucementAction(queryInfo:any){
            let listResult = await getNotice(queryInfo)
            console.log(listResult.data.value.data.records)
            this.announcementList = listResult.data.value.data.records
        },
        
    }
})


export default annoucementStore;