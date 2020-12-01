<template>
  <div>
    <div v-form-field="field" class="whppt-form-checkbox">
      <field-label :field="field" :show-error="showError"></field-label>
      <input :id="field" type="checkbox" :checked="value" @change="check" />
    </div>
  </div>
</template>

<script>
import FieldLabel from './FieldLabel';

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
</style>
