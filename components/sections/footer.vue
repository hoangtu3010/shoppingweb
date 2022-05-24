<template>
  <footer>
    <div class="container">
      <div class="subscribe">
        <div class="subscribe-title text-center">
          <h2>Subscribe to Our Newsletter</h2>
          <p>
            A Private Limited is the most popular type of partnership Malta. The
            limited liability <br />
            is, in fact, the only type of company allowed by Companies.
          </p>
        </div>
        <div class="subscribe-form">
          <form action="#" method="post">
            <div class="left-content clearfix">
              <b-icon icon="envelope"></b-icon>
              <span class="form-control-wrap"
                ><input
                  type="email"
                  value=""
                  size="40"
                  class="form-control form-control-custom"
                  placeholder="example@mail.com"
              /></span>
            </div>
            <div class="right-content">
              <button type="submit">
                <b-icon icon="reply"></b-icon> <span>Subscribe Now</span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="widget">
        <div class="row">
          <div class="col-sm-6 col-md-5 col-lg-5">
            <div class="about-widget">
              <nuxt-link to="/"><img src="/logo.png" alt="logo" /> <span>PiAiMart</span></nuxt-link>
              <p>
                PiAiMart is the most exclusive store and entertainment center. Located in an area that is best known for its high-end stores and restaurants.
              </p>
              <ul class="social">
                <li class="social-item">
                  <nuxt-link to="/">
                    <b-icon icon="facebook"></b-icon>
                  </nuxt-link>
                </li>
                <li class="social-item">
                  <nuxt-link to="/">
                    <b-icon icon="twitter"></b-icon>
                  </nuxt-link>
                </li>
                <li class="social-item">
                  <nuxt-link to="/">
                    <b-icon icon="google"></b-icon>
                  </nuxt-link>
                </li>
                <li class="social-item">
                  <nuxt-link to="/">
                    <b-icon icon="instagram"></b-icon>
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-sm-6 col-md-3 col-lg-3">
            <div class="menu-widget">
              <div class="title">
                <h3>Quick Links</h3>
              </div>
              <ul>
                <li>
                  <nuxt-link to="/">Home</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/about-us">About Us</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/contact-us">Contact Us</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/privacy-policy">Privacy Policy</nuxt-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-sm-12 col-md-4 col-lg-4">
            <div class="contact-widget">
              <div class="title">
                <h3>Contact</h3>
              </div>
              <div class="contact-detail">
                <p><span>Phone:</span> +84 999-999-999</p>
                <p><span>Email:</span> dTeUv@mail.com</p>
                <p>
                  <span>Address:</span> 8 Tôn Thất Thuyết, Hà Nội
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-copyright">
        <div class="float-left left-content">
          <p>© 2022 by dTeUv</p>
        </div>
        <div class="float-right right-content">
          <p>All Right Reserved</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {

}
</script>

<style>

</style>