<template>
    <v-footer height='auto' color='#EEF4F9' class="main-footer" style='position: absolute; bottom: 0; width: 100%'>
         <img class="img" src="http://localhost:8081/img/logo_color.d4be6244.png" />
      <v-layout class="rights" justify-center row wrap>
          <strong> SKNI KOD</strong>  &nbsp;
        &copy; 2019 
      </v-layout>
      <v-layout>
          <v-btn  flat small color="#64b5f6" class="font-weight-bold" >
              strona główna
          </v-btn>
          <v-btn  flat small color="#64b5f6" class="font-weight-bold">
              o nas
          </v-btn>
          <v-btn  flat small color="#64b5f6" class="font-weight-bold" >
              kontakt
          </v-btn>
          <v-btn href="https://www.facebook.com/skni.kod/" target="_blank" small icon flat color="#64b5f6" class="font-weight-bold" >
              <v-icon>mdi-facebook</v-icon>
          </v-btn>
             <v-btn href="https://www.instagram.com/skni.kod/" target="_blank" small icon flat color="#64b5f6" class="font-weight-bold" >
              <v-icon>mdi-instagram</v-icon>
          </v-btn>
      </v-layout>
    </v-footer>
</template>
<script>
import { Component, Prop, Vue } from 'vue-property-decorator';
export default class Footer extends Vue {
}

</script>
<style lang="scss" scoped>
.main-footer{
    padding:5px 0 5px 0;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    display: flex;
    justify-content: center;
    flex-direction: column;
    .rights{
    color:gray;
    margin: 10px 0 10px 0;
    }
    .img{
        width: 120px;
    }
}
</style>
