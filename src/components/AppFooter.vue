<template>
    <v-footer height="auto" color="purple darken-1">
        <v-layout justify-center row wrap>
            <v-btn v-for="link in links" :key="link" color="white" flat round>
                {{ link }}
            </v-btn>
            <v-flex purple darken-4 py-3 text-xs-center white--text xs12>
                &copy;2019 — <strong>Ron</strong>
            </v-flex>
        </v-layout>
    </v-footer>
</template>

<script>
export default {
    data: () => ({
        links: ['Home', 'About Us', 'Team', 'Services', 'Blog', 'Contact Us']
    })
};
</script>
