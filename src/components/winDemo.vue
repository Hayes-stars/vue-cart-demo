<template>
    <div class="win">
        <!-- 插槽组件 -->
        <div class="head">
            <slot name="head"></slot>
        </div>
        <slot></slot>
        <div class="foot">
            <slot name="foot"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>