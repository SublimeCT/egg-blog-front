<template>
    <div id="ArticleList" v-if="list">
        <Input v-model="searchTitle" placeholder="Search By Title..." clearable class="search-input"></Input>
        <Button type="primary" class="search-button">search</Button>
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
                    width: 180,
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
    .search-button {
        vertical-align: top;
    }
}
</style>