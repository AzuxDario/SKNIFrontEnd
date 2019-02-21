<template>
  <div>
    <profiles-list v-bind:profiles="profiles"></profiles-list>
      <v-pagination
        v-model="pagination.currentPage"
        :length="pagination.pageCount"
        @input="paginationClicked"
      ></v-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import ProfilesList from '@/components/ProfilesList.vue';
import { ProfilesService } from '@/services/ProfilesService';
import { ProfileModel } from '@/models/ProfileModel';
import { PaginationModel } from "@/models/PaginationModel";
import { PaginationContainer } from "@/models/PaginationContainer";

@Component()
export default class Profiles extends Vue {
  private profilesService!: ProfilesService;
  private pagination!: PaginationModel;
  private profiles!: ProfileModel[];

  beforeCreate() {
    this.profilesService = new ProfilesService();
    this.pagination = new PaginationModel(1, 3, 3);
  }

  public mounted() {
    var pageNumber = +this.$route.params.page;
    if (pageNumber == undefined || isNaN(pageNumber)) {
      pageNumber = 1;
    }

    this.pagination.currentPage = pageNumber;
    this.paginationClicked(pageNumber);
  }

  public paginationClicked(pageNumber: number) {
    this.profilesService
      .getProfilesByPage(pageNumber, this.pagination.itemsPerPage)
      .then((paginationContainer: PaginationContainer<ProfileModel>) => {
        this.profiles = paginationContainer.results;
        this.pagination.itemCount = paginationContainer.count;
      });

    this.$router.replace({
      name: "profiles",
      params: { page: "" + pageNumber }
    });
  }

  public data() {
    return { profiles: this.profiles };
  }
}
</script>

<style>
.v-pagination .primary {
  background-color: rgb(65, 65, 255) !important;
}
</style>
