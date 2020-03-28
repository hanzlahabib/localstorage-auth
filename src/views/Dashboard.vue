<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Users</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Admin Dashbaord</v-toolbar-title>
              <v-spacer></v-spacer>
          <v-btn
      color="primary"
      dark
      @click.stop="newUser"
    >
      Create New User
    </v-btn>
    </v-app-bar>

    <v-content>
      <v-container
        fluid
      >
      <vtable :events="events"></vtable>
       </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import Vue from 'vue';
import vtable from '../components/table.vue';

export default {
  name: 'Dashboard',
  props: {
    source: String,
  },
  components: {
    vtable,
  },
  data: () => ({
    drawer: null,
    events: new Vue({}),
  }),

  created() {
    this.$vuetify.theme.dark = true;
  },
  methods: {
    newUser() {
      this.events.$emit('newUser');
    },
  },
};
</script>
