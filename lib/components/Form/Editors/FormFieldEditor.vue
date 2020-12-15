<template>
  <div>
    <whppt-select
      id="type"
      :value="getTypeDisplay"
      :items="fieldTypes"
      label="Field Type"
      item-text="name"
      item-value="value"
      @input="updateValue($event, 'type')"
    >
    </whppt-select>
    <whppt-text-input
      v-if="getTypeDisplay !== 'Captcha'"
      id="name"
      :value="selectedContent.name"
      label="Field Name"
      @input="updateValue($event, 'name')"
    />
    <whppt-text-input id="label" :value="selectedContent.label" label="Label" @input="updateValue($event, 'label')" />
    <whppt-text-input
      v-if="selectedComponent.type !== 'checkbox' || selectedComponent.type !== 'multipleChoice'"
      id="placeholder"
      :value="selectedContent.placeholder"
      label="Placeholder"
      @input="updateValue($event, 'placeholder')"
    />
    <div v-if="getTypeDisplay !== 'Captcha'" class="whppt-checkbox__wrapper">
      <whppt-checkbox
        :id="`${$options._scopeId}-required-checkbox`"
        :value="selectedContent.required"
        label="Required"
        @input="updateBoolean('required')"
      ></whppt-checkbox>
    </div>
    <div class="whppt-checkbox__wrapper">
      <whppt-checkbox
        :id="`${$options._scopeId}-half-width-checkbox`"
        :value="selectedContent.halfWidth"
        label="Half Width"
        @input="updateBoolean('halfWidth')"
      ></whppt-checkbox>
    </div>
    <div v-if="selectedContent.type === 'select' || selectedContent.type === 'multipleChoice'">
      <text-list-editor field="options" label="Select field options" />
    </div>
  </div>
</template>
<script>
import { find } from 'lodash';
import { mapState, mapActions } from 'vuex';

import WhpptTextInput from '@whppt/nuxt/lib/components/ui/Input.vue';
import WhpptSelect from '@whppt/nuxt/lib/components/ui/Select.vue';
import WhpptCheckbox from '@whppt/nuxt/lib/components/ui/Checkbox.vue';
import TextListEditor from './TextListEditor';

const options = JSON.parse(`<%= JSON.stringify(options) %>`);

export default {
  name: 'FormFieldEditor',
  components: { WhpptTextInput, WhpptSelect, WhpptCheckbox, TextListEditor },
  computed: {
    ...mapState('whppt-nuxt/editor', ['selectedComponent', 'baseAPIUrl']),
    fieldTypes() {
      const fieldTypes = [
        { name: 'Text', value: 'text' },
        { name: 'Text Area', value: 'textArea' },
        { name: 'Select', value: 'select' },
        { name: 'Checkbox', value: 'checkbox' },
        { name: 'Email', value: 'email' },
        { name: 'Multiple Choice', value: 'multipleChoice' },
      ];

      if (this.$config.recaptcha_sitekey || options.recaptcha_sitekey)
        fieldTypes.push({ name: 'Captcha', value: 'captcha' });

      return fieldTypes;
    },
    selectedContent() {
      return this.selectedComponent.value;
    },
    getTypeDisplay() {
      const type = find(this.fieldTypes, f => f.value === this.selectedContent.type);
      return (type && type.name) || 'None Selected';
    },
  },
  methods: {
    ...mapActions('whppt-nuxt/editor', ['setSelectedComponentState', 'pushSelectedComponentState']),
    updateBoolean(path, value) {
      this.setSelectedComponentState({
        path,
        value: value || !this.selectedContent[path],
      });
    },
    updateValue(value, path) {
      if (value === 'captcha' && path === 'type') {
        this.updateBoolean('required', true);
        this.setSelectedComponentState({ value: 'recaptcha', path: 'name' });
      }

      if (path === 'type' && value !== 'captcha') {
        this.setSelectedComponentState({ value: '', path: 'name' });
      }

      this.setSelectedComponentState({ value, path });
    },
  },
};
</script>

<style lang="scss" scoped>
.whppt-checkbox__wrapper {
  margin-top: 1rem;
}
</style>
