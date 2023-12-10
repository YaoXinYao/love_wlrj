import HYRquest from '../forum'


export const getLeave = (query:any) => {
    // console.log(query)
    return HYRquest.get('/check/attendance/leave/getLeave',query)
}


export const createLeave = (query:any) =>{
    return HYRquest.post('/check/attendance/leave/createLeave',query)
}


export const updateLeave = (query:any) =>{
    return HYRquest.put('/check/attendance/leave/updateLeave',query)
}