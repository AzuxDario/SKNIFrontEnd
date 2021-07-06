<template>
  <div class="mt-2">
    <v-row justify="center" v-if="project != undefined">
      <v-col cols="12" sm="10" md="8" lg="6" xl="4">
        <v-card tile elevation="0">
          <v-card-title class="mb-2" style="word-break: break-word">
            <p class="text-h2 text-left mb-0">{{ project.title }}</p>
          </v-card-title>
          <v-card-subtitle class="text-left pb-0">
            <v-chip label>
              <v-avatar left>
                <v-icon>mdi-account-circle</v-icon>
              </v-avatar>
              <span>{{ project.creator.username }}</span>
            </v-chip>
            <p class="mb-0">
              Data publikacji:
              <b>{{
                project.publication_date | moment('YYYY-MM-DD HH:mm:ss')
              }}</b>
            </p>
          </v-card-subtitle>
          <v-card-actions v-if="project.repository_link" class="py-0 ml-2">
            <v-btn-cap
              class="purple darken-2 white--text"
              :href="project.repository_link"
              target="_blank"
            >
              <v-icon left class>mdi-github</v-icon>
              <span>Repozytorium</span>
            </v-btn-cap>
            <v-spacer />
          </v-card-actions>
          <v-card-text>
            <markdown-it-vue
              class="md-body text-left"
              :content="project.text"
              :options="markdownOptions"
            />
          </v-card-text>
        </v-card>
        <gallery breakpoints="xs6" :imgs="project.gallery" />
      </v-col>
    </v-row>
    <v-row justify="center" v-if="project != undefined">
      <v-col cols="12" sm="10" md="8" lg="6" xl="4" class="text-center">
        <p>
          Made with
          <v-icon color="red">mdi-heart</v-icon> by
        </p>
        <div v-for="author in project.authors" :key="author.username">
          <p>
            <b
              >{{ author.first_name }} "{{ author.username }}"
              {{ author.last_name }}</b
            >
          </p>
        </div>
        <p>
          at
          <b>{{ project.section.name }}</b>
        </p>
      </v-col>
    </v-row>
    <v-speed-dial fixed right bottom direction="top" v-model="fab" v-if="role">
      <template v-slot:activator>
        <v-btn-cap
          fab
          v-model="fab"
          class="text-body-1 font-weight-bold"
          color="primary"
        >
          <v-icon>mdi-cog</v-icon>
        </v-btn-cap>
      </template>
      <v-btn-cap
        fab
        color="orange"
        :to="{ name: 'editProject', params: { id: $route.params.id } }"
      >
        <v-icon>mdi-pen</v-icon>
      </v-btn-cap>
      <v-btn-cap fab color="error" @click="dialog = true">
        <v-icon>mdi-delete</v-icon>
      </v-btn-cap>
    </v-speed-dial>
    <confirmation-dialog
      v-if="dialog"
      @yes="deleteProject($route.params.id)"
      @no="dialog = false"
      :text="dialogText"
    ></confirmation-dialog>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { ProjectsService } from '@/services/ProjectsService';
import { ProjectModel } from '@/models/ProjectModel';

@Component
export default class Project extends Vue {
  private projectsService!: ProjectsService;
  private project!: ProjectModel;

  private beforeCreate() {
    this.projectsService = new ProjectsService();
  }

  private mounted() {
    this.projectsService
      .getProject(+this.$route.params.id)
      .then((project) => {
        this.project = project;
      })
      .catch(() => {
        this.$router.replace({ name: 'error404' });
      });
  }

  get auth(): boolean {
    return this.$store.getters.isAuthenticated;
  }
  get role(): boolean {
    if (this.auth) {
      return this.$store.getters.user.permissions['RESTApi.change_project'];
    }
    else{
      return false
    }
  }
  get dialogText() {
    return 'Czy na pewno chcesz usunąć artykuł "' + this.project.title + '"?';
  }

  private deleteProject(id: number) {
    this.projectsService
      .deleteProject(id)
      .then((res) => {
        if (res.status === 204) {
          this.$store.dispatch('successMessage', 'Projekt został usunięty');
          this.$router.replace({ name: 'projects', params: { page: '1' } });
        }
      })
      .catch(() => {
        this.$store.dispatch('errorMessage', 'Błąd poczas usuwania projektu!');
      });
  }

  private data() {
    return {
      project: this.project,
      fab: false,
      dialog: false,
      markdownOptions: {
        markdownIt: {
          html: true,
          linkify: true,
        },
        githubToc: {
          anchorLink: false,
        },
      },
    };
  }
}
</script>
