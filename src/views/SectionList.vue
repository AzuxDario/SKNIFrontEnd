<template>
  <div class="ma-4 fill-height">
    <div v-if="sections && sections.length > 0">
      <v-row justify="center" v-for="section in sections" :key="section.id">
        <v-col cols="12" sm="10" md="8" lg="6" xl="4">
          <section-card
            class="my-2"
            :section="section"
            :projects="projects"
            @delete="deleteSection"
          >
          </section-card>
        </v-col>
      </v-row>
    </div>
    <v-row align="center" class="fill-height" v-else>
      <v-col>
        <div class="text-h3 font-weight-bold text-center">
          {{ loading ? 'Ładowanie danych' : 'Brak sekcji' }}
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
      :to="{ name: 'sectionAdd' }"
      class="success"
    >
      <v-icon class="white--text">mdi-plus</v-icon>
    </v-btn-cap>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { SectionsService } from '@/services/SectionsService';
import { SectionModel } from '@/models/SectionModel';
import SectionCard from '@/components/SectionCard.vue';
import { ProjectsService } from '@/services/ProjectsService';

@Component({
  components: {
    SectionCard,
  },
})
export default class SectionList extends Vue {
  private sectionsService!: SectionsService;
  private sections!: SectionModel[];
  private projectsService!: ProjectsService;
  constructor() {
    super();
    this.sectionsService = new SectionsService();
    this.projectsService = new ProjectsService();
  }

  get auth(): boolean {
    return this.$store.getters.isAuthenticated;
  }
  get role(): boolean {
    if (this.auth) {
      return this.$store.getters.user.permissions['RESTApi.add_section'];
    } else {
      return false;
    }
  }
  public created() {
    this.projectsService.getAllProjects().then((res) => {
      this.$data.projects = res;
    });
    this.sectionsService
      .getAllSections()
      .then((res) => {
        this.sections = res.data;
        for (let i = 0; i < this.sections.length; ) {
          if (this.sections[i].isVisible === false) {
            this.sections.splice(i, 1);
          } else {
            i++;
          }
        }
        this.$data.loading = false;
      })
      .catch(() => {
        this.$data.loading = false;
      });
  }

  private deleteSection(id: number) {
    this.sectionsService
      .deleteSection(id)
      .then((res) => {
        if (res.status === 204) {
          this.$store.dispatch('successMessage', 'Sekcja została usunięta');
          this.$data.sections = this.$data.sections.filter((el: any) => {
            return el.id !== id;
          });
        }
      })
      .catch(() => {
        this.$store.dispatch('errorMessage', 'Błąd poczas usuwania secji!');
      });
  }

  private data() {
    return {
      sections: this.sections,
      projects: [],
      loading: true,
    };
  }
}
</script>
