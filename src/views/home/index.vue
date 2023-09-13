<template>
    <div>
        <TypeNav />
        <ListContainer />
        <Recommend />
        <Rank />
        <Like />
        <Floor v-for="(floor) in floorList" :key="floor.id" :floorList="floor" />
        <Band />
    </div>
</template>

<script>
import Recommend from './recommend'
import ListContainer from './listContainer'
import Rank from './rank'
import Like from './like'
import Floor from './floor'
import Band from './band'
import { mapState } from 'vuex'
export default {
    name: "Home",
    components: {
        Recommend,
        ListContainer,
        Rank,
        Like,
        Floor,
        Band
    },
    mounted() {
        this.$store.dispatch('home/getFloorList');
        // 获取用户登录信息
        this.getData();
    },
    computed: {
        ...mapState({
            floorList: state => state.home.floorList
        }),

    },
    methods: {
        // 通过token获取用户信息
        async getData() {
            try {
                await this.$store.dispatch('user/checkToken');
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style></style>