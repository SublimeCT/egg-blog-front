<template>
    <div id="BackendIndex">
        <Row>
            <Col span="4" class-name="nav-wrap">
                <Menu :theme="theme" @on-select="changeMenu" :active-name="defaultActive">
                    <MenuItem v-for="(menu, index) in menus" :key="index" :name="menu.name" width="auto">
                        <Icon :type="menu.iconType"></Icon>
                        {{ menu.content }}
                    </MenuItem>
                    <i-switch size="large" class="check-theme-btn-wrap" @on-change="changeTheme" :value="theme === 'light'">
                        <span slot="open">白天</span>
                        <span slot="close">夜间</span>
                    </i-switch>
                </Menu>
            </Col>
            <Col span="20" class-name="section-wrap">
                <router-view/>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    data () {
        return {
            theme: 'light', // dark / light
            defaultActive: location.pathname,
            menus: [
                {
                    content: '文章管理',
                    iconType: 'ios-bookmarks-outline',
                    name: '/backend/articles'
                },
                {
                    content: '系统设置',
                    iconType: 'ios-settings-strong',                    
                    name: '/backend/settings'
                }
            ]
        }
    },
    methods: {
        changeMenu (name) {
            this.$router.push({ path: name })
        },
        changeTheme (state) {
            this.theme = state ? 'light' : 'dark'
        }
    },
    mounted () {
        // 初始化背景图片
        document.getElementsByTagName('body')[0].className = 'backend-body'
    },
    beforDestory () {
        document.body.removeAttribute('class', 'backend-body')
    }
}
</script>

<style lang="scss" scoped>
#BackendIndex {
    height: auto;
    background-size: 100% auto;
    background-repeat: no-repeat;
    min-width: 1170px;
    padding: 5% 7%;
    padding-bottom: 0px;
    margin-bottom: 5%;
    .nav-wrap {
        overflow: hidden;
        .check-theme-btn-wrap {
            margin-top: 5%;
            margin-left: 10%;
            margin-bottom: 5%;
        }
    }
    .section-wrap {
        padding: 0px 10px;
    }
}
</style>
