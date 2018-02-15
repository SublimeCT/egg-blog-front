<template>
    <div id="Login">
        <form action="/api/login" method="post" @submit="login">
            <label for="username">
                <div class="fieldName">Username</div>
                <input type="text" id="username" name="username" :value="username" tabindex="1">
            </label>
            <label for="password">
                <div class="fieldName">Password</div>
                <input type="password" id="password" name="password" :value="username" tabindex="2">
            </label>
            <label class="button-box">
                <button tabindex="3">Login</button>
            </label>
        </form>
    </div>
</template>

<script>
export default {
    data () {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login (event) {
            console.log('=> login')
            event.preventDefault()
        }
    }
}
</script>

<style lang="scss" scoped>
@mixin opacitySet () {
    opacity: 0.4;
    &:focus {
        opacity: 0.66;
    }
    outline: none;
}
#Login {
    form {
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;        
        margin: 150px auto;
        max-width: 450px;
        label {
            display: block;
            margin-bottom: 30px;
            .fieldName {
                letter-spacing: 1px;                
                margin-left: 20px;
                font-size: 18px;
                padding-bottom: 10px;
                color: white;
                text-shadow: 1px 1px 2px #F9D, 0 0 3em #222, 0 0 0.2em #0D3;
            }
            input {
                @include opacitySet;
                font-size: 16px;
                border-radius: 18px;
                letter-spacing: 1px;
                padding-left: 23px;
                padding-right: 23px;
                width: 360px;
                box-shadow: none;
                height: 33px;
                border-style: none;
            }
        }
        .button-box {
            margin-top: 45px;
            width: 400px;
            text-align: center;
            button {
                @include opacitySet;                
                opacity: 0.4;
                width: 150px;
                height: 35px;
                margin: 0 auto;
                font-size: 18px;
                border-radius: 15px;
                padding: 5px;
                border-style: none;
            }
        }
    }
}
</style>
