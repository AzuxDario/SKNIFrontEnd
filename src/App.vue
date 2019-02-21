<template>
  <div id="app" class="main-container">
    <v-toolbar dark color="primary">
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="item in toolbarItems" :key="item.link" :to="item.link">{{item.title}}</v-btn>
      </v-toolbar-items>

      <v-spacer/>

      <v-toolbar-side-icon @click.stop="navDrawer = !navDrawer" class="hidden-md-and-up"/>

      <v-btn icon @click="loginDrawer = !loginDrawer">
        <v-icon>person</v-icon>
      </v-btn>
    </v-toolbar>

    <!-- NAVIGATION DRAWER -->
    <v-navigation-drawer v-model="navDrawer" absolute dark temporary>
      <v-list>
        <v-list-tile v-for="item in toolbarItems" :key="item.link">
          <v-list-tile-content>
            <v-btn flat :to="item.link">{{ item.title }}</v-btn>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

        <!-- LOGIN DRAWER -->
    <v-navigation-drawer v-model="loginDrawer" absolute dark right temporary>
      <UserPanel></UserPanel>
    </v-navigation-drawer>

    <!-- ROUTER VIEW -->
    <router-view/>

    <v-footer height="auto" color="primary" style="position: absolute; bottom: 0; width: 100%">
      <v-layout justify-center row wrap>
        &copy;2019 —
        <strong>SKNI KOD. Wszystkie kaczki zastrzeżone</strong>
      </v-layout>
    </v-footer>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class App extends Vue {
  private toolbarItems = [
    { link: '/', title: 'Home' },
    { link: '/about', title: 'About' },
    { link: '/articles', title: 'Articles' },
    { link: '/sections', title: 'Sekcje' },
    { link: '/projects', title: 'Projekty' },
    { link: '/hardware', title: 'Hardware' },
    { link: '/profiles', title: 'Profile' },
  ];
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

* {
  box-sizing: border-box;
}
*:before,
*:after {
  box-sizing: border-box;
}
html,
body {
  height: 100%;
  position: relative;
}
.main-container {
  min-height: 100vh; /* will cover the 100% of viewport */
  overflow: hidden;
  display: block;
  position: relative;
  padding-bottom: 100px; /* height of your footer */
}
</style>
