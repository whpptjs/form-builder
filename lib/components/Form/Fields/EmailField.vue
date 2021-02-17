<template>
  <div>
    <div v-form-field="field" class="whppt-form-email">
      <field-label
        :field="field"
        :show-error="showError"
        error-message="A valid email address is required"
      ></field-label>
      <input
        v-model="value"
        v-whppt-text="field"
        data-property="placeholder"
        :placeholder="field.placeholder"
        @input="$emit('field-updated', { name: field.name, value })"
      />
    </div>
  </div>
</template>

<script>
import FieldLabel from './FieldLabel';

export default {
  name: 'EmailField',
  components: { FieldLabel },
  props: { field: { type: Object, default: () => ({}) }, showError: { type: Boolean, default: false } },
  data: () => ({
    value: '',
  }),
};
</script>
