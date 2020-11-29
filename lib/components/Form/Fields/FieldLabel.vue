<template>
  <div class="whppt-form-label">
    <div class="whppt-form-label-text">
      {{ label }}
    </div>
    <span v-if="showError" class="whppt-form-label-error">
      {{ errorMessage || 'This field is required' }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'FieldLabel',
  props: {
    field: { type: Object, default: () => ({}) },
    showError: { type: Boolean, default: false },
    errorMessage: { type: String, default: '' },
  },
  computed: {
    label() {
      let label = this.field.label || 'Field Label';
      if (this.field.required) label = label + '*';
      return label;
    },
  },
};
</script>

<style>
.whppt-form-label {
  display: flex;
  justify-content: space-between;
}

.whppt-form-label-text {
  --text-opacity: 1;
  color: #718096;
  color: rgba(113, 128, 150, var(--text-opacity));
  margin-bottom: 1rem;
  font-weight: 300;
}

.whppt-form-label-error {
  --text-opacity: 1;
  color: #f56565;
  color: rgba(245, 101, 101, var(--text-opacity));
  text-align: right;
  font-size: 0.65rem;
}
</style>
