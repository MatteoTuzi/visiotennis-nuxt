
import { defineStore } from 'pinia'
import { usePlayerStore } from './player.js'
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
        },
        async updateGame(game) {
            return new Promise( (resolve, reject) => {
                const body = {
                    data: game
                }
                axios.put("https://azure.andreacorriga.com/visiotennis/api/games/" + game.id, body)
                .then( (response) => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        async deleteGame(game) {
            return new Promise( (resolve, reject) => {
                axios.delete("https://azure.andreacorriga.com/visiotennis/api/games/" + game.id)
                .then( (response) => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        async getMostValuablePlayer() {
            await this.getAllGamesPaginated(1, 1000)
            
            let maxPlayer = null
            let maxPlayerScore = 0
            let players = [0]
            this.games.forEach(game => {
                const winner = game.attributes.winner
                if (winner) {
                    if (players[winner.data.id]) {
                        players[winner.data.id]++
                    } else {
                        players[winner.data.id] = 1
                    }
                }
            })

            for (const [key, value] of Object.entries(players)) {
                if (value > maxPlayerScore) {
                    maxPlayerScore = value
                    maxPlayer = key
                }
            }
            
            await usePlayerStore().getPlayers()

            const player = usePlayerStore().players.find(player => player.id == maxPlayer)

            const mvp = {
                maxPlayerScore,
                player
            }
            return mvp
        }
    },
})