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
            meta: { title: 'AMap'},
            component: () => import("@/views/map/AMap"),
        },
        {
            path: 'bmap',
            name: 'BMap',
            meta: { title: 'BMap'},
            component: () => import("@/views/map/BMap"),
        },
        {
            path: 'leaflet',
            name: 'Leaflet',
            meta: { title: 'Leaflet'},
            component: () => import("@/views/map/Leaflet"),
        }
    ]
}

export default map
