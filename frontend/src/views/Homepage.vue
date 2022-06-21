<template>
  <div class="w3-container">
    <p>
      <router-link to="/login"><button class="w3-btn w3-white w3-border w3-border-red w3-round-large w3-xxxlarge">Connexion</button></router-link>
    </p>
    <p>
      <router-link to="/register"><button class="w3-btn w3-white w3-border w3-border-red w3-round-large w3-xxxlarge">
        Inscription</button></router-link>
    </p>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Homepage"
}
</script>

<style scoped>
.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
}

</style>
