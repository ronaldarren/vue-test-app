<template>
    <span>
        <v-navigation-drawer
            app
            v-model="drawer"
            class="purple lighten-2"
            dark
            disable-resize-watcher
        >
            <v-list>
                <template v-for="(item, index) in items">
                    <v-list-tile :key="index">
                        <v-list-tile-content>
                            <router-link :to="{ path: item.route }">{{
                                item.title
                            }}</router-link>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider :key="`divider-${index}`"></v-divider>
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app color="purple darken-4" dark>
            <v-toolbar-side-icon
                class="hidden-md-and-up"
                @click="drawer = !drawer"
            ></v-toolbar-side-icon>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <router-link to="/">
                <v-toolbar-title data-cy="titleBtn">{{
                    appTitle
                }}</v-toolbar-title>
            </router-link>
            <v-spacer class="hidden-sm-and-down"></v-spacer>
            <v-btn
                flat
                class="hidden-sm-and-down nav-home"
                to="/"
                data-cy="homeBtn"
                >Home</v-btn
            >
            <v-btn
                flat
                class="hidden-sm-and-down nav-menu"
                to="/menu"
                data-cy="menuBtn"
                >Menu</v-btn
            >
            <div v-if="!isAuthenticated" class="hidden-sm-and-down">
                <v-btn flat to="/sign-in" data-cy="signinBtn">Sign In</v-btn>
                <!-- <v-btn
                    color="purple lighten-3"
                    to="/join"
                    class="nav-join"
                    data-cy="joinBtn"
                    >Join</v-btn
                > -->
                <v-btn to="/join" class="nav-join" data-cy="joinBtn">
                    Join
                </v-btn>
            </div>
            <div v-else>
                <v-btn flat to="/my-recipes">My Recipes</v-btn>
                <v-btn flat to="/calendar">Calendar</v-btn>
                <v-btn outline color="white" @click="logout" data-cy="logout"
                    >Logout</v-btn
                >
            </div>
        </v-toolbar>
    </span>
</template>

<script>
export default {
    name: 'AppNavigation',
    data() {
        return {
            appTitle: 'Vue Test App',
            drawer: false,
            items: [
                { title: 'Menu', route: '/menu' },
                { title: 'Profile', route: '/profile' },
                { title: 'Sign In', route: '/sign-in' },
                { title: 'Join', route: '/join' }
            ]
        };
    },
    computed: {
        recipes() {
            return this.$store.state.recipes;
        },
        isAuthenticated() {
            return this.$store.getters.isAuthenticated;
        }
    },
    methods: {
        orderRecipe(item) {
            if (this.isAuthenticated) {
                this.$store.dispatch('addRecipe', item);
            } else {
                this.$router.push('/sign-in');
            }
        },
        logout() {
            this.$store.dispatch('userSignOut');
        }
    }
};
</script>

<style scoped>
a {
    color: white;
    text-decoration: none;
}
</style>
