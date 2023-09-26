import { defineStore } from 'pinia'
import axios from 'axios'

export const usePlayerStore = defineStore('player', {
    state: () => {
        return {
            playersObj: {},
            metaObj: {},
            config: useRuntimeConfig()
        }
    },
    getters: {
        players: (state) => state.playersObj || [],
        count: (state) => state.playersObj.length || 0,
    },
    actions: {
        async getPlayers() {
            return new Promise((resolve, reject) => {
                axios.get(this.config.public.basePath + "api/players?populate=*&sort[0]=createdAt:desc")
                    .then((response) => {
                        this.playersObj = response.data.data
                        this.metaObj = response.data.meta
                        resolve(response)
                    }).catch(error => {
                        reject(error)
                    })
            })


        },
    },
})