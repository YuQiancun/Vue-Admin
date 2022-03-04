import Layout from "@/layout";

const websocket = {
    path: '/webSocket',
    name: 'WebSocket',
    component: Layout,
    redirect: '/websocket/onlineChat',
    meta: {title: 'WebSocket', breadcrumb: false},
    children: [{
        path: 'onlineChat',
        name: 'OnlineChat',
        component: () => import('@/views/websocket/onlineChat'),
        meta: {
            title: '在线聊天',
            breadcrumb: false,
        }
    }]
}

export default websocket
