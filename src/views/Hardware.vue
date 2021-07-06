<template>
  <div>
    <v-row no-gutters justify="center">
      <v-col md="6">
        <v-card outlined class="ma-4" v-if="!loading && hardware">
          <v-card-title
            class="
              primary
              text-h4
              white--text
              font-weight-bold
              justify-center
              py-1
            "
            >{{ hardware.name }}</v-card-title
          >
          <v-card-text>
            <markdown-it-vue
              class="md-body text-left mb-2"
              :content="hardware.description"
              :options="markdownOptions"
            />
            <v-divider />
            <v-row align="center" class="mt-1">
              <v-col cols="12" sm="4" class="py-0">
                <h3 class="text-center">Status: {{ hardware.status }}</h3>
              </v-col>
              <v-col cols="12" sm="4" class="text-center py-0"
                >Numer seryjny: {{ hardware.serial_number }}
              </v-col>
              <v-col cols="12" sm="4" class="text-center py-0">
                <v-btn-cap
                  depressed
                  :disabled="hardware.status !== 'Available'"
                  class="primary"
                >
                  <span>Wypożycz</span>
                  <v-icon right>mdi-dolly</v-icon>
                </v-btn-cap>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-skeleton-loader
          type="card-heading, card-avatar, article, actions"
          class="ma-4"
          v-else
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-speed-dial fixed right bottom direction="top" v-model="fab" v-if="role">
      <template v-slot:activator>
        <v-btn
          fab
          v-model="fab"
          class="text-body-1 font-weight-bold"
          color="primary"
        >
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        color="orange"
        :to="{ name: 'hardwareEdit', params: { id: $route.params.id } }"
      >
        <v-icon>mdi-pen</v-icon>
      </v-btn>
      <v-btn fab color="error" @click="dialog = true">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>
    <confirmation-dialog
      v-if="dialog"
      @yes="deleteHardware($route.params.id)"
      @no="dialog = false"
      :text="dialogText"
    ></confirmation-dialog>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { HardwareService } from '@/services/HardwareService';
import { HardwareModel } from '@/models/HardwareModel';

@Component
export default class Hardware extends Vue {
  private hardwareService!: HardwareService;

  private beforeCreate() {
    this.hardwareService = new HardwareService();
  }

  private created() {
    this.hardwareService
      .getHardware(this.$route.params.id)
      .then((hardware) => {
        this.$data.hardware = hardware;
        this.$data.loading = false;
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
      return this.$store.getters.user.permissions['RESTApi.add_hardware'];
    } else {
      return false;
    }
  }

  get dialogText() {
    return (
      'Czy na pewno chcesz usunąć sprzęt "' + this.$data.hardware.name + '"?'
    );
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
      hardware: [],
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
      loading: true,
    };
  }
}
</script>