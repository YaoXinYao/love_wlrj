import {defineStore} from 'pinia'

import {getUnSign} from '@/service/sign/sign'


interface signStoreConfig {
    signList:any[],
    allCount:number,
    allPage:number,
    pageIndex:number,
    size:number,
    currentQuery:any
}



const signStore = defineStore('signStore',{
    state:():signStoreConfig=>({
        signList:[],
        allCount:0,
        allPage:0,
        pageIndex:0,
        size:0,
        currentQuery:{},
    }),
    actions:{
        async getSign(query:any){
            const result = await getUnSign(query)

            this.currentQuery = query
            this.signList = result.data.value.data.list
            this.allCount = result.data.value.data.allCount
            this.allPage = result.data.value.data.allPage
            this.pageIndex = result.data.value.data.pageIndex
            this.size = result.data.value.data.size
            console.log(this.signList)
        }
    }
})


export default signStore