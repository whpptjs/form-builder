<template>
  <div v-form-field="field" v-whppt-editor-enabled="!disableEditing" class="whppt-form-textarea">
    <field-label :field="field" :show-error="showError"></field-label>
    <textarea
      v-whppt-text="field"
      v-whppt-editor-enabled="!disableEditing"
      :value="value"
      data-property="placeholder"
      :placeholder="field.placeholder"
      rows="5"
      @input="$emit('field-updated', { name: field.name, value: $event.target.value })"
    />
  </div>
</template>

<script>
import FieldLabel from './FieldLabel';

export default {
  name: 'FormTextArea',
  components: { FieldLabel },
  props: {
    field: { type: Object, default: () => ({}) },
    value: { type: String, default: '' },
    showError: { type: Boolean, default: false },
    disableEditing: { type: Boolean, default: false },
  },
};
</script>
