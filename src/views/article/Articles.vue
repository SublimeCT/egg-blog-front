<template>
    <div id="Articles">
        <h2><sub>博客主页</sub> Test Page</h2>
        <Button type="primary" @click="tips">Open notice</Button>
    </div>
</template>

<script>
export default {
    methods: {
        tips () {
            this.$Notice.success({
                title: 'Notification title',
                desc: 'The desc will hide when you set render.',
                render: h => {
                    return h('span', [
                        'This article are pushed !!!',
                        h('br'),
                        ' at ',
                        '<br><a href="/login"><br>',
                        h('a', {
                            attrs: {
                                href: '/login'
                            }
                        }, '====>')
                    ])
                },
                duration: 0
            })
        }
    }
}
</script>

<style lang="scss" scoped>
#Articles {
    background-image: url('../../assets/bg-1.jpg');
    width: 100%;
    height: 100%;
    background-size: 100% auto;
    background-repeat: no-repeat;
}
</style>
