<template>
    <v-alert 
        :type="notification.type || 'info'" 
        :icon="notification.icon"
        v-model="showAlert" 
        border="left" 
        min-width="400px"
        :dismissible="notification.dismissible==null ? true : notification.dismissible"
        elevation="10"
    >
        {{ notification.message }}
    </v-alert>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    props: {
        notification: {
            type: Object
        }
    },
    data: () => ({
        timeout: null,
        showAlert: true,
    }),
    beforeDestroy() {
        clearTimeout(this.timeout)
    },
    watch: {
        showAlert(val) {
            this.removeNotification(this.notification)
        }
    },
    created() {
        this.timeout = setTimeout(() => {
            this.removeNotification(this.notification)
        }, this.notification.timeout || 3000)
    },
    methods: mapActions(["removeNotification"])
}
</script>
<style scoped>

</style>