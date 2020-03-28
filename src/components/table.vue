/* eslint-disable no-undef */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable */
<template>
  <v-data-table
    :headers="headers"
    :items="users"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <Vdialog
      :close="close"
      :editedItem="editedItem"
      :formTitle="formTitle"
      :dialog="dialog"
      :save="save"
      :type="type"
      :_delete="Udelete"
      >
      </Vdialog>
    </template>
    <template v-slot:item.actions="{ item }">
      <a
        class="mr-2"
        @click="editItem(item)"
      >
        Edit
      </a>
      <a
        @click="deleteItem(item)"
      >
       Delete
      </a>
      <v-icon>mdi-view-dashboard</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>
<script>
import Vdialog from './dialog.vue';

export default {
  data: () => ({
    dialog: false,
    type: null,
    delIndex: null,
    // eslint-disable-next-line no-undef
    headers: [
      { text: 'First Name', value: 'fName' },
      { text: 'Last Name', value: 'lName' },
      { text: 'Username', value: 'username' },
      { text: 'Email', value: 'email' },
      { text: 'Password', value: 'password' },
      { text: 'Actions', value: 'actions', sort: false },
    ],
    users: [],
    editedIndex: -1,
    editedItem: {
      fName: '',
      lName: '',
      email: '',
      username: '',
      password: '',
    },
    defaultItem: {
      fName: '',
      lName: '',
      email: '',
      username: '',
      password: '',
    },
  }),
  props: [
    'events',
  ],
  components: {
    Vdialog,
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
  },

  watch: {
    dialog(val) {
      return val || this.close();
    },
  },

  created() {
    this.initialize();
  },

  mounted() {
    this.events.$on('newUser', this.newUser);
    console.log(this.$store.state);
  },
  methods: {
    initialize() {
      this.users = this.$store.state.users.mockedUsers;
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = { ...item };
      this.dialog = true;
      this.type = 'edit';
    },

    deleteItem(item) {
      const index = this.users.indexOf(item);
      this.dialog = true;
      this.type = 'confirm';
      this.delIndex = index;
    },

    close() {
      this.dialog = false;
      this.type = null;
      setTimeout(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.users[this.editedIndex], this.editedItem);
      } else {
        const id = `_${Math.random().toString(36).substr(2, 9)}`;
        this.editedItem.id = id;
        this.users.push(this.editedItem);
      }
      this.close();
    },
    Udelete() {
      this.users.splice(this.delIndex, 1);
      this.type = null;
      this.dialog = false;
    },
    newUser() {
      this.type = 'create';
      this.dialog = true;
      console.log('test in child');
    },
  },
};
</script>
