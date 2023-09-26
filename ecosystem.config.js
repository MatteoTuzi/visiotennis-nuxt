module.exports = {
    apps: [
        {
            name: 'visiotennis',
            port: '3001',
            script: 'BASE_STRAPI_URL=https://interno.visioscientiae.com/visiotennis-strapi/ NUXT_APP_BASE_URL=/visiotennis/ node .output/server/index.mjs'
        }
    ]
}
