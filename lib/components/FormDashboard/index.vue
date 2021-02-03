<template>
  <div class="whppt-dashboard__wrapper">
    <div class="whppt-dashboard__form">
      <div class="whppt-filters-wrapper">
        <whppt-button v-if="!filtersVisible" class="whppt-filters-button" @click="filtersVisible = true">
          Show Filters
        </whppt-button>
      </div>
      <whppt-table
        :headers="headers"
        :items="items"
        dense
        :page.sync="page"
        :per-page.sync="size"
        :total="total"
        @update:page="fetchFormData()"
        @update:perPage="fetchFormData(true)"
      >
        <template v-slot:item.formInput="{ item }">
          <a class="whppt-form__input" href="javascript:void(0);" @click="viewFormInput(item)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              focusable="false"
              role="img"
              width="1rem"
              height="1rem"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
              style="transform: rotate(360deg)"
            >
              <path
                d="M14 3v2h3.59l-9.83 9.83l1.41 1.41L19 6.41V10h2V3m-2 16H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7z"
                fill="currentColor"
              ></path>
            </svg>
          </a>
        </template>
      </whppt-table>
    </div>
    <whppt-drawer :active="filtersVisible" position="right">
      <div class="whppt-form__filters">
        <div class="whppt-filters-wrapper">
          <whppt-button class="whppt-filters-button" @click="filtersVisible = false">Hide Filters</whppt-button>
          <whppt-input
            id="dashboard-filter-identifier"
            v-model="filters.identifier"
            class="whppt-dashboard__filter"
            label="Identifier"
            placeholder="Form Identifier"
            clearable
            @input="fetchFormData(true)"
          ></whppt-input>
        </div>
      </div>
    </whppt-drawer>
    <whppt-dialog :is-active="dialogActive">
      <div class="form-info">
        <whppt-button class="whppt-filters-button" @click="dialogActive = false">Close</whppt-button>
        <div v-for="(value, key) in selectedItem" :key="key" class="dialog-item">
          <div class="dialog-key">{{ `${key}: ` }}</div>
          <div>{{ value }}</div>
        </div>
      </div>
      <!-- <template v-slot:header><div>Header</div></template>
      <div>Content</div> -->
    </whppt-dialog>
  </div>
</template>

<script>
import { map, orderBy } from 'lodash';

import WhpptTable from '@whppt/nuxt/lib/components/ui/Table.vue';
import WhpptButton from '@whppt/nuxt/lib/components/ui/Button.vue';
import WhpptInput from '@whppt/nuxt/lib/components/ui/Input.vue';
import WhpptDrawer from '@whppt/nuxt/lib/components/ui/Drawer.vue';
import WhpptDialog from '@whppt/nuxt/lib/components/ui/Dialog.vue';
export default {
  name: 'FormDashboard',
  components: {
    WhpptTable,
    WhpptButton,
    WhpptInput,
    WhpptDrawer,
    WhpptDialog,
  },
  data: () => ({
    filtersVisible: false,
    formSubmissions: undefined,
    page: 1,
    size: 10,
    total: 0,
    filters: {
      identifier: '',
    },
    headers: [
      { text: 'Subject', align: 'start', value: 'subject' },
      { text: 'Identifier', align: 'start', value: 'identifier' },
      { text: 'Recipient', align: 'start', value: 'recipient' },
      { text: 'CCs', align: 'start', value: 'ccs' },
      { text: 'Created At', align: 'start', value: 'createdAt' },
      { text: 'Updated At', align: 'start', value: 'updatedAt' },
      { text: 'Form Input', align: 'start', value: 'formInput' },
    ],
    dialogActive: false,
    selectedItem: undefined,
  }),
  computed: {
    items() {
      if (!this.formSubmissions) return [];

      return map(this.formSubmissions, formSubmission => ({
        subject: formSubmission.settings.subject || '',
        identifier: formSubmission.settings.identifier || '',
        recipient: formSubmission.settings.recipient || '',
        ccs: formSubmission.settings.ccs || [],
        createdAt: formSubmission.createdAt,
        updatedAt: formSubmission.updatedAt,
        formInput: formSubmission.form || {},
      }));
    },
  },
  created() {
    this.fetchFormData();
  },
  methods: {
    fetchFormData(resetPage) {
      if (resetPage) this.page = 1;

      return this.$axios
        .$get(`/api/forms/getForm`, {
          params: {
            identifier: this.filters.identifier,
          },
        })
        .then(results => {
          this.formSubmissions = orderBy(results, ['updatedAt'], ['desc']);
          this.total = results.length;
        });
    },
    viewFormInput(item) {
      const tempItem = {};
      for (const [key, value] of Object.entries(item)) {
        if (key !== 'formInput') {
          tempItem[key] = value;
        } else {
          for (const [key, value] of Object.entries(item.formInput)) {
            tempItem[key] = value;
          }
        }
      }
      this.selectedItem = tempItem;
      this.dialogActive = true;
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-600: #5a67d8;

.whppt-dashboard__wrapper {
  display: flex;
}

.whppt-form__filters {
  padding: 1rem;
}

.whppt-dashboard__form {
  padding: 1rem;
  width: 100%;

  .whppt-dashboard__filter {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
}

.whppt-form__input {
  display: flex;

  svg {
    margin-right: 0.5rem;
  }

  &:hover,
  &:focus {
    color: $primary-600;
    text-decoration: underline;
  }
}

.whppt-filters-wrapper {
  min-height: 3rem;
  width: 100%;
}

.whppt-filters-button {
  margin-left: auto;
  margin-bottom: 0.5rem;
}

.form-info {
  padding: 3rem;
}

.dialog-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}
.dialog-key {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  margin-right: 1rem;
}
</style>
