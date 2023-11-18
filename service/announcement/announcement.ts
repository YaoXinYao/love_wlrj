import HYRequest from '../forum'


export const insertNotice = (query:any) =>{
    return HYRequest.post('/notice/affiche/insert',query)
}

export const getNotice = (query:any) =>{
    return HYRequest.get('/notice/affiche/select',query)
}


export const getGrade = () =>{
    return HYRequest.get('/coustom/user/user/selectAllGrade')
}


export const getUser = (query:any) =>{
    return HYRequest.get('/coustom/user/user/selectByGroupAndGrade',query)
}

export const postAffiche = (query:any,body?:any) =>{
    if(body){
        return HYRequest.post('/notice/affiche/insert',query,body)
    }else{
        return HYRequest.post('/notice/affiche/insert',query)
    }
}