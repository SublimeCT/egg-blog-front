<template>
    <div id="Article" v-if="article">
        <h2>文章页</h2>        
    </div>
</template>

<script>
import axios from 'axios'
import { API } from '@/config/base'

export default {
    data () {
        return {
            article: null
        }
    },
    created () {
        const _this = this
        const loadHandler = {
            id: _this.$route.params.id,
            loadFaildFun () {
                _this.$router.push({ path: '/' })
            },
            check () {
                if (!this.id || this.id.length !== 24) {
                    this.loadFaildFun()
                }
            }
        }
        loadHandler.check()
        axios
            .request({
                method: 'GET',
                baseURL: API.prefix,
                url: `/articles/${loadHandler.id}`
            })
            .then(res => {
                _this.list = res.data
            })
    }
}
</script>
