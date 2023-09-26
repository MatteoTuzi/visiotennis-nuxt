<template>
    <div class="mt-8">
        <div class="mt-4">
            <div class="p-6 bg-white rounded-md shadow-md">
                <h2 class="text-lg font-semibold text-gray-700 capitalize">
                    Add new Game
                </h2>

                <form @submit.prevent="addGame">
                    <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label class="text-gray-700" for="player1">Player 1</label>
                            <select v-model="game.player_1" id="player1_option" class="block w-full leading-tight text-gray-700 border-gray-400 appearance-none focus:outline-none focus:bg-white focus:border-gray-500 ml-auto">
                            </select>
                            <span v-if="v$.game?.player_1?.$error" class="text-danger text-xs">
                                {{v$.game?.player_1?.$errors[0].$message}}
                            </span>
                        </div>

                        <div>
                            <label class="text-gray-700" for="player2">Player 2</label>
                            <select v-model="game.player_2" id="player2_option" class="block w-full leading-tight text-gray-700 border-gray-400 appearance-none focus:outline-none focus:bg-white focus:border-gray-500 ml-auto">
                            </select>
                            <span v-if="v$.game?.player_2?.$error" class="text-danger text-xs">
                                {{v$.game?.player_2?.$errors[0].$message}}
                            </span>
                        </div>

                        <div>
                            <label class="text-gray-700" for="winner">Winner</label>
                            <select v-model="game.winner" id="winner_option" class="block w-full leading-tight text-gray-700 border-gray-400 appearance-none focus:outline-none focus:bg-white focus:border-gray-500 ml-auto">
                            </select>
                            <span v-if="v$.game?.winner?.$error" class="text-danger text-xs">
                                {{v$.game?.winner?.$errors[0].$message}}
                            </span>
                        </div>

                        <div>
                            <label class="text-gray-700" for="dateStart">Date match start</label>
                            <div class="relative">
                                <div class="absolute rounded-l w-10 h-full flex items-center justify-center bg-slate-100 border text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400"> <i class="fa fa-calendar w-4 h-4"></i> </div>                         
                                <vue-date-picker v-model="game.match_start_time" :format="formatDate" locale="it-IT" enable-seconds/>
                            </div>
                            <span v-if="v$.game?.match_start_time?.$error" class="text-danger text-xs">
                                {{v$.game?.match_start_time?.$errors[0].$message}}
                            </span>
                        </div>

                        <div>
                            <label class="text-gray-700" for="dateStart">Date match end</label>
                            <div class="relative">
                                <div class="absolute rounded-l w-10 h-full flex items-center justify-center bg-slate-100 border text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400"> <i class="fa fa-calendar w-4 h-4"></i> </div>                         
                                <vue-date-picker v-model="game.match_end_time" :format="formatDate" locale="it-IT" enable-seconds/>
                            </div>
                            <span v-if="v$.game?.match_end_time?.$error" class="text-danger text-xs">
                                {{v$.game?.match_end_time?.$errors[0].$message}}
                            </span>
                        </div>

                        <div>
                            <label class="text-gray-700" for="player1Score">Player 1 score</label>
                            <input v-model="game.player_1_score"
                            class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                            type="number"
                            max="3"
                            min="0">
                        </div>

                        <div>
                            <label class="text-gray-700" for="player2Score">Player 2 score</label>
                            <input v-model="game.player_2_score"
                            class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                            type="number">
                        </div>
                    </div>

                    <div class="flex justify-end mt-4">
                        <button
                            class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useGameStore } from '../stores/game'
import { usePlayerStore } from '../stores/player'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import dayjs from 'dayjs'
import TomSelect from 'tom-select';

export default defineComponent({
    name: "NewGame",
    async mounted() {
        definePageMeta({
            layout: "dashboard",
        })
        await this.playerStore.getPlayers()
        await this.populateTomSelectPlayer("#player1_option", this.player1TomSelect)
        await this.populateTomSelectPlayer("#player2_option", this.player2TomSelect)
        await this.populateTomSelectPlayer("#winner_option", this.winnerTomSelect)

    },
    data() {
        return {
            gameStore: useGameStore(),
            playerStore: usePlayerStore(),
            router: useRouter(),
            formatDate: (date) => dayjs(date).format('DD/MM/YYYY HH:mm:ss'),
            player1TomSelect: null,
            player2TomSelect: null,
            winnerTomSelect: null,
            v$: useVuelidate(),
            game: {
                player_1: '',
                player_2: '',
                winner: '',
                match_start_time: '',
                match_end_time: '',
                player_1_score: 0,
                player_2_score: 0,
                
            },
        }
    },
    validations() {
        return {
            game: {
                player_1: { required: helpers.withMessage("The first player is required", required) },
                player_2: { required: helpers.withMessage("The second player is required", required) },
                winner: { required: helpers.withMessage("The winner player is required", required) },
                match_start_time: { required: helpers.withMessage("The match start time is required", required) },
                match_end_time: { required: helpers.withMessage("The match end time is required", required) }
            }
        }
    },
    methods: {
        async addGame() {
            this.v$.$validate()
            
            if(!this.v$.$error){
                this.game.player_1 = this.playerStore.players.find((player) => player.attributes.player_name === this.game.player_1)
                this.game.player_2 = this.playerStore.players.find((player) => player.attributes.player_name === this.game.player_2)
                this.game.winner = this.playerStore.players.find((player) => player.attributes.player_name === this.game.winner)
                await this.gameStore.addGame(this.game)
                this.router.push({ name: 'games' })
            }
        },
        async populateTomSelectPlayer(selectId, playerOption){
            const players = this.playerStore.players
            var player1Options = players.map((player) => {
                return {value: player.attributes.player_name, text: player.attributes.player_name}
            })
            this.player1TomSelect = new TomSelect(`${selectId}`, {
                plugins: {
                    remove_button: {
                        title: "Rimuovi giocatore"
                    }
                },
                persist: true,
                create: true
            });
            this.player1TomSelect.addOption(player1Options)
        }
    }
})
</script>