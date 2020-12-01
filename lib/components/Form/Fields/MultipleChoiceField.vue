<template>
  <div>
    <div v-form-field="field" class="whppt-form-multiple-choice">
      <field-label :field="field" :show-error="showError"></field-label>
      <div v-for="(option, index) in field.options" :key="index" class="whppt-form-multiple-choice__option">
        <input :id="`option-${option}`" :checked="values[option]" type="checkbox" @change="check(option)" />
        <label :for="`option-${option}`">{{ option }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import { forEach } from 'lodash';
import FieldLabel from './FieldLabel';

export default {
  name: 'FormMultipleChoiceField',
  components: { FieldLabel },
  props: { field: { type: Object, default: () => ({}) }, showError: { type: Boolean, default: false } },
  data: () => ({
    values: {},
  }),
  methods: {
    check(option) {
      !this.values[option] ? this.$set(this.values, option, true) : this.$set(this.values, option, false);

      const emailValues = [];

      forEach(this.values, (value, key) => {
        if (value) emailValues.push(key);
      });

      this.$emit('field-updated', { name: this.field.name, value: emailValues.join(', ') || 'None selected' });
    },
  },
};
</script>

<style>
.whppt-form-multiple-choice,
.whppt-form-multiple-choice__option {
  margin-bottom: 0.75rem;
}
</style>
