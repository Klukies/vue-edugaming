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
  name: 'Authentication',
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
        redirect: '/',
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
button {
  width: 100%;
  border: 0;
  font-size: 1.3rem;
}

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
  z-index: 102;
}

.modal {
  background-color: #FFF;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  z-index: 100;
  width: 20vw;
  padding-bottom: 3vh;
}

a {
  cursor: pointer;
  text-decoration: underline;
}

.modal-header, .auth-form {
  text-align: center;
}

.modal-header, .auth-form {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}

.auth-form {
  text-align: left;
}

h3 {
  margin-bottom: 5vh;
}

h3, label {
  font-size: 1.3rem;
}

label, input {
  width: 100%;
}

span {
  display: block;
  transition: transform .2s ease-in-out;
}

label {
  position: absolute;
  display: block;
  transition: transform .2s ease-in-out;
}

input[type=text], input[type=password] {
  font-size: 18px;
  height: 36px;
  border: 0;
  border-bottom: 1px solid #3A55B4;
  margin-bottom: 5vh;
}

.focused {
  transform: translateY(-18px);
}

.error {
  color: #bb3333;
}

div.x {
  -webkit-transition-duration: 0.5s;
  transition-duration: 0.5s;
}

.x {
  position: relative;
  overflow: hidden;
  background: #3A55B4;
  border-radius: 2px;
  border: solid 2px #fff;
  transition: all 0.3s ease-out;
  cursor: pointer;
}

.x.medium {
  width: 24px;
  height: 24px;
  margin-left: calc(100% - 30px);
  margin-top: 4px;
}

.x.flop:hover {
  background: #bb3333;
  transform: rotate(90deg);
}

.x b {
  display: block;
  position: absolute;
  height: 0;
  width: 0;
  padding: 0;
  margin: 0;
}

.x.medium b {
  border: solid 10px rgba(255, 255, 255, 0);
}

.x b:nth-child(1) {
  border-top-color: #fff;
  top: -2px;
}

.x b:nth-child(2) {
  border-left-color: #fff;
  left: -2px;
}

.x b:nth-child(3) {
  border-bottom-color: #fff;
  bottom: -2px;
}

.x b:nth-child(4) {
  border-right-color: #fff;
  right: -2px;
}
</style>
