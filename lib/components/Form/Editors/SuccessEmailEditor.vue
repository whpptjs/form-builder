<template>
  <div>
    <div style="margin: 1rem 0">
      <whppt-checkbox
        :value="selectedContent.sendSuccessEmail"
        label="Send success email"
        @change="updateValue($event, 'sendSuccessEmail')"
      />
    </div>
    <div v-if="selectedContent.sendSuccessEmail">
      <div class="label" style="margin-top: 1rem">Form properties</div>
      <div v-if="!requiredFields.length" class="no-fields-message">This form has no required fields</div>
      <div v-for="(field, idx) in requiredFields" :key="idx" class="form-property">
        <div>{{ field.name }}</div>
        <whppt-checkbox
          v-if="field.type === 'email'"
          :value="selectedContent.submitterEmailField === field.name"
          label="Send success email here"
          @change="selectedSubmitterEmailField(field.name)"
        />
      </div>
      <div v-if="selectedContent.submitterEmailField" style="margin-top: 0.5rem">
        <whppt-text-input
          id="success-subject"
          :value="selectedContent.successEmailSubject"
          label="Success Email Subject"
          @input="updateValue($event, 'successEmailSubject')"
        />
        <whppt-text-area
          id="success-text"
          :value="selectedContent.successEmailText"
          rows="8"
          label="Success Email Text"
          @input="updateValue($event, 'successEmailText')"
        />
      </div>

      <div class="label" style="margin: 1rem 0">Preview</div>
      <div>{{ preview }}</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { filter, camelCase, map, forEach, template } from 'lodash';

import WhpptTextArea from '@whppt/nuxt/lib/components/ui/Textarea.vue';
import WhpptTextInput from '@whppt/nuxt/lib/components/ui/Input.vue';
import WhpptCheckbox from '@whppt/nuxt/lib/components/ui/Checkbox.vue';

export default {
  name: 'CustomFormEditorSuccessEmail',
  components: { WhpptTextArea, WhpptTextInput, WhpptCheckbox },
  computed: {
    ...mapState('whppt-nuxt/editor', ['selectedComponent', 'baseAPIUrl']),
    selectedContent() {
      return this.selectedComponent.value;
    },
    requiredFields() {
      return map(
        filter(this.selectedContent.fields, field => field.required),
        field => ({ ...field, name: camelCase(field.name) })
      );
    },
    preview() {
      const formValues = {};
      forEach(this.requiredFields, field => (formValues[field.name] = field.name));

      const preview = template(this.selectedContent.successEmailText);
      return preview(formValues);
    },
  },

  methods: {
    ...mapActions('whppt-nuxt/editor', ['setSelectedComponentState', 'pushSelectedComponentState']),
    updateValue(value, path) {
      this.setSelectedComponentState({ value, path });
    },
    selectedSubmitterEmailField(fieldName) {
      if (this.selectedContent.submitterEmailField === fieldName) this.updateValue('', 'submitterEmailField');
      else this.updateValue(fieldName, 'submitterEmailField');
    },
  },
};
</script>

<style scoped>
.label {
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.025em;
  font-size: 0.75rem;
}

.form-property {
  border-bottom: 1px solid gray;
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.no-fields-message {
  font-style: italic;
}
</style>
