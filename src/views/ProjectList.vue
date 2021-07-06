<template>
  <div class="mt-4 mb-2 mx-4 fill-height">
    <v-row justify="center" v-if="projects && projects.length > 0">
      <v-col cols="12" sm="10" md="8" lg="6" xl="4">
        <project-card
          class="my-2"
          :project="project"
          @delete="deleteProject"
          v-for="project in projects"
          :key="project.title"
        ></project-card>
      </v-col>
    </v-row>
    <v-row align="center" class="fill-height" v-else>
      <v-col>
        <div class="text-h3 font-weight-bold text-center">
          {{ loading ? 'Ładowanie danych' : 'Brak projektów' }}
          <v-progress-circular
            indeterminate
            color="primary"
            v-if="loading"
          ></v-progress-circular>
        </div>
      </v-col>
    </v-row>
    <v-btn-cap
      fab
      fixed
      bottom
      right
      v-if="role"
      :to="{ name: 'addProject' }"
      class="success"
    >
      <v-icon class="white--text">mdi-plus</v-icon>
    </v-btn-cap>
    <v-pagination
      v-model="pagination.currentPage"
      :length="pagination.pageCount"
      @input="paginationClicked"
      prev-icon="mdi-chevron-left"
      next-icon="mdi-chevron-right"
      class="mb-3"
      v-if="projects && projects.length > 0"
    ></v-pagination>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ProjectsService } from '@/services/ProjectsService';
import { ProjectModel } from '@/models/ProjectModel';
import { PaginationModel } from '@/models/PaginationModel';
import { PaginationContainer } from '@/models/PaginationContainer';

import ProjectCard from '@/components/ProjectCard.vue';

@Component({
  components: {
    ProjectCard,
  },
})
export default class ProjectList extends Vue {
  private projectsService!: ProjectsService;
  private pagination!: PaginationModel;

  get auth(): boolean {
    return this.$store.getters.isAuthenticated;
  }

  get role(): boolean {
    if (this.auth) {
      return this.$store.getters.user.permissions['RESTApi.add_article'];
    } else {
      return false;
    }
  }

  private beforeCreate() {
    this.projectsService = new ProjectsService();
    this.pagination = new PaginationModel(1, 3, 3);
  }

  private created() {
    this.getProjects();
  }

  private paginationClicked(pageNumber: number) {
    this.$router.replace({
      name: 'projects',
      params: { page: '' + pageNumber },
    });

    this.getProjects();
  }

  private getProjects() {
    let pageNumber = +this.$route.params.page;
    if (pageNumber === undefined || isNaN(pageNumber)) {
      pageNumber = 1;
    }

    this.pagination.currentPage = pageNumber;
    this.projectsService
      .getProjectsByPage(pageNumber, this.pagination.itemsPerPage)
      .then((paginationContainer: PaginationContainer<ProjectModel>) => {
        this.$data.projects = paginationContainer.results;
        if (!this.$data.projects.length && pageNumber !== 1) {
          this.paginationClicked(1);
          return;
        }
        this.pagination.itemCount = paginationContainer.count;
        this.$data.loading = false;
      })
      .catch(() => {
        this.$data.loading = false;
      });
  }

  private deleteProject(id: number) {
    this.projectsService
      .deleteProject(id)
      .then((res) => {
        if (res.status === 204) {
          this.$store.dispatch('successMessage', 'Projekt został usunięty');
          this.$router.replace({
            name: 'projects',
            params: { page: 'reload' },
          });
        }
      })
      .catch(() => {
        this.$store.dispatch('errorMessage', 'Błąd poczas usuwania projektu!');
      });
  }

  private data() {
    return {
      projects: [],
      loading: true,
    };
  }
}
</script>
