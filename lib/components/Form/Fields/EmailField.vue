<template>
  <div>
    <div v-form-field="field" v-whppt-editor-enabled="!disableEditing" class="whppt-form-email">
      <field-label :field="field" :id="field.name" :fieldErrorMessage="validationError"></field-label>
      <input
        v-whppt-text="field"
        v-whppt-editor-enabled="!disableEditing"
        :id="field.name"
        :value="value"
        data-property="placeholder"
        :placeholder="field.placeholder"
        @input="$emit('field-updated', { name: field.name, value: $event.target.value })"
      />
    </div>
  </div>
</template>

<script>
import FieldLabel from './FieldLabel';

export default {
  name: 'EmailField',
  components: { FieldLabel },
  props: {
    field: { type: Object, default: () => ({}) },
    validations: { type: Object, default: () => ({}) },
    value: { type: String, default: '' },
    disableEditing: { type: Boolean, default: false },
  },
  computed: {
    validationError() {
      if (!(this.field.required && this.validations.$dirty)) return '';
      if (!this.validations.required) return 'This field is required';
      if (!this.validations.email) return 'A valid email address is required';
      return '';
    },
  },
};
</script>
