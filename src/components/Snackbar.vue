<template>
    <!-- <v-snackbar
    :text="text"
  :timeout="snackbar.timeout"
  :top="y === 'top'"
  :bottom="y === 'bottom'"
  :left="x ==='left'"
  :right="x === 'right'"
  :multi-line="mode === 'snackbar.multi-line'"
  :vertical="mode === 'vertical'"
  v-model="snackbar.visible">
    {{snackbar.text}}
    <v-btn flat dark @click="snackbar = false">
      Close
    </v-btn>
  </v-snackbar> -->
    <v-snackbar
        top
        v-model="snackbar.visible"
        :timeout="snackbar.timeout"
        :multi-line="snackbar.multiline === true"
    >
        {{ snackbar.text }}

        <v-btn flat dark @click="closeSnackbar">Close</v-btn>
    </v-snackbar>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
    //     data() {
    //     return {
    //       snackbar: false,
    //       text: "",
    //       timeout: null,
    //       y: "top",
    //       x: null,
    //       mode: null
    //     }
    //   },
    computed: {
        snackbar() {
            return this.$store.state.snackbar;
        }
    },
    methods: {
        ...mapMutations(['closeSnackbar'])
    }
};
</script>

<style scoped></style>
