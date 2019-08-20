<template>
    <!--<v-footer color='#EEF4F9' class="main-footer" app absolute>
         <img class="img" :src="require('../assets/logo_color.png')" />
      <v-layout class="rights" justify-center row wrap>
          <strong> SKNI KOD</strong>  &nbsp;
        &copy; 2019
      </v-layout>
        <v-btn href="https://www.facebook.com/skni.kod/" small icon flat color="#64b5f6" class="font-weight-bold" >
            <v-icon>mdi-facebook</v-icon>
        </v-btn>
    </v-footer>-->
    <v-footer
            color='#EEF4F9'
            height="auto"
            class="main-footer"
    >
        <v-card
                flat
                tile
                class="text-xs-center"
                color='#EEF4F9'
                width="100%"
        >

            <v-card-text class="pt-0" color="Gray">
                <img class="img" :src="require('../assets/logo_color.png')" />
            </v-card-text>

            <v-card-text color="gray" style="padding-top: 0px; padding-bottom: 0px;">
                <strong> SKNI KOD</strong>  &nbsp;
                &copy; 2019 <v-btn href="https://www.facebook.com/skni.kod/" small icon flat color="#64b5f6" class="font-weight-bold" >
                <v-icon>mdi-facebook</v-icon>
            </v-btn>
            </v-card-text>
        </v-card>
    </v-footer>
</template>
<script>
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class Footer extends Vue {

}

</script>
<style lang="scss" scoped>
.main-footer {
    padding: 5px 0 5px 0;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    //display: flex;
    //justify-content: center;
    //flex-direction: column;
    //.rights {
    //    color: gray;
    //    margin: 10px 0 10px 0;
    //}
    //.img {
    //    width: 120px;
    //}
}
    .img{
        width: 120px;
    }
</style>
