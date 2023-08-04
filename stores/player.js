import { defineStore } from 'pinia'
import axios from 'axios'

export const usePlayerStore = defineStore('player', {
    state: () => {
        return {
            playersObj: {},
            metaObj: {}
        }
    },
    getters: {
        players: (state) => state.playersObj || [],
        count: (state) => state.playersObj.length || 0,
    },
    actions: {
        async getPlayers() {
            return new Promise( (resolve, reject) => {
                axios.get("https://azure.andreacorriga.com/visiotennis/api/players")
                .then( (response) => {
                    this.playersObj = response.data.data
                    this.metaObj = response.data .meta
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
    },
})