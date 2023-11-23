import HYRquest from '../forum'

interface allTimeType{
    [x:string]:{
        morningStart:string,
        morningEnd:string,
        afternoonStart:string,
        afternoonEnd:string,
        nightStart:string,
        nigthtEnd:string
    }
}

enum typebasic{
    morningStart= "morningStart",
    morningEnd = "morningEnd",
    afternoonStart = "afternoonStart",
    afternoonEnd = "afternoonEnd",
    nightStart = "nightStart",
    nigthtEnd = "nigthtEnd"
}

const basic = {
    morningStart:'',
    morningEnd:'',
    afternoonStart:'',
    afternoonEnd:'',
    nightStart:'',
    nigthtEnd:''

}



export const getSaveSchedule = async ()=>{


    const grade = await HYRquest.get('/coustom/user/user/selectAllGrade')
    let data = grade.data.value.data
    let resultArr:any = []
    for(let j=0;j<data.length;j++){
        let time = {
            grade:'',
            morningStart : '',
            morningEnd : '',
            afternoonStart : '',
            afternoonEnd : '',
            nightStart :'',
            nightEnd : ''
        }
        time.grade = data[j]
        for(let i=1;i<=3;i++){
            // console.log(data[1])
            let msResult = await HYRquest.get('/check/saveSchedule/getSaveSchedule',{gradeLevel:data[j],order:i,status:0})
            let meResult = await HYRquest.get('/check/saveSchedule/getSaveSchedule',{gradeLevel:data[j],order:i,status:1})
            // console.log(msResult.data.value)
            if(i===1){
                time.morningStart = msResult.data.value.data !== null ? msResult.data.value.data : ''
                time.morningEnd = meResult.data.value.data !== null ? meResult.data.value.data : ''
            }else if(i===2){
                time.afternoonStart = msResult.data.value.data !== null ? msResult.data.value.data : ''
                time.afternoonEnd = meResult.data.value.data !== null ? meResult.data.value.data : ''
            }else{
                time.nightStart = msResult.data.value.data !== null ? msResult.data.value.data : ''
                time.nightEnd = meResult.data.value.data !== null ? meResult.data.value.data : ''
                // console.log(time)
                resultArr.push(time)
            }
        }
    }

    


    // console.log(resultArr)

    
   return new Promise((resolve,reject)=>{
        resolve([data,resultArr])
   })
}



export const saveSchedule = (query:any) =>{
    
    return HYRquest.post('/check/saveSchedule/save',query)
}



export const deleteSchedule = (query:any) =>{
    return HYRquest.delete('/check/saveSchedule/deleteSchedule',query)
}