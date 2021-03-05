<template>
  <div>
    <div v-form-field="field" v-whppt-editor-enabled="!disableEditing" class="whppt-form-email">
      <field-label
        :field="field"
        :show-error="showError"
        error-message="A valid email address is required"
      ></field-label>
      <input
        v-whppt-text="field"
        v-whppt-editor-enabled="!disableEditing"
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
    value: { type: String, default: '' },
    showError: { type: Boolean, default: false },
    disableEditing: { type: Boolean, default: false },
  },
};
</script>
