import Layout from "@/layout";

const module = {
    path: '/module',
    name: 'Module',
    component: Layout,
    // redirect: '/module/excel',
    meta: {title: 'Table'},
    children: [{
        path: 'verificationCode',
        name: 'VerificationCode',
        component: () => import('@/views/module/verificationCode'),
        meta: {
            title: '验证码',
            iconImg: 'menu_icon_default.png',
            iconImgActive: 'menu_icon_active.png',
        }
    }]
}

export default module
