<template>
  <div v-if="field">
    <div class="label mt-4">{{ label || 'List Field Label' }}</div>
    <div class="w-full my-2">
      <whppt-button class="w-full" @click="addNewItem"><add /> Add Item</whppt-button>
    </div>
    <div v-for="(item, index) in listValues" :key="index" class="mb-2">
      <div class="flex justify-between items-center">
        <whppt-text-input :id="`field-${index}`" :value="item" @input="updateItem($event, index)" />
        <div class="flex">
          <div class="ml-1">
            <whppt-button @click="moveUp(item, index)"><arrow-up /></whppt-button>
          </div>
          <div class="ml-1">
            <whppt-button @click="moveDown(item, index)"><arrow-down /></whppt-button>
          </div>
          <div class="ml-1">
            <whppt-button danger @click="removeItem(item)"><trash /></whppt-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable import/no-unresolved */
import { without, clone } from 'lodash';
import { mapState, mapActions } from 'vuex';
import WhpptTextInput from '@whppt/nuxt/lib/components/ui/components/Input.vue';
import WhpptButton from '@whppt/nuxt/lib/components/ui/components/Button.vue';
import Add from '@whppt/nuxt/lib/components/icons/Add';
import ArrowDown from '@whppt/nuxt/lib/components/icons/ArrowDown';
import ArrowUp from '@whppt/nuxt/lib/components/icons/ArrowUp';
import Trash from '@whppt/nuxt/lib/components/icons/Trash';

export default {
  name: 'TextListEditor',
  components: { WhpptTextInput, WhpptButton, Add, Trash, ArrowDown, ArrowUp },
  props: { label: { type: String, default: '' }, field: { type: String, required: true } },
  computed: {
    ...mapState('whppt/editor', ['selectedComponent']),
    selectedContent() {
      return this.selectedComponent.value;
    },
    listValues() {
      return this.selectedContent[this.field];
    },
  },
  methods: {
    ...mapActions('whppt/editor', ['setSelectedComponentState', 'pushSelectedComponentState']),
    updateValue(value, path) {
      this.setSelectedComponentState({ value, path });
    },
    addNewItem() {
      this.pushSelectedComponentState({
        path: this.field,
        value: '',
      });
    },
    updateItem(cc, index) {
      this.setSelectedComponentState({ value: cc, path: `${this.field}[${index}]` });
    },
    moveUp(item, index) {
      const items = clone(this.listValues);
      items.splice(index, 1);
      items.splice(index - 1, 0, item);
      this.setSelectedComponentState({ value: items, path: this.field, replace: true });
    },
    moveDown(item, index) {
      const items = clone(this.listValues);
      items.splice(index, 1);
      items.splice(index + 1, 0, item);
      this.setSelectedComponentState({ value: items, path: this.field, replace: true });
    },
    removeItem(option) {
      if (window.confirm('Are you sure?')) {
        const removed = without(this.selectedContent[this.field], option);
        this.setSelectedComponentState({ value: removed, path: this.field });
      }
    },
  },
};
</script>
