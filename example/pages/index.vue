<template>
  <div>
    <h1>Hello world!</h1>
    <custom-form :content="testData" />
  </div>
</template>

<script>
import definition from '../../lib/components/Form/definition';

export default {
  name: 'TestPage',
  data() {
    const testData = {};
    definition.init({ $set: this.$set }, testData);
    return {
      testData,
    };
  },
};
</script>
