<template>
  <div v-if="project != undefined">
    <p>ID projektu {{$route.params.id}}</p>
    <p>Nazwa: {{ project.title }}</p>
    <p>Opis: {{ project.text }}</p>
    <p>Sekcja: {{ project.section.name }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ProjectModel } from "@/models/ProjectModel";

@Component
export default class SingleProject extends Vue {
  @Prop() project!: ProjectModel;
}
</script>