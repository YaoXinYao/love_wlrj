import {defineStore} from 'pinia'
import {Announcement} from './store'


const annoucementStore = defineStore('annoucementStore',{
    state: ():Announcement =>({
        announcementList: []
    }),
    actions:{
        async postAnoucementAction(queryInfo:any){
            // const postResult = await 
            // this.announcementList
        },
        
    }
})