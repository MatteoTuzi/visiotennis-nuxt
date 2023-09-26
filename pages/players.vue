<template>
    <div>
        <h3 class="text-3xl font-medium text-gray-700">
            Giocatori
        </h3>

        <div class="mt-8">

            <div class="mt-6">

                <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                    <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
                        <table class="min-w-full leading-normal">
                            <thead>

                                <tr>
                                    <th
                                        class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                                        User
                                    </th>
                                    <th
                                        class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                                        Username
                                    </th>
                                    <th
                                        class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                                        Created at
                                    </th>
                                    <th
                                        class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                                        Updated At
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(u, index) in players" :key="index">
                                    <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                        <div class="flex items-center">

                                            <div class="ml-3">
                                                <p class="text-gray-900 whitespace-nowrap">
                                                    {{ u?.attributes?.full_name }}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                        <p class="text-gray-900 whitespace-nowrap">
                                            {{ u?.attributes?.player_name }}
                                        </p>
                                    </td>
                                    <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                        <p class="text-gray-900 whitespace-nowrap">
                                            {{ formatDateTime(u?.attributes?.createdAt) }}
                                        </p>
                                    </td>
                                    <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                        <p class="text-gray-900 whitespace-nowrap">
                                            {{ formatDateTime(u?.attributes?.updatedAt) }}
                                        </p>
                                    </td>

                                </tr>

                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { usePlayerStore } from '../stores/player'
import dayjs from 'dayjs'

export default defineComponent({
    name: "Players",
    mounted() {
        
        definePageMeta({
            layout: "dashboard",
        })

        this.getPlayers()

    },
    data() {
        return {
            playerStore: usePlayerStore(),
            players: [],
            formatDateTime: (date) => {
                return dayjs(date).format('DD/MM/YYYY HH:mm:ss');
            }
        }
    },

    methods: {
        async getPlayers() {
            await this.playerStore.getPlayers()
            this.players = this.playerStore.players
        },
    }
})
</script>