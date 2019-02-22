<template>
  <v-container>
    <img src="../assets/czarnakaczka.jpg">

    <v-container v-if="isLogged">
      <v-card-actions>
        <v-btn primary large block @click="logout()">Logout</v-btn>
      </v-card-actions>
    </v-container>
    <v-container v-else>
      <v-card-actions>
        <v-btn primary large block @click="goToLogin()">Login</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn primary large block @click="goToRegister()">Register</v-btn>
      </v-card-actions>
    </v-container>
  </v-container>
</template>

<script lang='ts'>
import Vue from "vue";
import Component from "vue-class-component";
import { isLoggedIn, logout } from "@/helpers/auth.ts";

@Component
export default class UserPanel extends Vue {
  private isLogged = false;

  private mounted() {
    isLoggedIn().then((r) => (this.isLogged = r));
  }

  private goToLogin() {
    this.$router.push("/login");
  }

  private goToRegister() {
    this.$router.push("/register");
  }

  private logout() {
    logout();
    this.isLogged = false;
  }
}
</script>
