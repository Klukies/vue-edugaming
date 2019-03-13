<template>
  <div class="modal-backdrop">
    <div v-show="isLoginShown" class="login-modal modal">
      <div class="modal-header">
        <button type="button" class="btn-close" @click="close">x</button>
        <h2>Log in</h2>
        <h3>New to EduGaming? <a @click="showSignInModal">Sign up for free!</a></h3>
      </div>
      <div class="login-form auth-form">
        <div class="alert alert-danger" v-if="loginError">
          <p>
            There was an error, unable to login.
          </p>
        </div>
        <form autocomplete="off" @submit.prevent="login" method="post">

          <div class="form-field">
            <label for="loginEmail">Email address</label>
            <input type="email" id="loginEmail" v-model="email" required/>
          </div>

          <div class="form-field">
                <label for="loginPassword">Password</label>
                <input type="password" id="loginPassword" v-model="password" required/>
          </div>

          <button type="submit" class="btn submit-btn">Login</button>

        </form>
      </div>

    </div>
    <div v-show="isSignUpShown" class="signup-modal modal">
        <div class="modal-header">
          <button type="button" class="btn-close" @click="close">x</button>
          <h2>Sign up</h2>
          <h3>Do you already have an account? <a @click="showLoginModal">Log in!</a></h3>
        </div>
        <div class="signup-form auth-form">
          <form autocomplete="off" @submit.prevent="register" method="post">
            <div class="form-field">
              <label for="signupName">Name</label>
              <input type="text" id="signupName" v-model="name" required/>
            </div>

            <div class="form-field">
              <label for="signupEmail">Email address</label>
              <input type="email" id="signupEmail" v-model="email" required/>
            </div>

            <div class="form-field">
              <label for="signupPassword">password</label>
              <input type="password" id="signupPassword" v-model="password" required/>
            </div>

            <button type="submit" class="btn submit-btn">Sign-Up</button>
          </form>
        </div>
      </div>
  </div>
</template>

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

<script>
  export default {
    name: 'Authentication',
    data() {
      return {
        name: '',
        email: '',
        password: '',
        success: false,
        isLoginShown: true,
        isSignUpShown: false
      }
    },
    methods: {
      close() {
        this.isLoginShown = true;
        this.isSignUpShown = false;;
        this.$emit('close');
      },
      showSignInModal() {
        this.isLoginShown = false;
        this.isSignUpShown = true;
      },
      showLoginModal() {
        this.isLoginShown = true;
        this.isSignUpShown = false;
      },
      register() {
        this.$auth.register({
          data: {
            name: this.name,
            email: this.email,
            password: this.password
          },
          success: function () {
            this.login()
          },
          error: function(resp) {
            this.error = true;
            this.errors = resp.respons.data.errors;
          },
          redirect: null
        });
      },
      login() {
        this.$auth.login({
          params: {
          email: this.email,
          password: this.password
          },
          success: function () {
            this.$emit('close');
          },
          error: function () {},
          rememberMe: true,
          redirect: '/',
          fetchUser: true,
        });
      }
    }
  };
</script>
