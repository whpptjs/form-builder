<template>
  <div>
    <div v-form-field="field" v-whppt-editor-enabled="!disableEditing" class="whppt-form-checkbox">
      <field-label :field="field" :show-error="showError"></field-label>
      <input :id="field" type="checkbox" :checked="value" @change="check" />
    </div>
  </div>
</template>

<script>
import FieldLabel from './FieldLabel';

export default {
  name: 'FormCheckbox',
  components: { FieldLabel },
  props: {
    field: { type: Object, default: () => ({}) },
    showError: { type: Boolean, default: false },
    value: { type: Boolean, default: false },
    disableEditing: { type: Boolean, default: false },
  },
  methods: {
    check() {
      this.$emit('field-updated', { name: this.field.name, value: !this.value });
    },
  },
};
</script>
