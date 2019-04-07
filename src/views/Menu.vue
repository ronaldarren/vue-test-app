<template>
    <div>
        <home-plans></home-plans>
        <meal-recipes></meal-recipes>
        <app-footer></app-footer>
    </div>
</template>

<script>
import HomePlans from '@/components/HomePlans';
import MealRecipes from '@/components/MealRecipes';
import AppFooter from '@/components/AppFooter';
export default {
    name: 'Menu',
    components: {
        HomePlans,
        MealRecipes,
        AppFooter
    }
};
</script>

<style scoped></style>
