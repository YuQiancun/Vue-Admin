import Layout from "@/layout";

const chart = {
    path: '/chart',
    name: 'Chart',
    component: Layout,
    redirect: '/chart/eCharts',
    meta: { title: 'Chart', hidden: false},
    children: [
        {
            path: 'eCharts',
            name: 'ECharts',
            meta: { title: 'ECharts'},
            component: () => import("@/views/chart/ECharts"),
            children: [
                {
                    path: 'eChartsBasic',
                    name: "EChartsBasic",
                    component: () => import('@/views/chart/ECharts/EChartsBasic'),
                    meta: {
                        title: 'EChartsBasic',
                        breadcrumb: false,
                    },
                }
            ]
        },
        {
            path: 'eCharts3d',
            name: 'ECharts3D',
            meta: { title: 'ECharts3D'},
            component: () => import("@/views/chart/ECharts3D"),
            children: [
                {
                    path: 'pie3d',
                    name: "Pie3D",
                    component: () => import('@/views/chart/ECharts3D/Pie3D'),
                    meta: {
                        title: 'Pie3D',
                        breadcrumb: false,
                    },
                },
                {
                    path: 'pieDemo',
                    name: "PieDemo",
                    component: () => import('@/views/chart/ECharts3D/PieDemo'),
                    meta: {
                        title: 'PieDemo',
                        breadcrumb: false,
                    },
                }
            ]
        }
    ]
}

export default chart
