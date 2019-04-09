<template>
<!-- <div :style="{ backgroundImage: 'url(' + image + ')' }"> -->
    <v-container fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-toolbar dark color="purple darken-4">
                            <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-avatar
                                color="purple lighten-2"
                                class="subheading white--text"
                                size="24"
                                v-text="step"
                            ></v-avatar>
                        </v-toolbar>

                        <v-window v-model="step">
                            <v-window-item :value="1">
                                <v-card-text>
                                    <v-text-field
                                        label="E-mail"
                                        name="email"
                                        type="email"
                                        v-model="email"
                                        :rules="emailRules"
                                        required
                                    ></v-text-field>
                                    <span class="caption grey--text text--darken 1">
                                        This is the email you will use to login to your Vue Test App account
                                    </span>
                                </v-card-text>
                            </v-window-item>

                            <v-window-item :value="2">
                                <v-card-text>
                                    <v-text-field
                                        label="Password"
                                        name="password"
                                        type="password"
                                        v-model="password"
                                        :rules="passwordRules"
                                        required
                                    ></v-text-field>
                                    <v-text-field
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        type="password"
                                        v-model="confirmPassword"
                                        :rules="confirmPasswordRules"
                                        required
                                    ></v-text-field>
                                </v-card-text>
                            </v-window-item>

                            <v-window-item :value="3">
                                <div class="pa-3 text-xs-center">
                                    <v-img
                                        class="mb-3"
                                        contain
                                        height="128"
                                        src="https://cdn.vuetifyjs.com/images/logos/v.svg"
                                    ></v-img>
                                    <h3 class="title font-weight-light mb-2">
                                        Welcome to Vue Test App
                                    </h3>
                                    <span class="caption grey--text"
                                        >Thanks for signing up!</span
                                    >
                                </div>
                            </v-window-item>
                        </v-window>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-btn
                                :disabled="step === 1"
                                v-show="step !== 3"
                                flat
                                @click="step--"
                                >Back</v-btn
                            >
                            <v-spacer></v-spacer>
                            <v-btn
                                :disabled="email === ''"
                                v-if="step === 1"
                                @click="step++"
                                >Next</v-btn
                            >
                            <v-btn
                                :disabled="
                                    password !== confirmPassword ||
                                        password == '' ||
                                        confirmPassword == ''
                                "
                                v-show="step === 2"
                                @click="
                                    submit();
                                    step++;
                                "
                                >Submit</v-btn
                            >
                        </v-card-actions>

                        <!-- <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                prepend-icon="person"
                name="email"
                label="Email"
                type="email"
                v-model="email"
                :rules="emailRules"
                required
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Password"
                id="password"
                type="password"
                required
                v-model="password"
                :rules="passwordRules"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" :disabled="!valid" @click="submit">Join</v-btn>
          </v-card-actions>-->
                    </v-form>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
<!-- </div> -->
</template>

<script>
export default {
    name: 'Join',
    data() {
        return {
            step: 1,
            valid: false,
            email: '',
            password: '',
            confirmPassword: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            passwordRules: [
                v => !!v || 'Password is required',
                v =>
                    v.length >= 6 ||
                    'Password must be greater than 6 characters'
            ],
            confirmPasswordRules: [
                v => !!v || 'Confirm your password',
                v =>
                    v == this.password ||
                    'Confirm password does not match password'
            ],
            image: 'http://source.unsplash.com/hTR1XPtTo_k'
        };
    },
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                this.$store.dispatch('userJoin', {
                    email: this.email,
                    password: this.password
                });
            }
        }
    },
    computed: {
        formTitle() {
            switch (this.step) {
                case 1:
                    return 'Join';
                case 2:
                    return 'Create password';
                default:
                    return 'Account created';
            }
        }
    }
};
</script>

<style scoped>
</style>
