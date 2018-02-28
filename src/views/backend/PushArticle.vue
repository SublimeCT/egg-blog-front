<template>
    <div id="BackendArticles">
        <Input v-model="title" type="textarea" :autosize="true" placeholder="Input Title..." class="title-input"></Input>
        <mavon-editor v-model="content" :ishljs = "true" :subfield="false" @save="saveArticle"></mavon-editor>
        <Dropdown trigger="click" @on-visible-change="setHistory" class="record-btn" :placement="placement"  @on-click="restoreAtricle">
            <Button type="warning">恢复 &nbsp;<Icon type="arrow-down-b"></Icon></Button>
            <DropdownMenu slot="list">
                <DropdownItem v-for="(record, index) in history" :key="index" :name="index" class="limit-text-len history-list-item">{{ record.time + ' ' + record.title + ' ' + record.content }}</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <Button type="primary" class="submit-btn" @click="submitConfirm = true">提交</Button>
        <Modal
            v-model="submitConfirm"
            title="Submit this article ?"
            @on-ok="submitArticle">
            确定要提交该文章吗?
        </Modal>
    </div>
</template>

<script>
import { localStorageConfig, API } from '@/config/base'
import { mavonEditor } from 'mavon-editor'
import requester from '@/utils/request'
import axios from 'axios'
import 'mavon-editor/dist/css/index.css'

export default {
    components: {
        'mavon-editor': mavonEditor
    },
    data () {
        return {
            title: '',
            placement: window.innerWidth ? 'top-start' : 'bottom-start',
            content: '',
            history: [],
            submitConfirm: false,
            confirmFlag: 0,
            get storageItemName () {
                return localStorageConfig.prefix + 'articles'
            }
        }
    },
    methods: {
        // 将数据保存至本地, 提交后清空
        saveArticle (value, render) {
            const date = new Date()
            const articleItem = {
                time: date.toLocaleDateString() + ' ' + date.toLocaleTimeString(),
                content: value,
                title: this.title
            }
            let localeData = this._getRecordsForLocalStorage()
            if (!Array.isArray(localeData)) {
                localeData = []
            } else {
                if (localeData.length >= 5) { // 维持队列长度
                    localeData.shift()
                }
            }
            localeData.push(articleItem)
            localeData = JSON.stringify(localeData)
            localStorage.setItem(this.storageItemName, localeData)
        },
        setHistory (visible) {
            if (visible) {
                this.history = this._getRecordsForLocalStorage()
            }
        },
        _getRecordsForLocalStorage () {
            let localeData = localStorage.getItem(this.storageItemName)
            try {
                localeData = JSON.parse(localeData)
            } catch (e) {
                localeData = []
                console.warn(e)
            }
            return localeData
        },
        restoreAtricle (index) {
            this.title = this.history[index].title
            this.content = this.history[index].content
        },
        submitArticle () {
            // 1. 数据检测
            const checkResult = this._checkArticle()
            if (!checkResult.success) {
                const {title, desc} = checkResult
                this.$Notice[checkResult.type]({title, desc})
                return
            }
            // 2. 提交
            requester.getCsrfCookie(this.$cookie).then(token => {
                const _this = this
                const querys = {
                    title: _this.title,
                    content: _this.content
                }
                axios
                    .request({
                        method: 'POST',
                        baseURL: API.prefix,
                        data: querys,
                        url: '/articles',
                        headers: {'X-CSRF-TOKEN': token}
                    })
                    .then(res => {
                        this.$Notice.success({
                            title: 'Push success !',
                            render: h => {
                                return h('span', [
                                    'This article are pushed !!!',
                                    h('br'),
                                    ' at ',
                                    h('a', {attrs: {href: '/article/' + res.data.data.id}}, 'link')
                                ])
                            },
                            duration: 0
                        })
                    })
                    .catch(e => {
                        if (e.response.status === 400) {
                            this.$Notice.error({
                                title: 'Push faild !',
                                desc: e.response.data.message
                            })
                        }
                    })
            })
        },
        _checkArticle () {
            let res = {
                success: false,
                type: 'error'
            }
            if (!this.title || !this.content) {
                res.title = '请填写标题和内容'
                return res
            }
            res.success = true
            return res
        }
    }
}
</script>

<style>
.title-input {
    margin-bottom: 10px;
}
.record-btn {
    margin: 10px 25px 10px 0px;
}
.submit-btn {
    margin-top: 10px;
    float: right;
}
.history-list-item {
    width: 950px;
}
</style>