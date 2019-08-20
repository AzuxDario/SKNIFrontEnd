<template>
  <div id='app' class='main-container'>

    <v-toolbar dark app color='primary'>
      <v-toolbar-items class='hidden-sm-and-down'>
        <v-btn v-for='item in toolbarItems' :key='item.link' :to='item.link'>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>

      <v-menu class='hidden-md-and-up' fixed>
        <v-icon slot='activator'>mdi-menu</v-icon>
        <v-list>
          <v-list-tile v-for='item in toolbarItems' :key='item.link'>
            <v-list-tile-content>
              <v-btn flat :to='item.link'>{{ item.title }}</v-btn>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-spacer/>
      <!--<v-btn icon to='/login'>
        <v-icon>mdi-account</v-icon>
      </v-btn>-->
    </v-toolbar>
    <div id='nav'></div>
    <v-content style="padding-top: 0px">
      <router-view/>
    </v-content>
    <Footer/>
  </div>
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
    { link: '/sections', title: 'Sekcje' },
    { link: '/projects', title: 'Projekty' },
    // { link: '/hardware', title: 'Hardware' },
    // { link: '/profiles', title: 'Profile' },
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

.section-title{
    font-size: 300%;
}
</style>
