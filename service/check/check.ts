import HYRquest from '../forum'


export const getLeave = (query:any) => {
    // console.log(query)
    return HYRquest.get('/api/attendance/leave/getLeave',query)
}


export const createLeave = (query:any) =>{
    return HYRquest.post('/api/attendance/leave/createLeave',query)
}


export const updateLeave = (query:any) =>{
    return HYRquest.put('/api/attendance/leave/updateLeave',query)
}