<template>
  <div>
    <div v-form-field="field" class="whppt-form-checkbox">
      <field-label :field="field" :show-error="showError"></field-label>
      <button class="border border-white p-2 bg-white flex" @click="check">
        <icon v-if="value" icon="Check" class="w-4 h-4" />
        <div v-else class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script>
import FieldLabel from './FieldLabel';

// TODO: Replace tailwind classes
// TODO: Figure out icon

export default {
  name: 'FormCheckbox',
  components: { FieldLabel },
  props: { field: { type: Object, default: () => ({}) }, showError: { type: Boolean, default: false } },
  data: () => ({
    value: false,
  }),
  methods: {
    check() {
      this.value = !this.value;
      this.$emit('field-updated', { name: this.field.name, value: this.value });
    },
  },
};
</script>

<style>
.whppt-form-checkbox {
  margin-bottom: 2rem;
}

/* .whppt-form-checkbox input {
  width: 100%;
  padding: 1rem;
  font-size: 1.125rem;
  font-weight: 500;
} */
</style>
