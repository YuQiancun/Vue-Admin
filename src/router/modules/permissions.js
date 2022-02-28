import Layout from "@/layout";

const permissions = {
    path: '/permissions',
    name: 'Permissions',
    component: Layout,
    redirect: '/permissions/menuManage',
    meta: {title: 'Setting', breadcrumb: false},
    children: [
        {
            path: 'menuManage',
            name: 'MenuManage',
            component: () => import('@/views/permissions/menuManage'),
            meta: {title: '菜单权限', iconImg: 'menu_icon_default.png', iconImgActive: 'menu_icon_active.png', breadcrumb: false}
        },
        {
            path: 'userInfo',
            name: 'UserInfo',
            component: () => import('@/views/permissions/userInfo'),
            meta: {title: '用户信息'}
        }
    ]
}

export default permissions