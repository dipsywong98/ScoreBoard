<template>
    <div id="app">
        <router-view class="view"/>
        <div id="nav">
            <router-link to="/">Scoreboard</router-link>
            |
            <router-link to="/about">About</router-link>
        </div>
    </div>
</template>

<style lang="scss">
    html, body {
        margin:0;
        padding:0;
        position: absolute;
        min-height: 100vh;
        width: 100vw;

        --red: #bd292e;
        --gray: #2c3e50;
    }

    * {
        box-sizing: border-box;
    }

    h1, h2, h3, h4, h5, h6 {
        margin:0;
    }

    @font-face {
        font-family: 'High School USA';
        src: url('./assets/high_school_usa_sans-webfont.woff2') format('woff2'),
        url('./assets/high_school_usa_sans-webfont.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }

    #app {
        font-family: 'High School USA', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: var(--gray);
        position: absolute;
        height: 100%;
        width: 100%;

        > .view, > .view > * {
            position: absolute;
            height: 100%;
            width: 100%;
        }
    }

    #nav {
        position: absolute;
        opacity: 0;
        visibility: hidden;
        background-color: #fff;
        border-radius: 1rem;
        box-shadow: 0 0.5vh 1vh rgba(0, 0, 0, 0.3);
        top:0;
        left:0;
        padding: 30px;
        a {
            font-weight: bold;
            color: #2c3e50;
            &.router-link-exact-active {
                color: var(--red);
            }
        }
    }
</style>
