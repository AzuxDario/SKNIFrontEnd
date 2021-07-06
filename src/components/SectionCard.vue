<template>
  <div>
    <v-card class="elevation-3">
      <v-card-title class="grey lighten-4">
        <v-row align="center" justify="start">
          <v-col cols="auto" class="py-0 pr-0">
            <v-icon x-large left class="primary--text">{{
              section.icon
            }}</v-icon>
          </v-col>
          <v-col class="pl-1">
            <h3 class="headline" style="word-break: break-word">
              {{ section.name }}
            </h3>
          </v-col>
        </v-row>
      </v-card-title>
      <v-divider />
      <v-card-text class="text-left">
        <markdown-it-vue
          class="md-body"
          :content="section.description"
          :options="markdownOptions"
        />
      </v-card-text>
      <div v-if="Projects.length > 0">
        <v-divider></v-divider>
        <v-card-title class="justify-center">Nasze projekty</v-card-title>
        <v-card-text>
          <v-row justify="center">
            <v-col cols="auto" v-for="project in Projects" :key="project.title">
              <v-hover>
                <template v-slot:default="{ hover }">
                  <v-chip
                    large
                    :color="hover ? 'grey lighten-1' : ''"
                    style="cursor: pointer"
                    :to="{ name: 'project', params: { id: project.id } }"
                  >
                    <v-icon left>mdi-file-cog</v-icon>
                    <span>{{ project.title }}</span>
                  </v-chip>
                </template>
              </v-hover>
            </v-col>
          </v-row>
        </v-card-text>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn-cap
          depressed
          color="warning"
          :to="{ name: 'section', params: { id: section.id } }"
          >Zobacz więcej</v-btn-cap
        >
        <v-speed-dial direction="top" v-if="role" v-model="fab" class="ml-2">
          <template v-slot:activator>
            <v-btn-cap
              x-small
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
            x-small
            color="orange"
            :to="{ name: 'sectionEdit', params: { id: section.id } }"
          >
            <v-icon>mdi-pen</v-icon>
          </v-btn-cap>
          <v-btn-cap fab x-small color="error" @click="dialog = true">
            <v-icon>mdi-delete</v-icon>
          </v-btn-cap>
        </v-speed-dial>
      </v-card-actions>
    </v-card>
    <confirmation-dialog
      v-if="dialog"
      @yes="deleteSection"
      @no="dialog = false"
      :text="dialogText"
    ></confirmation-dialog>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { SectionModel } from '@/models/SectionModel';

@Component
export default class SectionCard extends Vue {
  @Prop() public section!: SectionModel;
  @Prop() public projects!: any;

  get Projects() {
    const filtered = this.projects.filter((el: any) => {
      return el.section.name === this.section.name;
    });
    return filtered;
  }

  get auth(): boolean {
    return this.$store.getters.isAuthenticated;
  }

  get role(): boolean {
    if (this.auth) {
      return this.$store.getters.user.permissions['RESTApi.change_section'];
    } else {
      return false;
    }
  }

  private removeMarkdown(text: string) {
    const removeMd = require('remove-markdown');
    return removeMd(text);
  }

  get dialogText() {
    return 'Czy na pewno chcesz usunąć sekcję "' + this.section.name + '"?';
  }

  get text(): string {
    return this.removeMarkdown(this.section.description);
  }

  private deleteSection() {
    this.$data.dialog = false;
    this.$emit('delete', this.section.id);
  }
  private data() {
    return {
      fab: false,
      dialog: false,
      markdownOptions: {
        githubToc: {
          anchorLink: false,
        },
      },
    };
  }
}
</script>
