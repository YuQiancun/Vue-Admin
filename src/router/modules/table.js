import Layout from "@/layout";

const table = {
    path: '/table',
    name: 'Table',
    component: Layout,
    redirect: '/table/excel',
    meta: {title: 'Table'},
    children: [{
        path: 'excel',
        name: 'Excel',
        component: () => import('@/views/table/excel'),
        meta: {
            title: '表格处理',
            iconImg: 'menu_icon_default.png',
            iconImgActive: 'menu_icon_active.png',
        }
    }]
}

export default table
