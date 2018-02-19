<template>
    <div id="ArticleList" v-if="list">
        <!-- TABLE -->
        <div class="article-table">
            <table class="bordered striped highlight centered">
                <caption>article list title</caption>
                <thead>
                    <tr>
                        <th>标题</th>
                        <th>创建时间</th>
                        <th>修改时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>width</td>
                        <td>宽度</td>
                        <td>100px</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td>width</td>
                        <td>宽度</td>
                        <td>100px</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</template>

<script>
// import axios from 'axios'
// import { API } from '@/config/base'

export default {
    data() {
        return {
            list: [
                {
                    _id: '5a88f97201a57df8e2fd762f',
                    user_id: '5a818a89f31a42956c75c5fa',
                    content: '#content',
                    title: 'title',
                    image: null,
                    create_time: '2018-02-18T03:56:34.730Z',
                    modify_time: '2018-02-18T03:56:34.730Z'
                },
                {
                    _id: '6a88f97201a57df8e2fd762f',
                    user_id: '5a818a89f31a42956c75c5fa',
                    content: '#content',
                    title: 'title222',
                    image: null,
                    create_time: '2018-02-18T03:56:34.730Z',
                    modify_time: '2018-02-18T03:56:34.730Z'
                },
                {
                    _id: '5a818d68fd2d018f2c01e9b1',
                    user_id: '5a818a89f31a42956c75c5fa',
                    content: '# hello world',
                    create_time: '2018-02-12T12:49:44.410Z',
                    title: 'this is first article',
                    image: null
                }
            ]
        }
    },
    created() {
        // 请求文章列表
        // axios
        //     .request({
        //         method: 'GET',
        //         baseURL: API.prefix,
        //         url: '/articles'
        //     })
        //     .then(res => {
        //         console.warn(JSON.stringify(res.data))
        //     })
    },
    methods: {
        sortChangeHandler ({prop, order}) {
            console.log({prop, order})
        }
    }
}
</script>
<style lang="scss">
.article-table {
    max-width: 66%;
    margin: 10% auto;
}
</style>