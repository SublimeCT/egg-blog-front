<template>
    <div id="BackendArticles">
        <mavon-editor v-model="content" :ishljs = "true"></mavon-editor>
    </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
    components: {
        'mavon-editor': mavonEditor
    },
    data () {
        return {
            content: ''
        }
    }
}
</script>

<style>

</style>
