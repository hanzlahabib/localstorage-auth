<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Sign up</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                 <v-text-field
                    label="First Name"
                    name="fName"
                    prepend-icon="person"
                    type="text"
                    v-model="user.fName"
                  />
              <v-text-field
                    label="Last Name"
                    name="lName"
                    prepend-icon="person"
                    type="text"
                    v-model="user.lName"

                  />
                  <v-text-field
                    label="Email"
                    name="email"
                    prepend-icon="person"
                    type="email"
                    v-model="user.email"
                  />
                <v-text-field
                    label="Username"
                    name="username"
                    prepend-icon="person"
                    type="text"
                    v-model="user.username"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="user.password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" v-on:click="signUp">Sign Up</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String,
  },
  data() {
    return {
      user: {
        fName: '',
        lName: '',
        email: '',
        usernmae: '',
        password: '',
      },
      error: false,
      timeout: 2000,
    };
  },
  methods: {
    signUp() {
      if (this.user.email !== '' && this.user.password !== '') {
        this.$store.commit('users/signUp', { user: this.user, store: this.$store });
        this.error = false;
      } else {
        this.$toastr.e(
          'Email or Password cannot be empty string',
        );
      }
    },
  },
};
</script>
