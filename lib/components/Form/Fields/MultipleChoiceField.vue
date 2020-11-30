<template>
  <div>
    <div v-form-field="field" class="whppt-form-multiple-choice">
      <field-label :field="field" :show-error="showError"></field-label>
      <div v-for="(option, index) in field.options" :key="index" class="mb-4">
        <button class="flex items-center" @click="check(option)">
          <div class="border border-white p-2 bg-white flex">
            <icon v-if="values[option]" icon="Check" class="w-4 h-4" />
            <div v-else class="w-4 h-4" />
          </div>
          <div class="ml-4">{{ option }}</div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { forEach } from 'lodash';
import FieldLabel from './FieldLabel';

// TODO: Replace tailwind classes
// TODO: Figure out icon

export default {
  name: 'FormMultipleChoiceField',
  components: { FieldLabel },
  props: { field: { type: Object, default: () => ({}) }, showError: { type: Boolean, default: false } },
  data: () => ({
    values: {},
  }),
  methods: {
    check(option) {
      if (!this.values[option]) this.$set(this.values, option, true);
      else this.$set(this.values, option, false);
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
.whppt-form-multiple-choice {
  margin-bottom: 2rem;
}

/* .whppt-form-multiple-choice input {
  width: 100%;
  padding: 1rem;
  font-size: 1.125rem;
  font-weight: 500;
} */
</style>
