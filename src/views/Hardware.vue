<template>
  <div>
    <hardwares-list v-bind:hardwares='hardwares'></hardwares-list>
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
import HardwaresList from '@/components/HardwaresList.vue';
import { HardwaresService } from '@/services/HardwaresService';
import { HardwareModel } from '@/models/HardwareModel';
import { PaginationModel } from '@/models/PaginationModel';
import { PaginationContainer } from '@/models/PaginationContainer';

@Component
export default class Hardware extends Vue {
  private hardwaresService!: HardwaresService;
  private pagination!: PaginationModel;
  private hardwares!: HardwareModel[];

  private beforeCreate() {
    this.hardwaresService = new HardwaresService();
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
    this.hardwaresService
      .getHardwareByPage(pageNumber, this.pagination.itemsPerPage)
      .then((paginationContainer: PaginationContainer<HardwareModel>) => {
        this.hardwares = paginationContainer.results;
        this.pagination.itemCount = paginationContainer.count;
      });

    this.$router.replace({
      name: 'hardware',
      params: { page: '' + pageNumber },
    });
  }

  private data() {
    return { hardwares: this.hardwares };
  }
}
</script>

<style>
.v-pagination .primary {
  background-color: rgb(65, 65, 255) !important;
}
</style>