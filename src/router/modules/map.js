import Layout from "@/layout";

const map = {
    path: '/map',
    name: 'Map',
    component: Layout,
    redirect: '/Map/amap',
    meta: { title: '地图', hidden: false},
    children: [
        {
            path: 'amap',
            name: 'AMap',
            meta: { title: '首页'},
            component: () => import("@/views/map/AMap"),
        },
        {
            path: 'bmap',
            name: 'BMap',
            meta: { title: '首页'},
            component: () => import("@/views/map/BMap"),
            children: [
                {
                    path: 'camap',
                    name: 'CAMap',
                    meta: { title: '首页'},
                    component: () => import("@/views/map/BMap"),
                },
                {
                    path: 'cmap',
                    name: 'CMap',
                    meta: { title: '首页'},
                    component: () => import("@/views/map/CMap"),
                },
                {
                    path: 'cbmap',
                    name: 'CBMap',
                    meta: { title: '首页'},
                    component: () => import("@/views/map/BMap"),
                    children: [
                        {
                            path: 'ccbmap',
                            name: 'CCBMap',
                            meta: { title: '首页'},
                            component: () => import("@/views/map/CMap"),
                        },
                    ]
                }
            ]
        }
    ]
}

export default map
