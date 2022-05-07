<template>
  <div class="whppt-form-phone">
    <field-label :field="field" :validations="validations" />
    <input
      v-mask="'#### ### ###'"
      :value="value"
      :placeholder="field.placeholder"
      @input="$emit('field-updated', { name: field.name, value: $event.target.value })"
    />
  </div>
</template>

<script>
import FieldLabel from '@whppt/form-builder/lib/components/Form/Fields/FieldLabel';

export default {
  name: 'FormPhoneField',
  components: { FieldLabel },
  props: {
    field: { type: Object, default: () => ({}) },
    validations: { type: Object, default: () => ({}) },
    value: { type: String, default: '' },
  },
};
</script>
