<template>
  <div>
    <whppt-text-input
      :id="`${$options._scopeId}-whppt-identifier`"
      :value="selectedContent.identifier"
      label="Identifier"
      @input="updateValue($event, 'identifier')"
    />
    <whppt-text-input
      id="recipient"
      :value="selectedContent.recipient"
      label="Recipient"
      @input="updateValue($event, 'recipient')"
    />
    <whppt-text-input
      id="subject"
      :value="selectedContent.subject"
      label="Email Subject"
      @input="updateValue($event, 'subject')"
    />
    <whppt-field class="whppt-form-config__track">
      <whppt-checkbox
        label="Track In Google Analytics"
        :value="selectedContent.trackInGA"
        @input="updateValue($event, 'trackInGA')"
      />
    </whppt-field>
    <div class="w-full mt-4">
      <whppt-button class="w-full" @click="addNewCC"><add /> Add New CC'd Email Address</whppt-button>
    </div>
    <div class="whppt-label my-2">CC'd Email Addresses</div>
    <div v-for="(item, index) in selectedContent.ccs" :key="index" class="mb-2">
      <div class="flex justify-between items-center">
        <whppt-text-input id="subject" :value="item" @input="updateCC($event, index)" />
        <div class="ml-1">
          <whppt-button danger @click="removeItem(item)"><trash /></whppt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { without } from 'lodash';
import { mapState, mapActions } from 'vuex';
import WhpptTextInput from '@whppt/nuxt/lib/components/ui/components/Input.vue';
import WhpptButton from '@whppt/nuxt/lib/components/ui/components/Button.vue';
import WhpptCheckbox from '@whppt/nuxt/lib/components/ui/components/Checkbox.vue';
import WhpptField from '@whppt/nuxt/lib/components/ui/components/Field.vue';
import Add from '@whppt/nuxt/lib/components/icons/Add';
import Trash from '@whppt/nuxt/lib/components/icons/Trash';

export default {
  name: 'CustomFormEditor',
  components: { WhpptTextInput, WhpptButton, WhpptCheckbox, WhpptField, Add, Trash },
  computed: {
    ...mapState('whppt/editor', ['selectedComponent', 'baseAPIUrl']),
    selectedContent() {
      return this.selectedComponent.value;
    },
  },
  methods: {
    ...mapActions('whppt/editor', ['setSelectedComponentState', 'pushSelectedComponentState']),
    updateValue(value, path) {
      this.setSelectedComponentState({ value, path });
    },
    addNewCC() {
      this.pushSelectedComponentState({
        path: 'ccs',
        value: '',
      });
    },
    updateCC(cc, index) {
      this.setSelectedComponentState({ value: cc, path: `ccs[${index}]` });
    },
    removeItem(address) {
      if (window.confirm('Are you sure?')) {
        const removed = without(this.selectedContent.ccs, address);
        this.setSelectedComponentState({ value: removed, path: 'ccs' });
      }
    },
  },
};
</script>

<style scoped>
.whppt-label {
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.025em;
  font-size: 0.75rem;
}

.whppt-form-config__track {
  margin-top: 1rem;
}
</style>
