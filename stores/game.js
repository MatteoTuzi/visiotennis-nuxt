
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
        count: (state) => state.gamesObj.length || 0,
        pagination: (state) => state.metaObj.pagination || {},
    },
    actions: {
        async getAllGames() {
            return new Promise( (resolve, reject) => {
                axios.get("https://azure.andreacorriga.com/visiotennis/api/games?populate=*&sort[0]=createdAt:desc")
                .then( (response) => {
                    this.gamesObj = response.data.data
                    this.metaObj = response.data.meta

                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        async getAllGamesPaginated(page, pageSize) {
            return new Promise( (resolve, reject) => {
                axios.get("https://azure.andreacorriga.com/visiotennis/api/games?populate=*&sort[0]=createdAt:desc&pagination[page]=" + page + "&pagination[pageSize]=" + pageSize)
                .then( (response) => {
                    this.gamesObj = response.data.data
                    this.metaObj = response.data.meta

                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        async addGame(game) {
            return new Promise( (resolve, reject) => {
                const body = {
                    data: game
                }
                axios.post("https://azure.andreacorriga.com/visiotennis/api/games", body)
                .then( (response) => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    },
})