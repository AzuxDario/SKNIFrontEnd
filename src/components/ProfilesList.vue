<template>
  <div>
    <div v-for='profile in profiles' :key='profile.id' style='border: 1px solid gray'>
      <p>{{ profile.user.first_name }}</p>
      <p>{{ profile.user.last_name }}</p>
      <p>
        <a v-bind:href="'/#/profile/'+ profile.id">{{ profile.user.username }}</a>
      </p>
      <p>{{ profile.user.email }}</p>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ProfileModel } from '@/models/ProfileModel';
@Component
export default class ProfilesList extends Vue {
  @Prop() public profiles!: ProfileModel[];
}
</script> 