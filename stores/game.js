
import { defineStore } from 'pinia'
import { usePlayerStore } from './player.js'
import axios from 'axios'

export const useGameStore = defineStore('game', {
    state: () => {
        return {
            gamesObj: {},
            metaObj: {},
            config: useRuntimeConfig()
        }
    },
    getters: {
        games: (state) => state.gamesObj || [],
        count: (state) => state.gamesObj.length || 0,
        pagination: (state) => state.metaObj.pagination || {},
    },
    actions: {
        async getAllGames() {
            return new Promise((resolve, reject) => {
                axios.get(this.config.public.basePath + "api/games?populate=*&sort[0]=createdAt:desc")
                    .then((response) => {
                        this.gamesObj = response.data.data
                        this.metaObj = response.data.meta

                        resolve(response)
                    }).catch(error => {
                        reject(error)
                    })
            })
        },
        async getAllGamesPaginated(page, pageSize) {
            
            console.log(this.config)
            return new Promise((resolve, reject) => {
                axios.get(this.config.public.basePath + "api/games?populate=*&sort[0]=createdAt:desc&pagination[page]=" + page + "&pagination[pageSize]=" + pageSize,{
                    headers: { "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Headers': '*', },
                })
                    
                .then((response) => {
                        this.gamesObj = response.data.data
                        this.metaObj = response.data.meta

                        resolve(response)
                    }).catch(error => {
                        reject(error)
                    })
            })
        },
        async addGame(game) {
            return new Promise((resolve, reject) => {
                const body = {
                    data: game
                }
                axios.post(this.config.public.basePath + "api/games", body)
                    .then((response) => {
                        resolve(response)
                    }).catch(error => {
                        reject(error)
                    })
            })
        },
        async updateGame(game) {
            return new Promise((resolve, reject) => {
                const body = {
                    data: game
                }
                axios.put(this.config.public.basePath + "api/games/" + game.id, body)
                    .then((response) => {
                        resolve(response)
                    }).catch(error => {
                        reject(error)
                    })
            })
        },
        async deleteGame(game) {
            return new Promise((resolve, reject) => {
                axios.delete(this.config.public.basePath + "api/games/" + game.id)
                    .then((response) => {
                        resolve(response)
                    }).catch(error => {
                        reject(error)
                    })
            })
        },
        async getMostValuablePlayer() {
            await this.getAllGamesPaginated(1, 1000)

            let maxPlayer = null;
            let maxWinPercentage = 0;
            let players = {};

            this.games.forEach(game => {
                const player1Id = game.attributes.player_1.data.id;
                const player2Id = game.attributes.player_2.data.id;

                if (!players[player1Id]) {
                    players[player1Id] = { wins: 0, totalGames: 0 };
                }

                if (!players[player2Id]) {
                    players[player2Id] = { wins: 0, totalGames: 0 };
                }

                players[player1Id].totalGames++;
                players[player2Id].totalGames++;

                const winner = game.attributes.winner;
                if (winner) {
                    const winnerId = winner.data.id;
                    players[winnerId].wins++;
                }
            });

            for (const playerId in players) {
                const playerStats = players[playerId];
                const winPercentage = (playerStats.wins / playerStats.totalGames) * 100;

                if (winPercentage > maxWinPercentage) {
                    maxWinPercentage = winPercentage;
                    maxPlayer = playerId;
                }
            }

            // Ora maxPlayer contiene l'ID del giocatore con la percentuale di vittorie più alta.


            await usePlayerStore().getPlayers()

            const player = usePlayerStore().players.find(player => player.id == maxPlayer)
            const totalGames = players[player.id].totalGames;
            const winGames = players[player.id].wins;

            const mvp = {
                maxWinPercentage,
                totalGames,
                winGames,
                player
            }
            return mvp
        },
        async getPlayerMostGames() {

            let maxPlayer = null;
            let maxGames = 0;
            let players = {};

            this.games.forEach(game => {
                const player1Id = game.attributes.player_1.data.id;
                const player2Id = game.attributes.player_2.data.id;

                if (!players[player1Id]) {
                    players[player1Id] = { totalGames: 0 };
                }

                if (!players[player2Id]) {
                    players[player2Id] = { totalGames: 0 };
                }

                players[player1Id].totalGames++;
                players[player2Id].totalGames++;
            });

            for (const playerId in players) {
                const playerStats = players[playerId];
                const totalGames = playerStats.totalGames;

                if (totalGames > maxGames) {
                    maxGames = totalGames;
                    maxPlayer = playerId;
                }
            }

            await usePlayerStore().getPlayers()

            const player = usePlayerStore().players.find(player => player.id == maxPlayer)
            const totalGames = players[player.id].totalGames;

            const mvp = {
                totalGames,
                player
            }

            return mvp
        },
        async getPlayerMostWins() {

            let maxPlayer = null;
            let maxWins = 0;
            let players = {};

            this.games.forEach(game => {
                const player1Id = game.attributes.player_1.data.id;
                const player2Id = game.attributes.player_2.data.id;

                if (!players[player1Id]) {
                    players[player1Id] = { wins: 0 };
                }

                if (!players[player2Id]) {
                    players[player2Id] = { wins: 0 };
                }

                const winner = game.attributes.winner;
                if (winner) {
                    const winnerId = winner.data.id;
                    players[winnerId].wins++;
                }
            });

            for (const playerId in players) {
                const playerStats = players[playerId];
                const wins = playerStats.wins;

                if (wins > maxWins) {
                    maxWins = wins;
                    maxPlayer = playerId;
                }
            }

            await usePlayerStore().getPlayers()

            const player = usePlayerStore().players.find(player => player.id == maxPlayer)
            const wins = players[player.id].wins;

            const mvp = {
                wins,
                player
            }

            return mvp
        }
    },

})