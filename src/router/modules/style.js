import Layout from "@/layout";

const style = {
    path: '/style',
    name: 'Style',
    component: Layout,
    meta: {title: '样式模板'},
    children: [{
        path: 'signIn',
        name: 'SignIn',
        component: () => import('@/views/style/login'),
        meta: {
            title: '登陆样式'
        },
        children: [
            {
                path: 'login1',
                name: 'Login1',
                component: () => import('@/views/style/login/login1'),
                meta: {
                    title: '左右切换登陆'
                },
            },
            {
                path: 'login2',
                name: 'Login2',
                component: () => import('@/views/style/login/login2'),
                meta: {
                    title: '卡片层叠切换'
                },
            }
        ]
    }]
}

export default style
