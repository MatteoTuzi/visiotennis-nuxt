
import { defineStore } from 'pinia'
import axios from 'axios'

export const useGameStore = defineStore('game', {
    state: () => {
        return {
            gamesObj: {},
            metaObj: {}
        }
    },
    getters: {
        games: (state) => state.gamesObj || [],
        count: (state) => state.gamesObj.length || 0
    },
    actions: {
        async getAllGames() {
            return new Promise( (resolve, reject) => {
                axios.get("https://azure.andreacorriga.com/visiotennis/api/games?populate=*")
                .then( (response) => {
                    this.gamesObj = response.data.data
                    this.metaObj = response.data.metaObj

                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
    },
})