<template>
  <div>
    <div v-form-field="field" class="mb-8">
      <field-label :field="field" :show-error="showError"></field-label>
      <input
        v-model="value"
        v-whppt-text="field"
        data-property="placeholder"
        :placeholder="field.placeholder"
        class="w-full py-4 font-medium px-4 text-lg"
        @input="$emit('fieldUpdated', { name: field.name, value })"
      />
    </div>
  </div>
</template>

<script>
import FieldLabel from './FieldLabel';
export default {
  name: 'FormTextField',
  components: { FieldLabel },
  props: { field: { type: Object, default: () => ({}) }, showError: { type: Boolean, default: false } },
  data: () => ({
    value: '',
  }),
};
</script>
