<template>
  <div v-form-field="field" v-whppt-editor-enabled="!disableEditing" class="whppt-form-text">
    <field-label :field="field" :show-error="showError"></field-label>
    <input
      v-whppt-text="field"
      v-whppt-editor-enabled="!disableEditing"
      :value="value"
      data-property="placeholder"
      :placeholder="field.placeholder"
      @input="$emit('field-updated', { name: field.name, value: $event.target.value })"
    />
  </div>
</template>

<script>
import FieldLabel from './FieldLabel';
export default {
  name: 'FormTextField',
  components: { FieldLabel },
  props: {
    field: { type: Object, default: () => ({}) },
    value: { type: String, default: '' },
    showError: { type: Boolean, default: false },
    disableEditing: { type: Boolean, default: false },
  },
};
</script>
