<template>
  <div class="mt-4 mb-2 mx-4 fill-height">
    <div v-if="hardware && hardware.length > 0">
      <v-row justify="center" v-for="item in hardware" :key="item.id">
        <v-col cols="12" sm="10" md="8" lg="6" xl="4">
          <hardware-card :hardware="item"></hardware-card>
        </v-col>
      </v-row>
    </div>
    <v-row align="center" class="fill-height" v-else>
      <v-col>
        <div class="text-h3 font-weight-bold text-center">
          {{ loading ? 'Ładowanie danych' : 'Brak hardware' }}
          <v-progress-circular
            indeterminate
            color="primary"
            v-if="loading"
          ></v-progress-circular>
        </div>
      </v-col>
    </v-row>
    <v-btn
      fab
      fixed
      bottom
      right
      v-if="role"
      :to="{ name: 'hardwareAdd' }"
      class="success"
    >
      <v-icon class="white--text">mdi-plus</v-icon>
    </v-btn>
    <v-pagination
      v-model="pagination.currentPage"
      :length="pagination.pageCount"
      @input="paginationClicked"
      prev-icon="mdi-chevron-left"
      next-icon="mdi-chevron-right"
      class="mt-2"
      v-if="hardware && hardware.length > 0"
    ></v-pagination>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { HardwareService } from '@/services/HardwareService';
import { HardwareModel } from '@/models/HardwareModel';
import { PaginationModel } from '@/models/PaginationModel';
import { PaginationContainer } from '@/models/PaginationContainer';

import HardwareCard from '@/components/HardwareCard.vue';

@Component({
  components: {
    HardwareCard,
  },
})
export default class HardwareList extends Vue {
  private hardwareService!: HardwareService;
  private pagination!: PaginationModel;
  private hardware!: HardwareModel[];
  get auth(): boolean {
    return this.$store.getters.isAuthenticated;
  }

  get role(): boolean {
    if (this.auth) {
      return this.$store.getters.user.permissions['RESTApi.add_hardware'];
    } else {
      return false;
    }
  }
  private beforeCreate() {
    this.hardwareService = new HardwareService();
    this.pagination = new PaginationModel(1, 3, 6);
  }

  private mounted() {
    this.getHardware();
  }

  private paginationClicked(pageNumber: number) {
    this.$router.replace({
      name: 'hardwareList',
      params: { page: '' + pageNumber },
    });

    this.getHardware();
  }

  private getHardware() {
    const pageNumber = +this.$route.params.page;
    if (pageNumber === undefined || isNaN(pageNumber) || pageNumber < 1) {
      this.paginationClicked(1);
      return;
    }

    this.pagination.currentPage = pageNumber;
    this.hardwareService
      .getHardwareByPage(pageNumber, this.pagination.itemsPerPage, false)
      .then((paginationContainer: PaginationContainer<HardwareModel>) => {
        this.hardware = paginationContainer.results;
        if (!this.hardware.length && pageNumber !== 1) {
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

  private deleteHardware(id: number) {
    this.hardwareService
      .deleteHardware(id)
      .then((res) => {
        if (res.status === 204) {
          this.$store.dispatch('successMessage', 'Sprzęt został usunięty');
          this.$router.replace({ name: 'hardwareList', params: { page: '1' } });
        }
      })
      .catch(() => {
        this.$store.dispatch('errorMessage', 'Błąd poczas usuwania sprzętu!');
      });
  }

  private data() {
    return {
      hardware: this.hardware,
      loading: true,
    };
  }
}
</script>
