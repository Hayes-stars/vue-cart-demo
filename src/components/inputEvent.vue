<template>
    <div>
        <!-- {{someValue}} -->
        <input :type="type" :value="inputValue" @input="inputHandle">
    </div>
</template>

<script>
    export default {
        // inject: ['someValue'], // 20190119-组件传值
        props: {
            value: {
                type: String,
                default:'' 
            },
            type:{
                type: String,
                default:'text' 
            }
        },
        data() {
            return {
                // 单向数据流原则：组件内不能修改props属性
                inputValue: this.value
            }
        },
        methods: {
            inputHandle(e) {
                this.inputValue = e.target.value;
                // 通知父组件值更新  
                this.$emit('input', this.inputValue) 

                // 通知formItem校验
                this.$parent.$emit('validate', this.inputValue)
            }
        },
    }
</script>

<style scoped>

</style>