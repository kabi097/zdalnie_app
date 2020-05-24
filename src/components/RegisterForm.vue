<template>
    <v-container>
        <v-card light elevation="24">
            <v-card-title class="grey lighten-2 title">
                Zarejestruj się
            </v-card-title>
            <v-card-text>
                <v-form ref="registerForm" v-model="valid">
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                v-model="username"
                                name="username"
                                prepend-icon="mdi-account"
                                :rules="nameRules"
                                label="Nazwa użytkownika"
                                required />
                        </v-col>
                        <v-col cols="12" sm="6">
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
                        <v-col cols="12" sm="6">
                            <v-text-field
                                v-model="password"
                                name="password"
                                type="password"
                                prepend-icon="mdi-key"
                                :rules="passwordRules"
                                @keydown="$refs.registerForm.validate()"
                                @input="$refs.registerForm.validate()"
                                label="Hasło"
                                required />
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                v-model="passwordRepeat"
                                name="passwordRepeat"
                                type="password"
                                prepend-icon="mdi-key"
                                :rules="[((v) => v === this.password || 'Hasła muszą być identyczne')]"
                                label="Powtórz hasło"
                                required />
                        </v-col>
                    </v-row>
                    <v-card-actions class="d-flex justify-end">
                        <v-btn :disabled="!valid" color="primary" class="mr-4" @click="validate">Potwierdź</v-btn>
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