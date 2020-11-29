<template>
  <div>
    <div class="flex justify-between">
      <div class="text-gray-600 font-light mb-4">
        {{ label }}
      </div>
      <span v-if="showError" class="text-xs text-red-500 text-right">
        {{ errorMessage || 'This field is required' }}
      </span>
    </div>
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
