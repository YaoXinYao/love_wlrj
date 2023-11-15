import HYRquest from '../forum'


export const getLeave = (query:any) => {
    console.log(query)
    return HYRquest.get('/check/leave/getLeave',query)
}


export const createLeave = (query:any) =>{
    return HYRquest.post('/check/leave/createLeave',query)
}


export const updateLeave = (query:any) =>{
    return HYRquest.put('/check/leave/updateLeave',query)
}