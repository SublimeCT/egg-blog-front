<template>
    <div id="Login">
        <form action="/api/login" method="post" @submit="login" autocomplete="off">
            <label for="username">
                <div class="fieldName">Username</div>
                <input type="text" id="username" name="username" v-model.trim="username" tabindex="1">
            </label>
            <label for="password">
                <div class="fieldName">Password</div>
                <input type="password" id="password" name="password" v-model.trim="password" tabindex="2">
            </label>
            <label class="button-box">
                <button tabindex="3">Login</button>
            </label>
        </form>
    </div>
</template>

<script>
import { minLength, required } from 'vuelidate/lib/validators'
import requester from '@/utils/request'
import { API } from '@/config/base'
import axios from 'axios'

const vagueProperties = [
    '-webkit-filter',
    '-moz-filter',
    '-o-filter',
    '-ms-filter',
    'filter'
]

export default {
    validations: {
        username: {
            required,
            minLength: minLength(4)
        },
        password: {
            required,
            minLength: minLength(6)
        }
    },
    data () {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login (event) {
            if (this.$v.username.$invalid || this.$v.password.$invalid) {
                this.addVague()
            } else {
                // this.disableSubmit()
                this.sendLogin()
            }
            event.preventDefault()
        },
        addVague () {
            const num = Math.floor(Math.random() * 7 + 1)
            vagueProperties.forEach(property => {
                document.body.style[property] = `blur(${num}px)`
            })
        },
        sendLogin () {
            const {username, password} = this
            requester.getCsrfCookie(this.$cookie).then(token => {
                axios.request({
                    method: 'POST',
                    baseURL: API.prefix,
                    url: '/login',
                    data: {username, password},
                    headers: {'X-CSRF-TOKEN': token}
                }).then(res => {
                    if (res.data.code === '0') {
                        this.$router.push({ path: '/backend' })
                    } else {
                        alert(res.data.message)
                    }
                })
            })
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
    pre {
        color: red;
        float: left;
    }
}
</style>
