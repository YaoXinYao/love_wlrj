import HYRequest from '../forum'


// 删除
export const deleteUnSign = (query:any)=>{
    return HYRequest.delete('/check/attendance/unsign/deleteUnsign',query)
}

// 获取
export const getUnSign = (query:any)=>{
    return HYRequest.get('/check/attendance/unsign/getUnSignList',query)
}


export const updateUnSign = (query:any)=>{
    return HYRequest.put('/check/attendance/unsign/updateUnSign',query)
}


// 添加
export const inserUnSign = (query:any)=>{
    return HYRequest.post('/check/attendance/unsign/insertUnSign',query)
} 

// 上传文件
export const upload = (query:any) =>{

    let formdata = new FormData()
    formdata.append('file',query)


    return HYRequest.post('/check/attendance/unsign/uploadExcel','',{body:formdata})
}

