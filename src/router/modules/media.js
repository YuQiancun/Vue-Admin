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
                    path: 'audioPlay',
                    name: "AudioPlay",
                    component: () => import('@/views/media/audio/audioPlay'),
                    meta: {
                        title: 'AudioPlay',
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
                    path: 'videoPlay',
                    name: "VideoPlay",
                    component: () => import('@/views/media/video/videoPlay'),
                    meta: {
                        title: 'VideoPlay',
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
                },
                {
                    path: 'toBase64',
                    name: "ToBase64",
                    component: () => import('@/views/media/graphics/toBase64'),
                    meta: {
                        title: 'toBase64',
                        breadcrumb: false,
                    },
                }
            ]
        },
    ]
}

export default media
