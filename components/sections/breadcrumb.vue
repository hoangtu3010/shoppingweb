<template>
  <section class="breadcrumb-section">
    <h1>{{data.name}}</h1>
    <div class="breadcrumb-list">
      <nuxt-link to="/">Home</nuxt-link>
      <nuxt-link :to="data.parentPath">{{data.parentName}}</nuxt-link>
      <nuxt-link v-if="data.childName" :to="data.parentPath + data.childPath">{{
        data.childName
      }}</nuxt-link>
    </div>
  </section>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: () => {return {}}
        }
    },
    data(){
        return{}
    }
};
</script>

<style scoped>
.breadcrumb-section {
  background-image: url("/breadcrumb-img.webp");
  text-align: center;
  padding: 100px 0;
}

.breadcrumb-section a {
  color: #000;
  text-decoration: none;
  transition: 0.2s;
}

.breadcrumb-section a:hover {
  color: #0099cc;
}

.breadcrumb-section a::after {
  content: " /";
  color: #000;
}

.breadcrumb-section a:last-child::after {
  content: none;
}
</style>