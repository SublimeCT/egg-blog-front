<template>
    <div id="ArticleList" v-if="list">
        <Input v-model="searchTitle" placeholder="Search By Title..." clearable class="search-input"></Input>
        <Button type="default" class="search-button">search</Button>
        <Button type="primary" class="add-button" @click="addArticle">add article</Button>
        <Table border
            :columns="columns"
            :data="list"
            @on-sort-change="sortHandler"
            stripe></Table>
    </div>
</template>

<script>
import axios from 'axios'
import { API } from '@/config/base'

export default {
    data () {
        return {
            searchTitle: '',
            activeIndex: 1,
            // list: [{
            //     '_id' : '5a818d68fd2d018f2c01e9b1',
            //     'user_id' : '5a818a89f31a42956c75c5fa',
            //     'content' : '# hello world',
            //     'create_time' : '2018-02-12T12:49:44.410Z',
            //     'title' : 'this is first article',
            //     'image' : null
            // }, {
            //     '_id' : '5a88f97201a57df8e2fd762f',
            //     'user_id' : '5a818a89f31a42956c75c5fa',
            //     'content' : '#content',
            //     'title' : 'title',
            //     'image' : null,
            //     'create_time' : '2018-02-18T03:56:34.730Z',
            //     'modify_time' : '2018-02-18T03:56:34.730Z'
            // }, {
            //     '_id' : '5a8d5ec81008beb9ba31cf3c',
            //     'user_id' : '5a818a89f31a42956c75c5fa',
            //     'content' : '#content',
            //     'title' : 'title 001',
            //     'image' : null,
            //     'create_time' : '2018-02-18T03:56:34.730Z',
            //     'modify_time' : '2018-02-18T03:56:34.730Z'
            // }, {
            //     '_id' : '5a8d5ed91008beb9ba31cf3d',
            //     'user_id' : '5a818a89f31a42956c75c5fa',
            //     'content' : '#content',
            //     'title' : 'title 000',
            //     'image' : null,
            //     'create_time' : '2018-01-18T03:56:34.730Z',
            //     'modify_time' : '2018-02-18T03:56:34.730Z'
            // }, {
            //     '_id' : '5a8d5ee51008beb9ba31cf3e',
            //     'user_id' : '5a818a89f31a42956c75c5fa',
            //     'content' : '#content',
            //     'title' : 'title 00011',
            //     'image' : null,
            //     'create_time' : '2018-02-11T03:56:34.730Z',
            //     'modify_time' : '2018-02-18T03:56:34.730Z'
            // }, {
            //     '_id' : '5a8d5f041008beb9ba31cf3f',
            //     'user_id' : '5a818a89f31a42956c75c5fa',
            //     'content' : '#content',
            //     'title' : 'title 080923841',
            //     'image' : null,
            //     'create_time' : '2018-02-02T03:56:34.730Z',
            //     'modify_time' : '2018-02-18T03:56:34.730Z'
            // }, {
            //     '_id' : '5a8d5f0c1008beb9ba31cf40',
            //     'user_id' : '5a818a89f31a42956c75c5fa',
            //     'content' : '#content',
            //     'title' : 'title 1',
            //     'image' : null,
            //     'create_time' : '2018-02-04T03:56:34.730Z',
            //     'modify_time' : '2018-02-18T03:56:34.730Z'
            // }],
            list: null,
            sortColumn: {
                create_time: 'DESC'
            },
            columns: [
                {key: 'title', title: 'Title'},
                {key: 'create_time', title: 'Create Time', sortable: 'custom'},
                {key: 'modify_time', title: 'Modify Time', sortable: 'custom'},
                {
                    key: 'action',
                    width: 200,
                    align: 'center',
                    title: 'Action',
                    render: (h, params) => {
                        const _id = params.row._id
                        const _this = this
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click () {
                                        _this.$router.push({ path: '/article/' + _id })
                                    }
                                }
                            }, 'View'),
                            h('Button', {
                                props: {
                                    type: 'warning',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click () {
                                        _this.$router.push({ path: '/backend/article/' + _id })
                                    }
                                }
                            }, 'Edit'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click () {
                                        _this.deleteArticle(_id)
                                    }
                                }
                            }, 'Delete')
                        ])
                    }
                }
            ]
        }
    },
    created() {
        const _this = this
        this.ArticleHandler = {
            getRemoteData ({querys} = {}) {
                axios
                    .request({
                        method: 'GET',
                        baseURL: API.prefix,
                        data: querys,
                        url: '/articles'
                    })
                    .then(res => {
                        _this.list = res.data
                    })
            }
        }
        // 请求文章列表
        this.ArticleHandler.getRemoteData()
    },
    methods: {
        sortHandler ({column, key, order}) {
            const _order = order === 'asc' ? 1 : -1
            const querys = {sort: {key: _order}}
            this.ArticleHandler.getRemoteData(querys)
        },
        addArticle () {
            this.$router.push({ path: '/backend/article' })
        }
    }
}
</script>
<style lang="scss" scoped>
#ArticleList {
    .search-input {
        width: 200px;
        margin-bottom: 15px;
    }
    .search-button, .add-button {
        vertical-align: top;
    }
}
</style>