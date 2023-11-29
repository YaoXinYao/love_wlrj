import {defineStore} from 'pinia'
import {getSaveSchedule} from '@/service/attendance/attendance'

interface timerType {
    grade:string,
    morningStart:string,
    morningEnd:string,
    afternoonStart:string,
    afternoonEnd:string,
    nightStart:string,
    nigthtEnd:string,
}



interface attendanceType {
    timer:timerType[]
    loading:boolean
}


const AttendanceStore = defineStore('attendance',{
    state: ():attendanceType=>({
        timer:[],
        loading:false                                                                                                                        
    }),
    actions:{
        async getAllSchedule(morningStart?:any,morningEnd?:any,afternoonStart?:any,afternoonEnd?:any,nightStart?:any,nigthtEnd?:any){
            this.loading=true
            const msResult:any =  await getSaveSchedule() 
            this.loading = false
            // this.timer = msResult
            this.timer = msResult[1]
            // console.log(this.timer)
        }
    }
})



export default AttendanceStore