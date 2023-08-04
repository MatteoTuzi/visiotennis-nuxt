export default defineNuxtPlugin(nuxtApp => {

    const baseUrl = 'https://azure.andreacorriga.com/visiotennis'

    const constants = {
        api: {
            strapi: {
                players: baseUrl + '/api/players',
                games: baseUrl + '/api/games',
                contentTypes: baseUrl + '/api/content-type-builder/content-types',
                baseUrl: baseUrl,
            },
        }
    }

    // now available on `nuxtApp.$constants`
    nuxtApp.provide('constants', constants)

})