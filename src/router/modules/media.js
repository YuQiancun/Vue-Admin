import Layout from "@/layout";

const media = {
    path: '/media',
    name: 'Media',
    component: Layout,
    redirect: '/media/audio',
    meta: {title: 'Media', breadcrumb: false},
    children: [
        {
            path: 'audio',
            name: 'Audio',
            component: () => import('@/views/media/audio'),
            meta: {
                title: 'Audio',
                breadcrumb: false,
            },
            children: [
                {
                    path: 'audioPay',
                    name: "AudioPay",
                    component: () => import('@/views/media/audio/audioPay'),
                    meta: {
                        title: 'AudioPay',
                        breadcrumb: false,
                    },
                }
            ]
        },
        {
            path: 'video',
            name: 'Video',
            component: () => import('@/views/media/video'),
            meta: {
                title: 'Video',
                breadcrumb: false,
            },
            children: [
                {
                    path: 'videoPay',
                    name: "VideoPay",
                    component: () => import('@/views/media/video/videoPay'),
                    meta: {
                        title: 'VideoPay',
                        breadcrumb: false,
                    },
                }
            ]
        },
        {
            path: 'graphics',
            name: 'Graphics',
            component: () => import('@/views/media/graphics'),
            meta: {
                title: 'Graphics',
                breadcrumb: false,
            },
            children: [
                {
                    path: 'graphicsLoad',
                    name: "GraphicsLoad",
                    component: () => import('@/views/media/graphics/graphicsLoad'),
                    meta: {
                        title: 'GraphicsLoad',
                        breadcrumb: false,
                    },
                }
            ]
        },
    ]
}

export default media
