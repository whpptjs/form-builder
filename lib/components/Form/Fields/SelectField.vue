<template>
  <div>
    <div v-form-field="field" v-whppt-editor-enabled="!disableEditing" class="whppt-form-select">
      <field-label :field="field" :validations="validations"></field-label>
      <select :value="value" @change="$emit('field-updated', { name: field.name, value: $event.target.value })">
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
  name: 'FormSelectField',
  components: { FieldLabel },
  props: {
    field: { type: Object, default: () => ({}) },
    value: { type: String, default: '' },
    validations: { type: Object, default: () => ({}) },
    disableEditing: { type: Boolean, default: false },
  },
  mounted() {
    if (this.field.name && !this.field.placeholder && this.field.options[0] && !this.value) {
      this.$emit('field-updated', { name: this.field.name, value: this.field.options[0] });
    }
  },
};
</script>
