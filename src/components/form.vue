<template>
    <div>
        <form>
            <slot></slot>
        </form>
    </div>
</template>

<script>
    export default {
        provide(){
            return { // 将表单的实例传递给子组件
                form: this
            }
        },
        props: {
            model: {
                type: Object,
                required: true 
            },
            rules: {
                type: Object
            }
        },
        created (){
            // 缓存需要校验的表单项
            this.fields = [];
            this.$on('formItemAdd', item => this.fields.push(item) )
        },
        methods: {
            async validate(callback) {
                // 将formItem数组转换为validate()返回的promise数组
                const tasks = this.fields.map(item=> item.validate())
                console.log('tasks', tasks);
                                
                // 获取所有结果统一处理
                const results = await Promise.all(tasks);
                let ret = true
                results.forEach(valid=>{
                    if(!valid){
                        // 只要一个formItem失败就失败
                        ret = false;
                    }
                })
                callback(ret);
            }
        },
    }
</script>

<style scoped>

</style>