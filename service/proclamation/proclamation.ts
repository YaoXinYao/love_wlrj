import HYRequest from '../forum'


export const getAffiches = (query:any) => {
    return HYRequest.get('/api/notice/affiche/select',query)
}