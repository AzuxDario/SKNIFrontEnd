<template>
  <div>
    <projects-list v-bind:projects='projects'></projects-list>
      <v-pagination
        v-model='pagination.currentPage'
        :length='pagination.pageCount'
        @input='paginationClicked'
      ></v-pagination>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import ProjectsList from '@/components/ProjectsList.vue';
import { ProjectsService } from '@/services/ProjectsService';
import { ProjectModel } from '@/models/ProjectModel';
import { PaginationModel } from '@/models/PaginationModel';
import { PaginationContainer } from '@/models/PaginationContainer';

@Component
export default class Projects extends Vue {
  private projectsService!: ProjectsService;
  private pagination!: PaginationModel;
  private projects!: ProjectModel[];

  private beforeCreate() {
    this.projectsService = new ProjectsService();
    this.pagination = new PaginationModel(1, 3, 3);
  }

  private mounted() {
    let pageNumber = +this.$route.params.page;
    if (pageNumber === undefined || isNaN(pageNumber)) {
      pageNumber = 1;
    }

    this.pagination.currentPage = pageNumber;
    this.paginationClicked(pageNumber);
  }

  private paginationClicked(pageNumber: number) {
    this.projectsService
      .getProjectsByPage(pageNumber, this.pagination.itemsPerPage)
      .then((paginationContainer: PaginationContainer<ProjectModel>) => {
        this.projects = paginationContainer.results;
        this.pagination.itemCount = paginationContainer.count;
      });

    this.$router.replace({
      name: 'projects',
      params: { page: '' + pageNumber },
    });
  }

  private data() {
    return { projects: this.projects };
  }
}
</script>

<style>
.v-pagination .primary {
  background-color: rgb(65, 65, 255) !important;
}
</style>
