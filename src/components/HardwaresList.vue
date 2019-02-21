<template>
  <div>
    <div v-for='hardware in hardwares' :key='hardware.name' style='border: 1px solid gray'>
        <p>
            {{ hardware.name }}
        </p>
        <p>
            {{ hardware.description }}
        </p>
        <p>
            {{ hardware.serial_number }}
        </p>
        <div v-if='hardware.is_rented == true'>
          <p>
              Wypożyczony
          </p>
        </div>
        <div v-else>
          <p>
              Niewypożyczony
          </p>
        </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { HardwareModel } from '@/models/HardwareModel';
@Component
export default class HardwaresList extends Vue {
  @Prop() public hardwares!: HardwareModel[];
}
</script> 