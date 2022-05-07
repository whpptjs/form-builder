<template>
  <div>
    <div v-form-field="field" v-whppt-editor-enabled="!disableEditing" class="whppt-form-multiple-choice">
      <field-label :field="field" :validations="validations"></field-label>
      <div class="whppt-form-multiple-choice__options">
        <div v-for="(option, index) in field.options" :key="index" class="whppt-form-multiple-choice__option">
          <input :id="`option-${option}`" :checked="isChecked(option)" type="checkbox" @change="check(option)" />
          <label :for="`option-${option}`">{{ option }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { trim } from 'lodash';
import FieldLabel from './FieldLabel';

export default {
  name: 'FormMultipleChoiceField',
  components: { FieldLabel },
  props: {
    field: { type: Object, default: () => ({}) },
    validations: { type: Object, default: () => ({}) },
    value: { type: String, default: '' },
    disableEditing: { type: Boolean, default: false },
  },
  methods: {
    check(option) {
      const selectedValues = this.value.split(';;');

      if (!this.isChecked(option)) {
        selectedValues.push(option);
        this.$emit('field-updated', { name: this.field.name, value: trim(selectedValues.join(';;'), ';;') });
      } else {
        const newValues = selectedValues.filter(v => v !== option);
        this.$emit('field-updated', { name: this.field.name, value: trim(newValues.join(';;'), ';;') });
      }
    },
    isChecked(option) {
      const selectedValues = this.value.split(';;');
      return !!selectedValues.find(v => v === option);
    },
  },
};
</script>
