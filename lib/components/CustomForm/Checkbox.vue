<template>
  <div>
    <div v-form-field="field" class="mb-8">
      <field-label :field="field" :show-error="showError"></field-label>
      <button class="border border-white p-2 bg-white flex" @click="check">
        <icon v-if="value" icon="Check" class="w-4 h-4" :style="{ color: theme.secondary }" />
        <div v-else class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import FieldLabel from './FieldLabel';

export default {
  name: 'FormCheckbox',
  components: { FieldLabel },
  props: { field: { type: Object, default: () => ({}) }, showError: { type: Boolean, default: false } },
  data: () => ({
    value: false,
  }),
  computed: {
    ...mapGetters(['theme']),
  },
  methods: {
    check() {
      if (!this.value) this.value = true;
      else this.value = false;
      this.$emit('field-updated', { name: this.field.name, value: this.value });
    },
  },
};
</script>
