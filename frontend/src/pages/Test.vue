<template>
  <Candidates
    v-model="activeStep"
    :steps="['Login', 'Address', 'Payment', 'Review']"
    @submit="handleSubmit"
  />
</template>

<script>
import Candidates from './Candidates.vue';

export default {
  components: { Candidates },
  data() {
    return {
      activeStep: 0,
    };
  },
  methods: {
    handleSubmit() {
      alert('Order submitted!');
    },
  },
};
</script>
