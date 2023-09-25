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
            const response = await $fetch(`${useRuntimeConfig().public.basePath}/api/login`, {
                method: 'GET'
            }) 
            this.playersObj = response.data
            this.metaObj = response.meta
            
        },
    },
})