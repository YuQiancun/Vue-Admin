import Layout from "@/layout";

const about = {
    path: '/about',
    name: 'About',
    component: Layout,
    redirect: '/about/we',
    meta: {title: 'About', breadcrumb: false, role: ['admin', 'super_editor']},
    children: [{
        path: 'we',
        name: 'We',
        component: () => import('@/views/about'),
        meta: {
            title: '关于我们',
            iconImg: 'menu_icon_default.png',
            iconImgActive: 'menu_icon_active.png',
            breadcrumb: false,
            role: ['admin', 'super_editor']
        }
    }]
}

export default about