<template>
  <div v-form-field="field" class="whppt-form-text">
    <field-label :field="field" :show-error="showError"></field-label>
    <input
      v-model="value"
      v-whppt-text="field"
      data-property="placeholder"
      :placeholder="field.placeholder"
      @input="$emit('field-updated', { name: field.name, value })"
    />
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
};
</script>
