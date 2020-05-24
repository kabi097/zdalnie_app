<template>
    <v-container>
        <v-card light elevation="24">    
            <v-card-text>
                <v-stepper> 
                    <v-stepper-header>
                        <v-stepper-step step="1">
                            Rodzaj konta
                        </v-stepper-step>
                        <v-stepper-step step="2">
                            Obrazek profilowy
                        </v-stepper-step>
                        <v-stepper-step step="3">
                            Dane profilowe
                        </v-stepper-step>
                    </v-stepper-header>
                    <v-stepper-items>
                        <v-stepper-content step="1">
                            Wybierz rodzaj konta:
                            <v-row align-content="center" justify="center">
                                <v-col cols="12" sm="6">
                                    <v-btn block class="mx-2" dark color="green darker-2">
                                        <v-icon left>mdi-account</v-icon>
                                        Konto osobiste
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-btn block class="mx-2" dark color="orange darker-2">
                                        <v-icon left>mdi-domain</v-icon>
                                        Konto firmowe
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
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
    passwordRepeat: '',
    nameRules: [
      v => !!v || 'Pole jest wymagane',
      v => (v && v.length >= 3) || 'Nazwa użytkownika musi mieć minimum 3 litery',
    ],
    emailRules: [
      v => !!v || 'Pole jest wymagane',
      v => /.+@.+\..+/.test(v) || 'E-mail musi być poprawny',
    ],
    passwordRules: [
        v => v.length >= 8 || 'Hasło musi mieć co najmniej 8 znaków',
    ],
  }),
  methods: {
    validate () {
      if (this.$refs.registerForm.validate()) {
        this.$store.dispatch('registerUser', {
          email: this.email,
          username: this.username,
          publicEmail: this.email,
          publicPhone: '459 785 325',
          publicAddress: 'ul. Nowa 5, 98-547 Warszawa',
          type: true,
          password: this.password
        })
      }
    },
  },
}

</script>
<style lang="css">
    
</style>