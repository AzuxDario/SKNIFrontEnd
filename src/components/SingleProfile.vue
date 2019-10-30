<template>
  <v-container v-if='profile != undefined'>
    <v-card class="profile">
    <div class="pr-flex">    <v-btn small icon flat color="#64b5f6" class="font-weight-bold" >
              <v-icon>mdi-account</v-icon>
          </v-btn> <div class="info"><p>Imię: {{ profile.user.first_name }} </p>
           <p> Nazwisko: {{profile.user.last_name}} </p> <p>Nazwa użytkownika: {{profile.user.username}}</p></div> </div>
     <div class="pr-flex-center">    <v-btn small icon flat color="#64b5f6" class="font-weight-bold" >
              <v-icon>mdi-email-outline</v-icon>
          </v-btn> <div class="info">
    Adres email: {{profile.user.email}}
    </div>
     </div>

      <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" flat  color="#64b5f6" class="font-weight-bold change-data" >
              Zmień dane
          </v-btn>
      </template>
<v-card class="change-data-card">
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Edycja danych
        </v-card-title>
        <div class="inputs">
       <v-text-field
            label="Imię"
          ></v-text-field>
           <v-text-field
            label="Nazwisko"
          ></v-text-field>
           <v-text-field
            label="Nazwa"
          ></v-text-field>
           <v-text-field
            label="Email"
          ></v-text-field>
        
</div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
           flat  color="#64b5f6" 
            text
             @click="dialog = false"
          >
           Zapisz
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
     
    </v-card>
</v-container>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ProfileModel } from '@/models/ProfileModel';

@Component
export default class SingleProfile extends Vue {
  @Prop() public profile!: ProfileModel;
  data(){
    return{
      dialog: false
    }
  }
}
</script>
<style lang="scss" scoped>
.profile.v-card{
  padding: 50px;
  width: 50%;
  margin: auto;
  p{
    text-align: left;
  }
}
.pr-flex{
  width: 400px;
  margin:auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  color: gray;
  font-weight: bold;
}
.pr-flex-center{
    width: 400px;
  margin:auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: gray;
  font-weight: bold;
  text-align: left;
}
.info{
  width: 80%;
  margin: auto;
}
.change-data{
  margin-top: 50px;

}
.inputs{
  width: 80%;
  margin: auto;
}
</style>