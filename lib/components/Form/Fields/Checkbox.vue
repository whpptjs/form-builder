<template>
  <div>
    <div v-form-field="field" v-whppt-editor-enabled="!disableEditing" class="whppt-form-checkbox">
      <input :id="field.name" type="checkbox" :checked="value" @change="check" />
      <field-label :field="field" :validations="validations" :id="field.name"></field-label>
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
    validations: { type: Object, default: () => ({}) },
    value: { type: Boolean, default: false },
    disableEditing: { type: Boolean, default: false },
  },
  computed: {
    label() {
      const postfix = this.required ? '*' : '';
      const label = this.field.label || 'Field label';
      return `${label}${postfix}`;
    },
  },
  methods: {
    check() {
      this.$emit('field-updated', { name: this.field.name, value: !this.value });
    },
  },
};
</script>
