<template>
    <span>
        <home-hero></home-hero>
        <home-details></home-details>
        <!-- <home-plans></home-plans> -->
        <app-footer></app-footer>
    </span>
</template>

<script>
import HomeHero from '@/components/HomeHero';
import HomeDetails from '@/components/HomeDetails';
// import HomePlans from '@/components/HomePlans';
import AppFooter from '@/components/AppFooter';

export default {
    name: 'home',
    components: {
        HomeHero,
        HomeDetails,
        AppFooter
        // HomePlans
    }
};
</script>
