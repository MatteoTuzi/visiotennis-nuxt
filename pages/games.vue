<template>
    <div>
        <div class="flex sm:flex-row">
            <h3 class="text-3xl font-medium text-gray-700">
                Partite giocate
            </h3>
            <button
                class="ml-auto px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
                <NuxtLink to="/newGame">Nuova partita </NuxtLink>
            </button>
        </div>


        <div class="mt-8" />
        <div>
            <select @change="onChangeTake"
            v-model = pageSize class="block w-20 h-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border border-gray-400 rounded-l appearance-none focus:outline-none focus:bg-white focus:border-gray-500">
                <option>5</option>
                <option>10</option>
                <option>20</option>
            </select>
        </div>
        <div class="flex flex-col mt-8">
            <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div
                    class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                    <table class="min-w-full">
                        <thead>
                            <tr>
                                <th
                                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                    Nome giocatore 1
                                </th>
                                <th
                                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                    Nome giocatore 2
                                </th>
                                <th
                                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                    Vincitore
                                </th>
                                <th
                                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                    Score giocatore 1
                                </th>
                                <th
                                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                    Score giocatore 2
                                </th>
                                <th
                                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                    Inizio match
                                </th>

                                <th
                                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                    Fine match
                                </th>
                            </tr>
                        </thead>

                        <tbody class="bg-white">
                            <tr v-for="(game, index) in gameStore.games" :key="index">
                                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                    <div class="text-sm font-medium leading-5 text-gray-500">
                                        {{ game?.attributes?.player_1?.data?.attributes.player_name }}
                                    </div>
                                </td>
                                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                    <div class="text-sm leading-5 text-gray-500">
                                        {{ game?.attributes?.player_2?.data?.attributes.player_name }}
                                    </div>
                                </td>
                                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                    <div class="text-sm leading-5 text-gray-900">
                                        <b>{{ game?.attributes?.winner?.data?.attributes.player_name }}</b>
                                    </div>
                                </td>

                                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                    <div class="text-sm leading-5 text-gray-500">
                                        {{ game?.attributes?.player_1_score }}
                                    </div>
                                </td>
                                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                    <div class="text-sm leading-5 text-gray-500">
                                        {{ game?.attributes?.player_2_score }}
                                    </div>
                                </td>
                                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                    <div class="text-sm leading-5 text-gray-500">
                                        {{ game?.attributes?.match_start_time ?
                                            formatDate(game?.attributes?.match_start_time) : "" }}
                                    </div>
                                </td>
                                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                    <div class="text-sm leading-5 text-gray-500">
                                        {{ game?.attributes?.match_end_time ? formatDate(game?.attributes?.match_end_time) :
                                            "" }}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="flex flex-col items-center px-5 py-5 bg-white border-t xs:flex-row xs:justify-between">
                        <span class="text-xs text-gray-900 xs:text-sm">Showing {{ 1 + (pageSize * (page-1)) }} to {{ pageSize * (page) }} of {{ gameStore.pagination.total }} Entries</span>

                        <div class="inline-flex mt-2 xs:mt-0">
                            <button class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-l hover:bg-gray-400"
                                @click="goToPrevPage">
                                Prev
                            </button>
                            <button class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-r hover:bg-gray-400"
                                @click="goToNextPage">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { defineComponent } from 'vue'
import { useGameStore } from '../stores/game'
import dayjs from 'dayjs'

export default defineComponent({
    name: "Games",
    mounted() {
        definePageMeta({
            layout: "dashboard",
        })
        this.getGames()
    },
    data() {
        return {
            gameStore: useGameStore(),
            formatDate: (date) => dayjs(date).format('DD/MM/YYYY HH:mm:ss'),
            page: 1,
            pageSize: 10
        }
    },

    methods: {
        async getGames() {
            await this.gameStore.getAllGamesPaginated(this.page, this.pageSize)
        },
        async goToNextPage() {
            if(this.page + 1 > this.gameStore.pagination.pageCount) return
            this.page++
            await this.getGames()
        },

        async goToPrevPage() {
            if(this.page -1 == 0) return
            this.page--
            await this.getGames()
        },
        async onChangeTake() {
            await this.getGames()
        }
    }
})
</script>