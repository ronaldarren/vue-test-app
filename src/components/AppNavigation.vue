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
                <div v-if="!isAuthenticated">
                    <template v-for="(item, index) in logOutItems">
                    <v-list-tile :key="index">
                        <v-list-tile-content>
                            <router-link :to="{ path: item.route }">
                                <v-btn flat>
                                    <v-icon left>{{ item.icon }}</v-icon>
                                        {{ item.title }}
                                </v-btn>
                                </router-link>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider :key="`divider-${index}`"></v-divider>
                </template>
                </div>
                <div v-else>
                    <template v-for="(item, index) in logInItems">
                        <v-list-tile :key="index">
                            <v-list-tile-content>
                                <router-link :to="{ path: item.route }">
                                    <v-btn flat>
                                        <v-icon left>{{ item.icon }}</v-icon>
                                            {{ item.title }}
                                    </v-btn>
                                    </router-link>
                            </v-list-tile-content>
                        </v-list-tile>
                    <v-divider :key="`divider-${index}`"></v-divider>
                    </template>
                    <v-list-tile>
                        <v-list-tile-content>
                            <v-btn flat @click="logout">
                                <v-icon left>exit_to_app</v-icon>
                                Logout
                            </v-btn>
                        </v-list-tile-content>
                    </v-list-tile>
                </div>
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
            <div v-if="!isAuthenticated" class="hidden-sm-and-down">
                <v-btn flat to="/sign-in" data-cy="signinBtn">Sign In</v-btn>
                <v-btn to="/join" class="nav-join" data-cy="joinBtn">
                    Join
                </v-btn>
            </div>
            <div v-else class="hidden-sm-and-down">
                <v-btn flat to="/menu" data-cy="menuBtn">Menu</v-btn>
                <v-btn flat to="/my-recipes">My Recipes</v-btn>
                <v-btn flat to="/profile">Profile</v-btn>
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
            logInItems: [
                { title: 'Menu', route: '/menu', icon: 'menu' },
                { title: 'My Recipes', route: '/my-recipes', icon: 'library_books' },
                { title: 'Profile', route: '/profile', icon: 'account_circle' },
                { title: 'Calendar', route: '/calendar', icon: 'calendar_today' },
                // { title: 'Logout', route: null, icon: 'exit_to_app' }
            ],
            logOutItems: [
                { title: 'Sign In', route: '/sign-in', icon: 'person_outline' },
                { title: 'Join', route: '/join', icon: 'assignment' }
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
