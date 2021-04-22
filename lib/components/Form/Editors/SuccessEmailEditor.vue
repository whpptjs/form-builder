<template>
  <div>
    <div v-if="!requiredFields.length" class="no-fields-message">This form has no required fields</div>
    <div class="label">Required Form Fields</div>
    <table class="form-fields__table">
      <tbody>
        <tr v-for="(field, idx) in requiredFields" :key="idx">
          <td class="item">
            <div style="margin-right: 1rem">
              {{ `${field.name}` }}
            </div>
            <whppt-checkbox
              v-if="field.type === 'email'"
              :value="selectedContent.submitterEmailField === field.name"
              label="Send confirmation email here"
              @change="selectedSubmitterEmailField(field.name)"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="!selectedContent.submitterEmailField" style="margin-top: 0.5rem">To be able to edit the success email message you need to add a email textbox on the form. </div>
    <div v-if="selectedContent.submitterEmailField" style="margin-top: 0.5rem">
      <whppt-text-input
        id="success-subject"
        :value="selectedContent.successEmailSubject"
        label="Success Email Subject"
        @input="updateValue($event, 'successEmailSubject')"
      />
      <div class="label" style="margin-top: 1rem">Confirmation Email Text</div>
      <whppt-rich-text
        id="success-text"
        :value="selectedContent.successEmailText"
        hide-headers
        :class="{ error: hasError }"
        @input="updateValue($event, 'successEmailText')"
      />
      <div class="success-text-info">
        To utilise form fields in the confirmation email text, surround the field name with '${ }'. If done correctly,
        the '${ }' will dissappear from the preview. E.g. 'Hi ${name}...' will become 'Hi name...'
      </div>
      <div class="label" style="margin: 1rem 0">Preview</div>
      <div class="success-text richText" :class="hasError ? 'error-text' : 'success-text'" v-html="preview" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { filter, camelCase, map, forEach } from 'lodash';

// eslint-disable-next-line
import WhpptRichText from '@whppt/nuxt/lib/components/ui/components/RichText/index.vue';
// eslint-disable-next-line
import WhpptTextInput from '@whppt/nuxt/lib/components/ui/components/Input.vue';
// eslint-disable-next-line
import WhpptCheckbox from '@whppt/nuxt/lib/components/ui/components/Checkbox.vue';

export default {
  name: 'CustomFormEditorSuccessEmail',
  components: { WhpptRichText, WhpptTextInput, WhpptCheckbox },
  data: () => ({ error: false, preview: '' }),
  computed: {
    ...mapState('whppt/editor', ['selectedComponent', 'baseAPIUrl']),
    selectedContent() {
      return this.selectedComponent.value;
    },
    requiredFields() {
      const filteredFields = filter(this.selectedContent.fields, field => field.required);
      return map(filteredFields, field => ({ ...field, name: camelCase(field.name) }));
    },
    hasError() {
      return this.preview.match(/error/i);
    },
  },
  watch: {
    'selectedContent.successEmailText'() {
      this.getPreview();
    },
  },
  mounted() {
    if (this.selectedContent.successEmailText) this.getPreview();
  },
  methods: {
    ...mapActions('whppt/editor', ['setSelectedComponentState', 'pushSelectedComponentState']),
    updateValue(value, path) {
      this.setSelectedComponentState({ value, path });
    },
    selectedSubmitterEmailField(fieldName) {
      if (this.selectedContent.submitterEmailField === fieldName) this.updateValue('', 'submitterEmailField');
      else this.updateValue(fieldName, 'submitterEmailField');
    },
    getPreview() {
      const formValues = {};
      forEach(this.requiredFields, field => (formValues[field.name] = field.name));

      return this.$axios
        .$post(`/api/forms/getSuccessEmailPreview`, {
          text: this.selectedContent.successEmailText,
          values: formValues,
        })
        .then(preview => {
          this.preview = preview;
        });
    },
  },
};
</script>

<style lang="scss">
$gray-200: #edf2f7;
$gray-500: #a0aec0;
$gray-600: #718096;
$gray-700: #4a5568;

.form-fields__table {
  border: 1px solid white;
  width: 100%;
  tbody {
    tr {
      display: flex;
      align-items: center;
      width: 100%;
      border-bottom: 1px solid $gray-500;
      padding: 0.5rem;
    }

    tr:nth-child(even) {
      background-color: $gray-700;
    }

    td.item {
      display: flex;
      align-items: center;
    }
  }
}

.label {
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.025em;
  font-size: 0.75rem;
}

.form-property {
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.no-fields-message {
  font-style: italic;
}

.success-text {
  padding: 0.5rem;
  border: 1px solid $gray-200;
  border-radius: 0.25rem;
}

.error-text {
  padding: 0.5rem;
  border: 1px solid #eb5958;
  color: #eb5958;
  border-radius: 0.25rem;
}

.success-text-info {
  font-style: italic;
  font-size: 0.9rem;
}

.error .whppt-rich-content {
  .ProseMirror {
    border: 1px solid #eb5958;
  }
  .ProseMirror:focus {
    border: 1px solid #eb5958;
  }
}
</style>
