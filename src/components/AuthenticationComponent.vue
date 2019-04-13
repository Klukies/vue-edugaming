<template>
<div class="modal-backdrop">
  <div v-show="isLoginShown" class="login-modal modal">
    <div class="x flop medium" @click="close"><b></b><b></b><b></b><b></b></div>
    <div class="modal-header">
      <h2>Log in</h2>
      <h3>New to EduGaming? <a @click="showSignInModal">Sign up for free!</a></h3>
    </div>
    <div class="login-form auth-form">
      <form autocomplete="off" @submit.prevent="login" method="post">
        <div class="form-field">

          <span class="error" :class="{focused: isEmailFocused}">{{ errors.first('Email') }}</span>
          <label for="loginEmail"
          :class="{focused: isEmailFocused}">Email address</label>

          <input type="text" id="loginEmail"
          v-model="email"
          @input="checkAutocomplete()"
          @click="focus($event)"
          @blur="blur($event)"
          name="Email"
          v-validate="'required|email'"/>
        </div>

        <div class="form-field">
          <span class="error" :class="{focused: isPasswordFocused}">{{ errors.first('Password') }}</span>
          <label for="loginPassword"
          :class="{focused: isPasswordFocused}">Password</label>

          <input type="password" id="loginPassword"
          v-model="password"
          @input="checkAutocomplete()"
          @click="focus($event)"
          @blur="blur($event)"
          name="Password"
          v-validate="'required'"/>
        </div>
        <button type="submit" class="btn submit-btn">Login</button>
      </form>
    </div>
  </div>

  <div v-show="isSignUpShown" class="signup-modal modal">
    <div class="x flop medium" @click="close"><b></b><b></b><b></b><b></b></div>
    <div class="modal-header">
      <h2>Sign up</h2>
      <h3>Already have an account? <a @click="showLoginModal">Log in!</a></h3>
    </div>
    <div class="signup-form auth-form">
      <form autocomplete="off" @submit.prevent="register" method="post">
        <div class="form-field">
          <span class="error" :class="{focused: isNameFocused}">{{ errors.first('Name') }}</span>
          <label for="signupName"
          :class="{focused: isNameFocused}">Name</label>

          <input type="text" id="signupName"
          v-model="name"
          @input="checkAutocomplete()"
          @click="focus($event)"
          @blur="blur($event)"
          name="Name"
          v-validate="'required'"/>
        </div>

        <div class="form-field">
          <span class="error" :class="{focused: isEmailFocused}">{{ errors.first('Email') }}</span>
          <label for="signupEmail"
          :class="{focused: isEmailFocused}">Email address</label>

          <input type="text" id="signupEmail"
          v-model="email"
          @input="checkAutocomplete()"
          @click="focus($event)"
          @blur="blur($event)"
          name="Email"
          v-validate="'required|email'"/>
        </div>

        <div class="form-field">
          <span class="error" :class="{focused: isPasswordFocused}">{{ errors.first('Password') }}</span>
          <label for="signupPassword"
          :class="{focused: isPasswordFocused}">Password</label>

          <input type="password" id="signupPassword"
          v-model="password"
          @input="checkAutocomplete()"
          @click="focus($event)"
          @blur="blur($event)"
          name="Password"
          v-validate="'required'"/>
        </div>

        <button type="submit" class="btn submit-btn">Sign-Up</button>
      </form>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'AuthenticationComponent',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      success: false,
      isLoginShown: true,
      isSignUpShown: false,
      isEmailFocused: false,
      isPasswordFocused: false,
      isNameFocused: false,
    }
  },
  methods: {
    close() {
      this.email = '';
      this.isEmailFocused = false;
      this.password = '';
      this.isPasswordFocused = false;
      this.isLoginShown = false;
      this.isSignUpShown = true;
      this.isLoginShown = true;
      this.isSignUpShown = false;;
      this.$emit('close');
    },
    showSignInModal() {
      this.email = '';
      this.isEmailFocused = false;
      this.password = '';
      this.isPasswordFocused = false;
      this.isLoginShown = false;
      this.isSignUpShown = true;
      this.errors.clear();
    },
    showLoginModal() {
      this.email = '';
      this.isEmailFocused = false;
      this.password = '';
      this.isPasswordFocused = false;
      this.name = '';
      this.isNameFocused = false;
      this.isLoginShown = true;
      this.isSignUpShown = false;
      this.errors.clear();
    },
    register() {
      this.$auth.register({
        data: {
          name: this.name,
          email: this.email,
          password: this.password
        },
        success: function() {
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
        success: function() {
          this.$emit('close');
        },
        error: function() {},
        rememberMe: true,
        redirect: null,
        fetchUser: true,
      });
    },
    focus($event) {
      if ($event.target.id === 'loginEmail' || $event.target.id === 'signupEmail') {
        this.isEmailFocused = true;
      } else if ($event.target.id === 'loginPassword' || $event.target.id === 'signupPassword') {
        this.isPasswordFocused = true;
      } else if ($event.target.id === 'signupName') {
        this.isNameFocused = true;
      }
    },
    blur($event) {
      if (this.email === '') {
        this.isEmailFocused = false;
      }
      if (this.password === '') {
        this.isPasswordFocused = false;
      }
      if (this.name === '') {
        this.isNameFocused = false;
      }
    },
    checkAutocomplete() {
      if (this.email !== '') {
        this.isEmailFocused = true;
      }
      if (this.password !== '') {
        this.isPasswordFocused = true;
      }
    }
  }
};
</script>

<style scoped>
@import './../assets/css/authentication.css';
</style>
