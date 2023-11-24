import {defineStore} from 'pinia'
import type {Announcement} from './store'
import {insertNotice, getNotice} from '@/service/announcement/announcement'


const annoucementStore = defineStore('annoucementStore',{
    state: ():Announcement =>({
        announcementList: [],
        loading:false,
    }),
    actions:{
        async getAnoucementAction(queryInfo:any){
            this.loading = true
            let listResult = await getNotice(queryInfo)
            this.loading = false
            // console.log(listResult.data.value.data.records)
            this.announcementList = listResult.data.value.data.records
            // console.log(this.announcementList)
            for(let item in this.announcementList){
                let time = this.announcementList[item].noticeTime
                let times = new Date(time)
                // console.log(times)
                time  = times.getFullYear() +'-' + (times.getMonth()+1)+ '-' + times.getDate();
                // console.log(time)
                this.announcementList[item].noticeTime = time
            }
        },
        
    }
})


export default annoucementStore;