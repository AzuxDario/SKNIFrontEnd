<template>
  <div>
    <div v-for="project in projects" :key="project.id" style="border: 1px solid gray">
        <p>
          <a v-bind:href="'/#/project/'+ project.id">{{ project.title }}</a>
        </p>
        <p>
            {{ project.text }}
        </p>
        <p>
            {{ project.section.name }}
        </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ProjectModel } from "@/models/ProjectModel";
@Component
export default class ProjectsList extends Vue {
  @Prop() projects!: ProjectModel[];
}
</script> 