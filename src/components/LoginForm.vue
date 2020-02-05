<template>
    <v-container>
        <v-card light elevation="24">
            <v-card-title class="grey lighten-2 title">
                Zaloguj się
            </v-card-title>
            <v-card-text>
                <v-form ref="loginForm" v-model="valid">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                v-model="email"
                                name="email"
                                type="email"
                                prepend-icon="mdi-email"
                                :rules="emailRules"
                                label="Email"
                                required />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                v-model="password"
                                name="password"
                                type="password"
                                prepend-icon="mdi-key"
                                label="Hasło"
                                @keydown.enter="validate"
                                required />
                        </v-col>
                    </v-row>
                    <v-card-actions class="d-flex justify-end">
                        <v-btn :disabled="loadingLogin || !valid" :loading="loadingLogin" color="primary" class="mr-4" @click="validate">Potwierdź</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>
<script>
export default {
  data: () => ({
    valid: true,
    username: '',
    email: '',
    password: '',
    // loadinglogin: false,
    emailRules: [
      v => !!v || 'Pole jest wymagane',
      v => /.+@.+\..+/.test(v) || 'E-mail musi być poprawny',
    ]
  }),
  computed: {
    loadingLogin () {
      return this.$store.state.loadinglogin
    }
  },
  methods: {
    validate () {
      if (this.$refs.loginForm.validate()) {
        this.$store.dispatch('loginUser', {
          email: this.email,
          password: this.password
        })
      }
    },
  },
}

</script>
<style lang="css">
    
</style>