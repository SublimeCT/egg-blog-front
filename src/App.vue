<template>
    <div id="App">
        <router-view/>
    </div>
</template>

<script>
const backgroundImage = {
    _src: null,
    _srcMax: 800,
    _timeout: 1500,
    _defaultColor: '#C7EDCC',
    _loadCallback () {},
    _excludeCondition () {
        return location.pathname.indexOf('/backend') === 0
    },
    get src () {
        const num = Math.floor(Math.random() * this._srcMax + 1)
        return `https://ss3.bdstatic.com/lPoZeXSm1A5BphGlnYG/skin/${num}.jpg`
    },
    getImage () {
        if (this._checkCondition()) return
        const img = new Image()
        img.src = this.src
        img.onload = () => {
            // 加载完成后记录 src
            this._src = `url("${img.src}")` // 标记为已加载
            this._loadCallback()
        }
    },
    setImage (dom) {
        if (this._checkCondition()) return
        if (this._src) {
            dom.style.backgroundImage = this._src
        } else {
            this._loadCallback = () => {
                dom.style.backgroundImage = this._src                
            }
            setTimeout(() => {
                if (dom.style.backgroundImage) return
                console.error('背景图请求超时, 使用背景色' + this._defaultColor)
                dom.style.backgroundColor = this._defaultColor
                this._loadCallback = () => {}
            }, this._timeout)
        }
    },
    _checkCondition () {
        return this._excludeCondition()
    }
}
backgroundImage.getImage()
export default {
    name: 'App',
    mounted () {
        backgroundImage.setImage(document.body)
    }
}
</script>

<style lang="scss">
@import 'assets/style/global.scss';
</style>
