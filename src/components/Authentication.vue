<template>
  <div class="modal-backdrop">
    <div v-show="isLoginShown" class="signup-modal modal">
      <div class="modal-header">
        <button type="button" class="btn-close" @click="close">x</button>
        <h2>Log in</h2>
        <h3>New to EduGaming? <a @click="showSignInModal">Sign up for free!</a></h3>
      </div>
      <div class="login-form auth-form">
        <form autocomplete="off" @submit.prevent="register" method="post">

        </form>
      </div>

    </div>
    <div v-show="isSignUpShown" class="login-modal modal">
      <div class="modal-header">
        <button type="button" class="btn-close" @click="close">x</button>
        <h2>Sign up</h2>
        <h3>Do you already have an account? <a @click="showLoginModal">Log in!</a></h3>
      </div>
      <div class="signup-form auth-form">
        <form autocomplete="off" @submit.prevent="register" method="post">
          <div class="alert alert-danger" v-if="error && !success">
            <p>There was an error, unable to complete registration.</p>
          </div>

          <div class="form-field" v-bind:class="{ 'has-error':error && errors.name}">
            <span class="help-block" v-if="error && errors.name">{{ errors.name }}</span>
            <label for="name">Name</label>
            <input type="text" id="name" v-model="name" required/>
          </div>

          <div class="form-field" v-bind:class="{ 'has-error':error && errors.email}">
            <span class="help-block" v-if="error && errors.email">{{ errors.email }}</span>
            <label for="email">Email address</label>
            <input type="email" id="email" v-model="email" required/>
          </div>

          <div class="form-field" v-bind:class="{ 'has-error':error && errors.password}">
            <span class="help-block" v-if="error && errors.password">{{ errors.password }}</span>
            <label for="password">password</label>
            <input type="password" id="password" v-model="password" required/>
          </div>

          <button type="submit" class="btn submit-btn">Sign-Up</button>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'Authentication',
    data() {
      return {
        isLoginShown: true,
        isSignUpShown: false
      }
    },
    methods: {
      close() {
        this.$emit('close');
      },
      showSignInModal() {
        console.log("showing");
      }
    },
  };
</script>

<style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background-color: #FFF;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    border-radius: 3px;
  }
</style>
