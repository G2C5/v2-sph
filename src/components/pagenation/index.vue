<template>
    <div class="pagination">
        <h1>{{ satrNumAndEndNum }}</h1>
        <!-- 上一页 -->
        <button :disabled="pageNo == 1" @click="sendPageNO(pageNo - 1)">上一页</button>
        <!-- 第一页 -->
        <button v-if="satrNumAndEndNum.start > 1" @click="sendPageNO(1)" :class="{ active: pageNo == 1 }">1</button>
        <!-- ... -->
        <button v-if="satrNumAndEndNum.start > 2">...</button>
        <!-- 中 -->
        <template v-for="(page, index) in satrNumAndEndNum.end">
            <button v-if="page >= satrNumAndEndNum.start" :class="{ active: pageNo == page }" :key="index"
                @click="sendPageNO(page)">{{ page }}</button>
        </template>
        <!-- ... -->
        <button v-if="satrNumAndEndNum.end < totalPage - 1">...</button>
        <!-- 最后一页 -->
        <button v-if="satrNumAndEndNum.end < totalPage" @click="sendPageNO(totalPage)"
            :class="{ active: pageNo == totalPage }">{{ totalPage }}</button>
        <!-- 下一页 -->
        <button :disabled="pageNo == totalPage" @click="sendPageNO(pageNo - 0 + 1)">下一页</button>
        <button style="margin-left: 30px">共 {{ total }} 条</button>

        <br>
        <h3>{{ satrNumAndEndNum }}</h3>

    </div>
</template>

<script>
export default {
    name: "PageNation",
    props: ["pageSize", "pageNo", "total", "continues"],
    computed: {
        // 共个分页
        totalPage() { return Math.ceil(this.total / this.pageSize) },
        // 连续页码起始结束数
        satrNumAndEndNum() {
            // 最小分页数、当前分页、分页数据条数、数据总分页、
            const { continues, pageNo, totalPage } = this
            // 当前分页时，起始页数与结束页数
            let start = 0, end = 0;
            // 判断数据页数是否匹配分页器最小分页
            if (continues > totalPage) {
                start = 1
                end = totalPage
            } else {
                start = pageNo - parseInt(continues / 2)
                end = pageNo + parseInt(continues / 2)
                if (start < 1) {
                    start = 1
                    end = continues
                }
                if (end > totalPage) {
                    end = totalPage
                    start = end - continues + 1
                }
            }
            return { start, end }
        }

    },
    methods: {
        // 发送分页器当前页数
        sendPageNO(pageNo) {
            console.log("send--pageNo", pageNo)
            return this.$emit('getPageNo', pageNo)
        }
    }

}
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;

    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}

// .active {
//     background-color: #e77;
// }
</style>