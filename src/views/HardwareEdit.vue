<template>
  <div>
    <p
      class="text-h4 text-center font-weight-bold justify-center ma-2"
      style="word-break: break-word"
    >
      {{
        add
          ? 'Nowy sprzęt'
          : 'Edycja sprzętu o numerze seryjnym ' + this.hardware.serial_number
      }}
    </p>
    <hardware-editor
      :hardware="hardware"
      @hardwareEdited="hardware = $event"
      :status="{ name: hardware.status }"
      @statusEdited="change($event)"
      @validation="inputValidated = $event"
    ></hardware-editor>
    <editor-menu
      @saveChanges="addHardware"
      @discardChanges="returnFromEditor"
      text="Czy na pewno chcesz opuścić ekran dodawania nowego sprzętu bez zapisywania zmian?"
      saveText="Dodaj sprzęt"
      discardText="Odrzuć sprzęt"
      v-if="add"
    />
    <editor-menu
      @saveChanges="editHardware"
      @discardChanges="returnFromEditor"
      text="Czy na pewno chcesz wyjść z edycji sprzętu bez zapisywania zmian?"
      v-else
    />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { HardwareService } from '@/services/HardwareService';
import { HardwareModel } from '@/models/HardwareModel';
import { SectionsService } from '@/services/SectionsService';
import hardwareEditor from '@/components/HardwareEditor.vue';

@Component({
  components: { hardwareEditor },
})
export default class HardwareEdit extends Vue {
  private hardwareService!: HardwareService;
  private hardwareModel!: HardwareModel;

  private created() {
    this.hardwareService = new HardwareService();
    this.$data.hardware = new HardwareModel();

    if (this.$route.path.includes('add')) {
      this.$data.add = true;
    } else {
      this.hardwareService
        .getHardware(this.$route.params.id)
        .then((res) => {
          this.$data.hardware = res;
          this.$data.status = res.status;
        })
        .catch((err) => {
          this.$router.replace({ name: 'error404' });
        });
    }
  }
  private addHardware() {
    if (this.$data.inputValidated) {
      this.hardwareService
        .addHardware({
          name: this.$data.hardware.name,
          description: this.$data.hardware.description,
          status: this.$data.status,
          serial_number: this.$data.hardware.serial_number,
        })
        .then((res: any) => {
          if (res.status === 201) {
            this.$store.dispatch('successMessage', 'Sprzęt został dodany');
            this.$router.replace({
              name: 'hardware',
              params: { id: res.data.id },
            });
          }
        })
        .catch(() => {
          this.$store.dispatch(
            'errorMessage',
            'Błąd poczas zapisywania sprzętu!',
          );
        });
    } else {
      this.$store.dispatch(
        'warningMessage',
        'Formularz nie zostal poprawnie wypełniony!',
      );
    }
  }

  private editHardware() {
    if (this.$data.inputValidated) {
      this.hardwareService
        .editHardware(this.$data.hardware.id, {
          name: this.$data.hardware.name,
          description: this.$data.hardware.description,
          status: this.$data.status,
          serial_number: this.$data.hardware.serial_number,
        })
        .then((res: any) => {
          if (res.status === 200) {
            this.$store.dispatch(
              'successMessage',
              'Sprzęt został zaktualizowany',
            );
            this.returnFromEditor();
          }
        })
        .catch(() => {
          this.$store.dispatch('errorMessage', 'Błąd poczas edycji sprzętu!');
        });
    } else {
      this.$store.dispatch(
        'warningMessage',
        'Formularz nie został poprawnie wypełniony!',
      );
    }
  }

  private returnFromEditor() {
    if (this.$data.add) {
      this.$router.replace({ name: 'hardwareList', params: { page: '1' } });
    } else {
      this.$router.replace({
        name: 'hardware',
        params: { id: this.$data.hardware.id },
      });
    }
  }

  private change(e: any) {
    this.$data.status = e;
  }

  private data() {
    return {
      inputValidated: false,
      hardware: { description: '' },
      status: '',
      add: false,
    };
  }
}
</script>
