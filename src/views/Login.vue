<template>
  <v-container>
    <v-layout row justify-center class='text-xs-center'>
      <v-flex xs4 class='lighten-4'>
        <v-container class='text-xs-center'>
          <v-card flat>
            <v-card-title primary-title>
              <h1>Logowanie</h1>
            </v-card-title>
            <v-form>
              <v-text-field prepend-icon='mdi-account' name='Username' label='Username' v-model='login'></v-text-field>
              <v-text-field
                :rules="rules"
                prepend-icon='mdi-lock'
                name='Password'
                label='Password'
                type='password'
                v-model='password'
              ></v-text-field>
              <v-card-actions>
                <v-btn primary color="#64b5f6" :loading="loading" large block @click='loginUser()'>Zaloguj</v-btn>
              </v-card-actions>
              <v-card-actions>
                <v-btn primary block @click='goToRegister()'>Rejestracja</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import {
  login,
} from '../helpers/auth';
import Axios from 'axios';

@Component
export default class Login extends Vue {
  private login: string = '';
  private password: string = '';
  private loading!: boolean;

  private data() {
    return {
      loading: this.loading,
      rules: [
        (v: string) => !!v || 'Pole jest wymagane'
      ]
    };
  }

  private async loginUser() {
    this.loading = true;
    try {
      const res = await login(this.login, this.password);
      this.$forceUpdate();
    } catch (error) {
      // TODO: Show error message
    }
    this.loading = false;
  }

  private async goToRegister() {
    this.$router.push('register');
  }
}
</script>
