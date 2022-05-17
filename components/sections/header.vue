<template>
  <header id="header" class="section-header">
    <div class="container">
      <div class="header-wrapper">
        <div class="header-logo">
          <nuxt-link to="/">
            <img src="/logo.png" alt="logo" />
            <span>PiAiMart</span>
          </nuxt-link>
        </div>
        <ul class="menu">
          <li class="menu-item">
            <nuxt-link to="/">Home</nuxt-link>
          </li>
          <li class="menu-item">
            <nuxt-link to="/products">Products</nuxt-link>
          </li>
          <li class="menu-item">
            <nuxt-link to="/about-us">About Us</nuxt-link>
          </li>
          <li class="menu-item">
            <nuxt-link to="/contact-us">Contact Us</nuxt-link>
          </li>
        </ul>
        <div class="header-right">
          <div class="header-right-item">
            <nuxt-link to="/cart"> <b-icon icon="cart4"></b-icon><span class="cart-quantity">{{shoppingCart.cartItems ? shoppingCart.cartItems.length : 0}}</span></nuxt-link>
          </div>
          <div class="header-right-item">
            <nuxt-link to="/auth/login">
              <b-icon icon="person-circle"></b-icon
            ></nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
    };
  },
  created() {
  },
  mounted() {
    const selectElement = function (element) {
      return document.querySelector(element);
    };
    // On scroll fixed header
    var sticky = header.offsetTop;
    window.onscroll = function () {
      if (window.pageYOffset > sticky) {
        selectElement("#header").classList.add("sticky");
      } else {
        selectElement("#header").classList.remove("sticky");
      }
    };
  },
  computed: {
    ...mapGetters("shopping", ["shoppingCart"]),
  },
  methods: {
  },
};
</script>

<style>
</style>