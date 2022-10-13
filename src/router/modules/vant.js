import Layout from "@/layout";

const vant = {
    path: '/vant',
    name: 'Vant',
    component: Layout,
    redirect: '/vant/vantDemo',
    meta: {title: 'Vant', breadcrumb: false},
    children: [{
        path: 'vantDemo',
        name: 'VantDemo',
        component: () => import('@/views/vant/vantDemo'),
        meta: {
            title: 'Vant测试页',
            iconImg: 'menu_icon_default.png',
            iconImgActive: 'menu_icon_active.png',
            breadcrumb: false,
            role: ['admin', 'super_editor']
        }
    }]
}

export default vant
