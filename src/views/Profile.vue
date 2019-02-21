<template>
  <single-profile v-bind:profile="profile"></single-profile>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue";
import { ProfilesService } from "@/services/ProfilesService";
import { ProfileModel } from "@/models/ProfileModel";

@Component()
export default class Profile extends Vue {
    private profilesService!: ProfilesService;
    private profile!: ProfileModel;

    beforeCreate() {
    this.profilesService = new ProfilesService();
  }

   mounted() {
    this.profilesService.getProfile(+this.$route.params.id).then(profile => {
      this.profile = profile;

      this.$router.replace({
        name: "profile",
        params: { id: "" + profile.id }
      });
    });
   }

    public data() {
    return {
      profile: this.profile
    };
  }
}
</script>
