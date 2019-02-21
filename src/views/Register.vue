<template>
  <v-container>
    <v-layout row class='text-xs-center'>
      <v-flex xs4 class='grey lighten-4'>
        <v-container class='text-xs-center'>
          <v-card flat>
            <v-card-title primary-title>
              <h4>Register</h4>
            </v-card-title>

            <v-form v-model='formValid' ref='form'>
              <!-- EMAIL -->
              <v-text-field
                prepend-icon='email'
                name='Email'
                label='E-mail'
                v-model='email'
                :rules='[requiredRule, emailRule]'
              ></v-text-field>

              <!-- LOGIN -->
              <v-text-field
                prepend-icon='person'
                name='Username'
                label='Username'
                v-model='login'
                :rules='[requiredRule]'
              ></v-text-field>

              <!-- PASSWORD -->
              <v-text-field
                prepend-icon='lock'
                name='Password'
                label='Password'
                type='password'
                v-model='password'
                :rules='[requiredRule]'
              ></v-text-field>

              <!-- CONFIRM PASSWORD -->
              <v-text-field
                prepend-icon='lock'
                name='ConfirmPassword'
                label='Confirm Password'
                type='password'
                :rules='[requiredRule, passwordMatchRule]'
                v-model='confirmPassword'
              ></v-text-field>

              <!-- FIRST NAME -->
              <v-text-field
                prepend-icon='person'
                name='firstName'
                label='First Name'
                v-model='firstName'
              ></v-text-field>

              <!-- LAST NAME -->
              <v-text-field
                prepend-icon='person'
                name='lastName'
                label='Last Name'
                v-model='lastName'
              ></v-text-field>

              <v-card-actions>
                <v-btn primary large block @click='registerUser()'>Register</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import { registerUser } from '../helpers/auth';
import Axios from 'axios';

@Component
export default class Register extends Vue {
  private login: string = '';
  private password: string = '';
  private confirmPassword: string = '';
  private email: string = '';
  private firstName: string = '';
  private lastName: string = '';

  private formValid: boolean = false;

  private requiredRule = (v: string) => v.length > 0 || 'Required.';

  private emailRule = (value: string) => {
    // tslint:disable-next-line
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || 'Invalid e-mail.';
  }

  // ugly hack, because rules don't have access to members so
  // you need another fuction to return proper value
  private passwordMatchRule = () => {
    return this.checkPasswords();
  }

  private checkPasswords() {
    return this.password === this.confirmPassword || 'Password must match';
  }

  private async registerUser() {
    const form = this.$refs.form as any;
    if (!form.validate()) {
      return;
    }

    const res = await registerUser({
      username: this.login,
      email: this.email,
      password: this.password,
      first_name: this.firstName,
      last_name: this.lastName,
    });

    if (res.status === 201) {
      this.$router.push('/');
    }
  }
}
</script>