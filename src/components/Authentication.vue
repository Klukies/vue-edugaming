<template>
  <div class="modal-backdrop">
    <div class="modal-header">
      <p>Login</p>
      <button type="button" class="btn-close" @click="close">x</button>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'Authentication',
    methods: {
      close() {
        this.$emit('close');
      }
    },
  };
</script>

<style>

</style>
