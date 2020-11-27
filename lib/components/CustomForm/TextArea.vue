<template>
  <div>
    <div v-form-field="field" class="mb-8">
      <field-label :field="field" :show-error="showError"></field-label>
      <textarea
        v-model="value"
        v-whppt-text="field"
        data-property="placeholder"
        :placeholder="field.placeholder"
        rows="5"
        class="w-full py-4 font-medium text-lg px-4"
        @input="$emit('field-updated', { name: field.name, value })"
      />
    </div>
  </div>
</template>

<script>
import FieldLabel from './FieldLabel';
export default {
  name: 'FormTextArea',
  components: { FieldLabel },
  props: { field: { type: Object, default: () => ({}) }, showError: { type: Boolean, default: false } },
  data: () => ({
    value: '',
  }),
};
</script>
