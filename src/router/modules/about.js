import Layout from "@/layout";

const home = {
    path: '/home',
    name: 'Home',
    component: Layout,
    redirect: '/home/cockpit',
    meta: { title: '首页', hidden: false},
    children: [
        {
            path: 'cockpit',
            name: 'Cockpit',
            meta: { title: '首页'},
            component: () => import("@/views/home")
        }
    ]
}

export default home