<template>
    <div class="notification-list mx-md-10 my-5 d-flex flex-column">
        <v-scroll-y-transition :group="true">
            <notification-message 
                v-for="notification in notifications" 
                :key="notification.id" 
                :notification="notification" 
            />
        </v-scroll-y-transition>
    </div>
</template>
<script>
import NotificationMessage from './NotificationMessage.vue'
import { mapState } from 'vuex'

export default {
    components: {
        NotificationMessage
    },
    computed: mapState(['notifications'])
}
</script>
<style scoped>
    .notification-list {
        z-index: 1000;
        position: fixed;
        bottom: 0;
        right: 0;
    }

    @media screen and (min-width: 960px) {
        .notification-list {
            max-width: 400px;
        }
    }

</style>