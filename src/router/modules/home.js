import Layout from "@/layout";

const home = {
    path: '/home',
    name: 'Home',
    component: Layout,
    redirect: '/home/cockpit',
    meta: {title: '首页', singlePage: true, breadcrumb: false},
    children: [{
        path: 'cockpit',
        name: 'Cockpit',
        component: () => import('@/views/home'),
        meta: {title: '首页', iconImg: 'menu_icon_default.png', iconImgActive: 'menu_icon_active.png', breadcrumb: false}
    }]
}

export default home