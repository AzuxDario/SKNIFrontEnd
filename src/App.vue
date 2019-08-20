<template>
  <v-app id='app' class='main-container'>
    <v-navigation-drawer app v-model="sidebar" width="150">
      <v-list dense class="pt-0">
        <v-list-tile
                v-for="item in toolbarItems"
                :key="item.link"
                :to='item.link'
        >
          <v-list-tile-content :to='item.link'>
            <v-list-tile-title :to='item.link'>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar dark app>
      <v-toolbar-side-icon class="hidden-sm-and-up" @click="sidebar = !sidebar"><v-icon>mdi-menu</v-icon></v-toolbar-side-icon>
      <!--<v-menu left bottom class='hidden-md-and-up'>
        &lt;!&ndash;<v-icon slot='activator'>mdi-menu</v-icon>&ndash;&gt;
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" class="hidden-md-and-up">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile v-for='item in toolbarItems' :key='item.link'>
            <v-list-tile-content>
              <v-btn flat :to='item.link'>{{ item.title }}</v-btn>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>-->

      <v-toolbar-items class='hidden-sm-and-down'>
        <v-btn v-for='item in toolbarItems' :key='item.link' :to='item.link'>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <!--<div id='nav'></div>-->
    <v-content>
      <v-container fluid style="padding: 0">
        <router-view/>
      </v-container>
    </v-content>
    <Footer/>
  </v-app>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import Footer from './components/Footer.vue';

@Component({
    components: {
        Footer,
    },
})
export default class App extends Vue {
  private toolbarItems = [
    { link: '/', title: 'Strona główna' },
    { link: '/about', title: 'O nas' },
    { link: '/articles', title: 'Artykuły' },
    // { link: '/sections', title: 'Sekcje' },
    { link: '/projects', title: 'Projekty' },
    // { link: '/hardware', title: 'Hardware' },
    // { link: '/profiles', title: 'Profile' },
  ];

  public data(){
      return {sidebar: false};
  };
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
/*  min-height: 100vh; !* will cover the 100% of viewport *!
  overflow: hidden;
  display: block;
  position: relative;
  padding-bottom: 100px; !* height of your footer *!*/
}

.section-title{
    font-size: 300%;
}
</style>
