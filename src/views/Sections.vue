<template>
  <div>
    <sections-list v-bind:sections='sections'></sections-list>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import SectionsList from '@/components/SectionsList.vue';
import { SectionsService } from '@/services/SectionsService';
import { SectionModel } from '@/models/SectionModel';

@Component
export default class Section extends Vue {
  private sectionsService!: SectionsService;
  private sections!: SectionModel[];
  constructor() {
    super();
    this.sectionsService = new SectionsService();
  }
  public mounted() {
    this.sectionsService.getAllSections().then((p) => {
      this.sections = p;
      for (let i = 0; i < this.sections.length; ) {
        if (this.sections[i].isVisible === false) {
          this.sections.splice(i, 1);
        } else {
          i++;
        }
      }
    });
  }

  public data() {
    return { sections: this.sections };
  }
}
</script>