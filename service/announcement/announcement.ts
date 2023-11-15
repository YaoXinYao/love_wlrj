import HYRequest from '../forum'


export const insertNotice = (query:any) =>{
    return HYRequest.post('/notice/affiche/insert',query)
}

export const getNotice = (query:any) =>{
    return HYRequest.get('/notice/affiche/select',query)
}