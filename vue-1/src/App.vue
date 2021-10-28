<template>
  <div id="nav">
    <router-link to="/"><el-button type="primary" class="nav-link">Settings</el-button></router-link>
    <router-link to="/game"><el-button type="primary" class="nav-link">Game</el-button></router-link>
  </div>
  <div class="app">
    <router-view/>
  </div>
</template>

<style lang="less">
* {
  box-sizing: border-box;
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app {
  border-top: 1px solid #afafaf;
  margin: 0px auto;
  padding-top: 40px;
  max-width: 600px;
}

#nav {
  padding: 30px;
  text-align: center;

  a {
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
      opacity: .8;
    }
  }
}

.nav-link {
  min-width: 90px;
  margin: 0 10px;
}
</style>
