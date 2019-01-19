<template>
    <div>
        <button @click="handleClick">子组件传值</button>
    </div>
</template>

<script>
    export default {
        methods: {
            handleClick() {
                this.$emit('eventValue', {msg:'hello Vue'})
            }
        },
    }
</script>

<style scoped>

</style>