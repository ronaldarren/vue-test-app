<template>
    <v-app>
        <app-navigation></app-navigation>
        <v-content transition="slide-x-transition">
            <Snackbar />
            <!-- <router-view v-on:showSnackbar="showSnackbar"></router-view> -->
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
import AppNavigation from '@/components/AppNavigation';
import Snackbar from '@/components/Snackbar';

export default {
    name: 'App',
    components: {
        AppNavigation,
        Snackbar
    },
    methods: {
        showSnackbar(text, timeout = 3000, yPos = 'top', xPos, mode) {
            this.text = text;
            this.timeout = timeout;
            this.y = yPos;
            this.x = xPos;
            this.mode = mode;
            this.snackbar = true;
        }
    }
};
</script>

<style></style>
