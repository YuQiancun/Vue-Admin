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
        }
    ]
}

export default chart
