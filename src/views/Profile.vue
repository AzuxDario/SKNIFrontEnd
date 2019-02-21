<template>
  <single-profile v-bind:profile='profile'></single-profile>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import { ProfilesService } from '@/services/ProfilesService';
import { ProfileModel } from '@/models/ProfileModel';

@Component
export default class Profile extends Vue {
  private profilesService!: ProfilesService;
  private profile!: ProfileModel;

  private beforeCreate() {
    this.profilesService = new ProfilesService();
  }

  private mounted() {
    this.profilesService.getProfile(+this.$route.params.id).then((profile) => {
      this.profile = profile;

      this.$router.replace({
        name: 'profile',
        params: { id: '' + profile.id },
      });
    });
  }

  private data() {
    return {
      profile: this.profile,
    };
  }
}
</script>
