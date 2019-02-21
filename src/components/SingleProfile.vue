<template>
  <div v-if='profile != undefined'>
    <p>ID usera {{$route.params.id}}</p>
    <p>Imie: {{ profile.user.first_name }}</p>
    <p>Nazwisko: {{profile.user.last_name}}</p>
    <p>Nazwa użytkownika: {{profile.user.username}}</p>
    <p>Adres email: {{profile.user.email}}</p>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ProfileModel } from '@/models/ProfileModel';

@Component
export default class SingleProfile extends Vue {
  @Prop() public profile!: ProfileModel;
}
</script>