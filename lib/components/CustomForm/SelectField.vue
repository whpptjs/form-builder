<template>
  <div>
    <div v-form-field="field" class="mb-8">
      <field-label :field="field" :show-error="showError"></field-label>
      <select
        v-model="value"
        class="w-full py-4 font-medium text-lg px-4"
        @change="$emit('fieldUpdated', { name: field.name, value })"
      >
        <option v-if="field.placeholder" value="" disabled selected>
          {{ field.placeholder }}
        </option>
        <option v-for="(option, index) in field.options" :key="index" :value="option">
          {{ option || 'Option Text' }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import FieldLabel from './FieldLabel';

export default {
  name: 'FormTextField',
  components: { FieldLabel },
  props: { field: { type: Object, default: () => ({}) }, showError: { type: Boolean, default: false } },
  data: () => ({
    value: '',
  }),
  mounted() {
    if (!this.field.placeholder && this.field.options[0]) this.value = this.field.options[0];
  },
};
</script>
