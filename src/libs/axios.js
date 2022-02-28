import axios from 'axios'
import router from '@/router'
import Vue from 'vue'
import $store from '@/store'
import Cookies from "js-cookie";

let m = null
let err = null

let uploadFileM = null

class HttpRequest {
    constructor(url) {
        this.baseURL = url
        this.contentType = {
            'application/x-www-form-urlencoded': true,
            'application/json': false,
        }
    }
    setConfig() {
        // let token = localStorage.getItem('token')
        let token = Cookies.get('token')
        let Authorization = {}

        try {
            if(token) {
                Authorization = JSON.parse(token)
            }
        }
        catch(e)
        {
            Authorization = token
        }

        //请求配置信息
        const config = {
            baseURL: '/api',
            // baseURL: this.baseURL,
            responseType:'json',
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                // 'Content-Type': 'multipart/form-data',
                'Content-Type': 'application/json',
                // add token code
                Authorization: 'Bearer ' + Authorization.token
            },
            data: {
                // 添加固定参数
                // partnerId: '6666111202',
                // source: 'PC',
                // timestamp: '1585482678193'
            },
            timeout: 1000 * 6
        }
        return config
    }
    interceptors(instance) {
        // 请求拦截
        instance.interceptors.request.use(
            config => config,
            error => Promise.reject(error)
        )
        // 响应拦截
        instance.interceptors.response.use(
            response => {
                const { data, status, headers } = response
                return { data, status, headers }
            },
            error => {
                err && err.close()
                err = Vue.prototype.$message({
                    type: 'error',
                    message: '请求失败，请重试！'
                })
                return Promise.reject(error)
            }
        )
    }
    request(optionsIn) {
        const instance = axios.create()
        let options = this.setConfig()
        if (optionsIn.headers) {
            Object.assign(options.headers, optionsIn.headers)
        } else {
            optionsIn.headers = options.headers
        }
        if (optionsIn.data) {
            Object.assign(options.data, optionsIn.data)
        } else {
            optionsIn.data = options.data
        }
        Object.assign(options, optionsIn)
        // if(options.headers['Content-Type'] === 'application/x-www-form-urlencoded' && 'data' in options) {}
        this.interceptors(instance)
        const request = instance(options)
        return new Promise((resolve,reject) => {
            request.then(({status, data, headers}) => {
                status, headers
                const currentRoute = window.location.href.substring(
                    `${window.location.href.indexOf('#') + 1}`
                )
                if(Object.prototype.toString.call(data) === '[object String]') {
                    if(/flag: expiration/.test(data)) {
                        m && m.close()
                        reject(data)
                        m = Vue.prototype.$message.error("请重新登录")
                        //  无权限判断 进行跳转 router
                        $store.dispatch('logout')
                        router.push({name: 'Login', query: {redirect: currentRoute}})

                    }
                } else if(/^0|60019$/.test(data.code)){
                    resolve(data.data)
                } else if(data.code === 401){
                    Vue.prototype.$message.close()
                    reject(data)
                    //  无权限判断 进行跳转 router
                    Vue.prototype.$message.success('请重新登录')
                    $store.dispatch('logout')
                    router.push({ name: 'Login', query: {redirect: currentRoute}})
                } else {
                    reject(data)
                    Vue.prototype.$message({
                        type: 'error',
                        duration: 5000,
                        message: data.msg
                    })
                }
            }).catch(e => {
                reject(e)
            })
        })
    }
    uploadFile(optionsIn) {
        const instance = axios.create()
        let options = this.setConfig()
        if (optionsIn.headers) {
            Object.assign(options.headers, optionsIn.headers)
        } else {
            optionsIn.headers = options.headers
        }
        Object.assign(options, optionsIn)
        this.interceptors(instance)
        const request = instance(options)
        return new Promise((resolve,reject) => {
            request.then(({ data }) => {
                if(Object.prototype.toString.call(data) === '[object String]') {
                    if(/flag: expiration/.test(data)) {
                        uploadFileM && uploadFileM.close()
                        reject(data)
                        uploadFileM = Vue.prototype.$message.error("请重新登录")
                        //  无权限判断 进行跳转 router
                        $store.dispatch('logout')
                        router.push({name: 'Login'})
                    }
                } else if(/^0|60019$/.test(data.code)){
                    resolve(data.data)
                } else if(data.code === 401){
                    reject(data)
                    //  无权限判断 进行跳转 router
                    Vue.prototype.$message.success('请重新登录')
                    $store.dispatch('logout')
                    router.push({ name: 'Login'})
                } else {
                    reject(data)
                    Vue.prototype.$message({
                        type: 'error',
                        duration: 5000,
                        message: data.msg
                    })
                }
            }).catch(e => {
                reject(e)
            })
        })
    }
}

export default HttpRequest
