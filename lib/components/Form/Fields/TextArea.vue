<template>
  <div v-form-field="field" v-whppt-editor-enabled="!disableEditing" class="whppt-form-textarea">
    <field-label :field="field" :validations="validations" :id="field.name"></field-label>
    <textarea
      v-whppt-text="field"
      v-whppt-editor-enabled="!disableEditing"
      :id="field.name"
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
    validations: { type: Object, default: () => ({}) },
    disableEditing: { type: Boolean, default: false },
  },
};
</script>
