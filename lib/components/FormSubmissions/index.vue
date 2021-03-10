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
        :page.sync="currentPage"
        :per-page.sync="limit"
        :total="total"
        @update:page="fetchFormData()"
        @update:perPage="fetchFormData(true)"
      >
        <template v-slot:item.viewSubmission="{ item }">
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
      <whppt-button v-if="items.length" class="whppt-filters-button" style="margin-top: 0.5rem" @click="exportToCSV">
        Export to CSV
      </whppt-button>
    </div>
    <submissions-filters :active="filtersVisible" @updateFilter="updateFilter" @close="filtersVisible = false" />
    <submission-dialog :is-active="dialogActive" :item="selectedItem" @close="dialogActive = false" />
  </div>
</template>

<script>
import { map, omit } from 'lodash';
import dayjs from 'dayjs';

import WhpptTable from '@whppt/nuxt/lib/components/ui/Table.vue';
import WhpptButton from '@whppt/nuxt/lib/components/ui/Button.vue';

import SubmissionDialog from './SubmissionDialog.vue';
import SubmissionsFilters from './SubmissionsFilters.vue';

export default {
  name: 'FormSubmissions',
  components: {
    WhpptTable,
    WhpptButton,
    SubmissionDialog,
    SubmissionsFilters,
  },
  data: () => ({
    filtersVisible: false,
    formSubmissions: undefined,
    currentPage: 1,
    limit: 10,
    total: 0,
    filters: {
      identifier: '',
      fromDate: undefined,
      toDate: undefined,
    },
    headers: [
      { text: 'Subject', align: 'start', value: 'subject' },
      { text: 'Identifier', align: 'start', value: 'identifier' },
      { text: 'Recipient', align: 'start', value: 'recipient' },
      { text: 'CCs', align: 'start', value: 'ccs' },
      { text: 'Submitted on', align: 'start', value: 'submittedAt' },
      { text: '', align: 'start', value: 'viewSubmission' },
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
        ccs:
          formSubmission.settings.ccs && formSubmission.settings.ccs.length
            ? formSubmission.settings.ccs.join(', ')
            : '',
        submittedAt: dayjs(formSubmission.createdAt).format('h:mm a, DD/MM/YYYY') || '',
        formFields: formSubmission.form,
      }));
    },
  },
  created() {
    this.fetchFormData();
  },
  methods: {
    fetchFormData(resetPage) {
      if (resetPage) this.page = 1;

      const params = {
        ...this.filters,
        limit: this.limit,
        page: this.currentPage,
      };

      return this.$axios
        .$get(`/api/forms/getSubmissions`, {
          params,
        })
        .then(({ formSubmissions, total }) => {
          this.formSubmissions = formSubmissions;
          this.total = total;
        });
    },
    viewFormInput(item) {
      this.selectedItem = { ...omit(item, ['formFields']), ...item.formFields };
      this.dialogActive = true;
    },
    updateFilter({ field, value }) {
      this.filters[field] = value;
      this.fetchFormData(true);
    },
    exportToCSV() {
      return this.$axios.$get(`/api/forms/generateCSV`, this.filters).then(csv => {});
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-600: #5a67d8;

.whppt-filters-button {
  margin-left: auto;
  margin-bottom: 0.5rem;
}

.whppt-dashboard__wrapper {
  display: flex;
}

.whppt-dashboard__form {
  padding: 1rem;
  width: 100%;
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
</style>
