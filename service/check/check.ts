import HYRquest from '../forum'


export const getLeave = (query:any) => {
    return HYRquest.get('/check/leave/getLeave',query)
}