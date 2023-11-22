import {defineStore} from 'pinia'
import {getLeave} from '@/service/check/check'


interface stateProps{
    checkList:any[],
    allCount:number,
    allPage:number,
    pageIndex:number,
    pageSize:number,
    currentQuery:any,
    loading:boolean,
}


const check = defineStore('check',{
    state: ():stateProps=>({
        checkList:[],
        allCount:0,
        allPage:0,
        pageIndex:0,
        pageSize:0,
        currentQuery:{},
        loading:true,
    }),
    actions:{
        async getCheckList(query:any){
            this.loading = true
            const listResult = await getLeave(query)
            this.loading = false
            // console.log(listResult.data)
            // console.log(listResult.data.value)
            const list = listResult.data.value.data.list
            const count = listResult.data.value.data.allCount;
            const Page = listResult.data.value.data.allPage;
            const pageIndex =  listResult.data.value.data.pageIndex;
            const size = listResult.data.value.data.size;
            // console.log(listResult.data.value.data.list)
            this.currentQuery = query
            this.allCount = count
            this.allPage = Page
            this.checkList = list
            this.pageIndex = pageIndex;
            this.pageSize = size;
            // console.log(this.currentQuery)
            // console.log(this.checkList,this.allCount,this.allPage)
        }
    }
})


export default check;