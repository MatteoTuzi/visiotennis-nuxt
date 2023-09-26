<template>
    <div class="flex">
        <!-- Backdrop -->
        <div :class="isOpen ? 'block' : 'hidden'"
            class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden" @click="isOpen = false" />
        <!-- End Backdrop -->

        <div :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
            class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0">
            <div class="flex items-center justify-center mt-8">
                <div class="flex items-center">
                    <img src="/img/VisioTennis_Logo.png" alt="logo" class="w-16 h-16" />

                    <span class="mx-2 text-2xl font-semibold text-white">Visiotennis</span>
                </div>
            </div>

            <nav class="mt-10">
                <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
                    :class="[router.currentRoute.fullPath === '/' ? activeClass : inactiveClass]" to="/">
                    <span class="mx-4">Dashboard</span>
                </router-link>

                <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
                    :class="[router.currentRoute.fullPath === '/players' ? activeClass : inactiveClass]" to="/players">
                    <span class="mx-4">Players</span>
                </router-link>

                <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
                    :class="[router.currentRoute.fullPath === '/games' ? activeClass : inactiveClass]" to="/games">
                    <span class="mx-4">Games</span>
                </router-link>
            </nav>
        </div>
    </div>
</template>

<script>
    export default defineComponent({
        data() {
            return {
                isOpen: false,
                activeClass: 'bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100',
                inactiveClass: 'border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100',
                router: useRouter()
            }
        },
        mounted(){
        }
    })
</script>