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
    <whppt-text-input id="name" :value="selectedContent.name" label="Field Name" @input="updateValue($event, 'name')" />
    <whppt-text-input id="label" :value="selectedContent.label" label="Label" @input="updateValue($event, 'label')" />
    <whppt-text-input
      v-if="selectedComponent.type !== 'checkbox' && selectedComponent.type !== 'multipleChoice'"
      id="placeholder"
      :value="selectedContent.placeholder"
      label="Placeholder"
      @input="updateValue($event, 'placeholder')"
    />
    <div
      v-if="selectedContent.type !== 'multipleChoice'"
      class="mt-4 flex items-center"
      @click="updateBoolean('required')"
    >
      <div class="border border-white p-2 flex">
        <icon v-if="selectedContent.required" icon="Check" class="w-4 h-4" />
        <div v-else class="w-4 h-4" />
      </div>
      <div class="pl-4">Required</div>
    </div>
    <div
      v-if="selectedContent.type !== 'checkbox' && selectedComponent.type !== 'multipleChoice'"
      class="mt-4 flex items-center"
      @click="updateBoolean('halfWidth')"
    >
      <div class="border border-white p-2 flex">
        <icon v-if="selectedContent.halfWidth" icon="Check" class="w-4 h-4" />
        <div v-else class="w-4 h-4" />
      </div>
      <div class="pl-4">Half-Width</div>
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
import TextListEditor from './TextListEditor';

export default {
  name: 'FormFieldEditor',
  components: { WhpptTextInput, WhpptSelect, TextListEditor },
  data() {
    return {
      fieldTypes: [
        { name: 'Text', value: 'text' },
        { name: 'Text Area', value: 'textArea' },
        { name: 'Select', value: 'select' },
        { name: 'Checkbox', value: 'checkbox' },
        { name: 'Email', value: 'email' },
        { name: 'Multiple Choice', value: 'multipleChoice' },
      ],
    };
  },
  computed: {
    ...mapState('whppt-nuxt/editor', ['selectedComponent', 'baseAPIUrl']),
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
    updateBoolean(path) {
      this.setSelectedComponentState({
        path,
        value: !this.selectedContent[path],
      });
    },
    updateValue(value, path) {
      this.setSelectedComponentState({ value, path });
    },
  },
};
</script>
