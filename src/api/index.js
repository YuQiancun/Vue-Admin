import http from '@/libs/requst.js'

export default {
    login({url = null, data = {}}){
        return http.httpAREA.request({
            url: url,
            method: 'post',
            data
        })
    },
    post({headers = null, method = null, url = null, data = {}}){
        if(!url) {
            console.error('参数错误post(String,Object)')
            return Promise.reject('参数错误post(String,Object)')
        } else {
            return http.httpAREA.request({
                headers: headers,
                url: url,
                method: method || 'post',
                data
            })
        }
    },
    uploadFile({headers = {'Content-Type': "multipart/form-data"}, method = null, url = null, data = null}){
        if(!url) {
            console.error('参数错误post(String,Object)')
            return Promise.reject('参数错误post(String,Object)')
        } else {
            return http.httpAREA.uploadFile({
                headers: headers,
                url: url,
                method: method || 'post',
                data
            })
        }
    },
    test(data = {}) {
        return http.request({
            url: '/login',
            method: 'post',
            data
        })
    }
}
