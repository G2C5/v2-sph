<template>
    <!--左侧列表：团队订单-->
    <div>
        <h3>团队订单</h3>
    </div>
</template>

<script>
export default {
    name: 'groupOrder'
}
</script>

<style scoped lang="less">
.order-left {
    float: left;
    width: 16.67%;

    dl {
        line-height: 28px;

        dt {
            font-weight: 700;
            padding: 5px;

            i {
                color: #77b72c;
            }
        }

        dd {
            margin: 0 0 6px;
            border-bottom: 1px solid #ededed;
            text-align: center;
        }
    }
}
</style>