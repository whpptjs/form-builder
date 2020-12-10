<template>
  <div class="whppt-form-label">
    <div v-if="label || inEditor" class="whppt-form-label-text">
      {{ label || `Field Label${field.required ? '*' : ''}` }}
    </div>
    <div v-else class="whppt-form-label-text"></div>
    <span v-if="showError" class="whppt-form-label-error">
      {{ errorMessage || 'This field is required' }}
    </span>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'FieldLabel',
  props: {
    field: { type: Object, default: () => ({}) },
    showError: { type: Boolean, default: false },
    errorMessage: { type: String, default: '' },
  },
  computed: {
    ...mapState('whppt-nuxt/editor', ['activeMenuItem']),
    inEditor() {
      return this.activeMenuItem === 'select';
    },
    label() {
      let label = this.field.label;

      if (this.field.required && this.field.label) label = label + '*';

      return label;
    },
  },
};
</script>

<style>
:root {
  --text-opacity: 1;
}

.whppt-form-label {
  display: flex;
  justify-content: space-between;
}

.whppt-form-label-text {
  color: #718096;
  color: rgba(113, 128, 150, var(--text-opacity));
  margin-bottom: 1rem;
  font-weight: 300;
}

.whppt-form-label-error {
  color: #f56565;
  color: rgba(245, 101, 101, var(--text-opacity));
  text-align: right;
  font-size: 0.65rem;
}
</style>
