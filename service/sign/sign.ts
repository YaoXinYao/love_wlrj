import HYRequest from '../forum'


// 删除
export const deleteUnSign = (query:any)=>{
    return HYRequest.delete('/check/unsign/deleteUnSign',query)
}

// 获取
export const getUnSign = (query:any)=>{
    return HYRequest.get('/check/unsign/getUnSignList',query)
}


// 添加
export const inserUnSign = (query:any)=>{
    return HYRequest.post('/check/unsign/insertUnSign',query)
} 

// 上传文件
export const upload = (query:any) =>{

    let formdata = new FormData()
    formdata.append('file',query)


    return HYRequest.post('/unsign/uploadExcel','',{body:formdata})
}

