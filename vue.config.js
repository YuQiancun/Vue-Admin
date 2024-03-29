module.exports = {
    lintOnSave: true, //开启关闭eslint
    css: {
        loaderOptions: {
            sass: {
                prependData: '@import "@/assets/style/global_menu.scss";' // @import "URL";@import "URL";*n
            }
        }
    },
    devServer: {
        // proxy: {
        //     [process.env.VUE_APP_BASE_API]: { // 配置跨域的名字
        //         target: [process.env.VUE_APP_BASE_API], // 跨域的地址(一般是后台ip)
        //         changeOrigin: true ,// 是否跨域
        //         // pathRewrite: { // 当前的名字
        //         //     [process.env.VUE_APP_BASE_API]: ''
        //         // }
        //     }
        // },
        proxy: {
            '/api': { // 配置跨域的名字
                target: process.env.VUE_APP_BASE_API, // 跨域的地址(一般是后台ip)
                changeOrigin: true ,// 是否跨域
                pathRewrite: { // 当前的名字
                    '^/api': ''
                    // ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            },
            '/aliOss': { // 配置跨域的名字
                target: "https://hengchunbang.oss-cn-hangzhou.aliyuncs.com", // 跨域的地址(一般是后台ip)
                changeOrigin: true,// 是否跨域
                pathRewrite: { // 当前的名字
                    '^/aliOss': ''
                    // ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            },
            '/admin': { // 配置跨域的名字
                target: "http://192.168.1.119:7711/admin", // 跨域的地址(一般是后台ip)
                changeOrigin: true,// 是否跨域
                pathRewrite: { // 当前的名字
                    '^/admin': ''
                    // ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        }
        // port: 7710,
        // proxy: {
        //     '/api': {     //这里最好有一个 /
        //         target: 'http://192.168.1.79',  // 后台接口域名
        //         ws: true,        //如果要代理 websockets，配置这个参数
        //         secure: false,  // 如果是https接口，需要配置这个参数
        //         changeOrigin: true,  //是否跨域
        //         // pathRewrite:{
        //         //   '^/api': '' //重写接口，去掉/api  这里不用注释掉
        //         // }
        //     }
        // }
    }
}
