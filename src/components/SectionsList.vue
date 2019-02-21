<template>
  <div>
    <div v-for='section in sections' :key='section.title' style='border: 1px solid gray'>
        <p>
            {{ section.name }}
        </p>
        <p>
            {{ section.description }}
        </p>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { SectionModel } from '@/models/SectionModel';
@Component
export default class SectionsList extends Vue {
  @Prop() public sections!: SectionModel[];
}
</script>