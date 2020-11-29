<template>
  <div>
    <div v-form-field="field" class="whppt-form-select">
      <field-label :field="field" :show-error="showError"></field-label>
      <select
        v-model="value"
        @change="$emit('field-updated', { name: field.name, value })"
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

<style>
.whppt-form-select {
  margin-bottom: 2rem;
}

.whppt-form-select select {
  width: 100%;
  padding: 1rem;
  font-size: 1.125rem;
  font-weight: 500;
}
</style>
