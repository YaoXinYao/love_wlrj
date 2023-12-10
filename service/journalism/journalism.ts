import HYRequest from '../forum'



// 删除
export const deleteNew = (query:any)=>{
    return HYRequest.delete('/api/notice/news/delete',query)
}


export const getNew = (query:any)=>{
    return HYRequest.get('/api/notice/news/select',query)
}


export const insertNew = (query:any,body:any)=>{
    // let form = new FormData()
    // console.log(query)
    // console.log(body)
    let formData = new FormData()
    for(let item in query){
        // console.log(query[item])
        formData.append(`${item}`,query[item])
    }
    formData.append('newsImgs',body)
    return HYRequest.post('/api/notice/news/insert','',{body:formData})
}

export const updateNew = (query:any)=>{
    return HYRequest.put('/api/notice/news/update',query)
}