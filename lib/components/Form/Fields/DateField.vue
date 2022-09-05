<template>
  <div class="whppt-form-phone">
    <field-label :field="field" :validations="validations" :id="field.name" />
    <client-only>
      <v-date-picker
        v-if="browser.name !== 'ie'"
        :value="value"
        v-bind="$attrs"
        :update-on-input="true"
        :popover="{ visibility: 'click' }"
        class="date-field"
        @input="updateDate"
        :id="field.name"
      />
      <input
        v-else
        v-mask="'##/##/####'"
        :id="field.name"
        :value="value"
        :placeholder="field.placeholder"
        @input="$emit('field-updated', { name: field.name, value: $event.target.value })"
      />
    </client-only>
  </div>
</template>

<script>
import { detect } from 'detect-browser';

import FieldLabel from '@whppt/form-builder/lib/components/Form/Fields/FieldLabel';
let VDatePicker;

if (process.client) VDatePicker = require('v-calendar/lib/components/date-picker.umd');

export default {
  name: 'FormDateField',
  components: { FieldLabel, VDatePicker },
  props: {
    field: { type: Object, default: () => ({}) },
    value: { default: undefined },
    validations: { type: Object, default: () => ({}) },
  },
  data: () => ({
    browser: '',
  }),
  mounted() {
    this.browser = detect();
  },
  methods: {
    updateDate(newDate) {
      this.$emit('field-updated', { name: this.field.name, value: this.$localToUTC(newDate) });
    },
  },
};
</script>

<style lang="postcss">
.date-field > input {
  @apply shadow-none border-none;
}
</style>
