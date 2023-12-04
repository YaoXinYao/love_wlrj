import HYRequest from '../forum'


export const getAffiches = (query:any) => {
    return HYRequest.get('/notice/affiche/select',query)
}