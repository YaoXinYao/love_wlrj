import HYRequest from '../forum'



// 删除
export const deleteNew = (query:any)=>{
    return HYRequest.delete('/notice/news/delete',query)
}


export const getNew = (query:any)=>{
    return HYRequest.delete('/notice/news/select',query)
}


export const insertNew = (query:any,body:any)=>{
    let formData = new FormData()
    formData.append('newsImgs',body)
    return HYRequest.delete('/notice/news/insert',query,{body:formData})
}

export const updateNew = (query:any)=>{
    return HYRequest.delete('/notice/news/update',query)
}