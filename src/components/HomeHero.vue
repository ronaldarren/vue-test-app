<template>
    <v-parallax height="700" src="http://source.unsplash.com/hTR1XPtTo_k">
        <!-- rzPVSqQjjqs -->
        <!-- ddLiNMqWAOM -->
        <!-- <v-container fluid fill-height class="home-hero" style="max-height: 100vh;"> -->
        <v-layout justify-center align-center column>
            <div class="display-3 font-weight-black white--text text-xs-center">
                Hello there!
            </div>
            <div class="display-2 font-weight-black white--text text-xs-center">
                Hungry?
            </div>
            <div class="display-1 font-weight-bold white--text text-xs-center">
                Scroll down to see your eating options
            </div>
            <v-btn fab class="mt-5 purple darken-4">
                <v-icon large color="white">expand_more</v-icon>
            </v-btn>
        </v-layout>
        <!-- </v-container> -->
    </v-parallax>
</template>

<script>
export default {
    name: 'HomeHero'
};
</script>

<style scoped></style>
