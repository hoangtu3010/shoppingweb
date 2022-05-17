<template>
  <section class="product-detail-section">
    <sections-breadcrumb :data="breadCrumbData" />
    <div class="product-info mt-4">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="product-thumbnails">
              <swiper
                class="swiper gallery-top"
                :options="swiperOptionTop"
                ref="swiperTop"
              >
                <swiper-slide v-for="item in 5" :key="item" class="slide-1"
                  ><img :src="detailProduct.thumbnail" alt=""
                /></swiper-slide>
              </swiper>
              <!-- swiper2 Thumbs -->
              <swiper
                class="swiper gallery-thumbs"
                :options="swiperOptionThumbs"
                ref="swiperThumbs"
              >
                <swiper-slide v-for="item in 5" :key="item" class="slide-1"
                  ><img :src="detailProduct.thumbnail" alt=""
                /></swiper-slide>
              </swiper>
            </div>
          </div>
          <div class="col-md-6">
            <div class="product-content-detail">
              <template v-if="detailProduct.name">
                <h5 class="product-title">{{ detailProduct.name }}</h5>
                <div class="product-reviewer">
                  <p class="product-category">
                    {{ detailProduct.category.name }}
                  </p>
                  <p class="product-status">
                    Availability
                    <span>{{ detailProduct.status }}</span>
                  </p>
                </div>
                <p class="product-price">
                  {{ formatDollar(detailProduct.price) }}
                </p>
                <p class="product-description">
                  {{ detailProduct.description }}
                </p>

                <div class="product-quantity">
                  <b-icon
                    @click="
                      cartItemInfo.quantity > 0 ? cartItemInfo.quantity-- : 0
                    "
                    class="dash-icon"
                    icon="dash-circle"
                  ></b-icon>
                  <b-icon
                    @click="cartItemInfo.quantity++"
                    class="plus-icon"
                    icon="plus-circle"
                  ></b-icon>
                  <input
                    v-model="cartItemInfo.quantity"
                    type="number"
                    class="form-control"
                    placeholder="Quantity"
                  />
                </div>
                <button class="btn btn-add-to-cart" @click="addToCart">
                  <b-icon icon="cart-plus"></b-icon> Add To Cart
                </button>
                <div class="share-social d-flex">
                  <span>Share</span>
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
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="product-relationship"></div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      detailProduct: {},
      createShoppingCartData: {
        userId: "",
        cartItemDTOSet: [],
      },
      cartItemInfo: {
        productId: "",
        quantity: 1,
      },
      breadCrumbData: {
        name: "Product Details",
        parentName: "Products",
        parentPath: "/products",
        childName: "",
        childPath: "",
      },
      swiperOptionTop: {
        loop: true,
        loopedSlides: 5, // looped slides should be the same
        spaceBetween: 10,
      },
      swiperOptionThumbs: {
        loop: true,
        loopedSlides: 5, // looped slides should be the same
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 3,
        touchRatio: 0.1,
        slideToClickedSlide: true,
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.$swiper;
      const swiperThumbs = this.$refs.swiperThumbs.$swiper;
      swiperTop.controller.control = swiperThumbs;
      swiperThumbs.controller.control = swiperTop;
    });
  },
  created() {
    this.getProductById();
    this.getShoppingCart();
  },
  computed: {
    ...mapGetters("shopping", ["userId", "shoppingCart", "cartItemsData"]),
  },
  methods: {
    getShoppingCart() {
      this.$store.dispatch("shopping/sGetShoppingCartByUserId").then(() => {
        this.createShoppingCartData.userId = this.userId
        this.createShoppingCartData.cartItemDTOSet = this._.cloneDeep(
          this.cartItemsData
        );
      });
    },
    createShoppingCart() {
      this.$store
        .dispatch("shopping/sCreateShoppingCart", this.createShoppingCartData)
        .then(() => {
          this.$toast.success("Add To Cart Success!!!");
          this.getShoppingCart()
        });
    },
    getProductById() {
      this.$store
        .dispatch("shopping/sGetProductById", this.$route.params.id)
        .then((res) => {
          this.detailProduct = res;
          this.cartItemInfo.productId = res.id;
          this.breadCrumbData.childName = this.detailProduct.name;
          this.breadCrumbData.childPath = this.detailProduct.slug;
        });
    },
    addToCart() {
      if (this.cartItemInfo.quantity > 0) {
        let findCartItem = this.createShoppingCartData.cartItemDTOSet.find(
          (o) => o.productId === this.cartItemInfo.productId
        );

        if (!findCartItem) {
          let cartItem = { ...this.cartItemInfo };
          this.createShoppingCartData.cartItemDTOSet.push(cartItem);
        } else {
          findCartItem.quantity += this.cartItemInfo.quantity;
        }

        this.createShoppingCart();
      } else {
        this.$toast.error("Quantity needs to be greater than 0 !!!");
      }
    },
  },
};
</script>

<style scoped>
.thumb-example {
  height: 480px;
  background-color: #000;
}

.swiper .swiper-slide {
  background-size: cover;
  background-position: center;
}

.swiper.gallery-top {
  height: 80%;
  width: 100%;
}

.swiper.gallery-thumbs {
  height: 20%;
  box-sizing: border-box;
  padding: 10px 0;
}

.swiper.gallery-thumbs .swiper-slide {
  width: 25%;
  height: 100%;
  opacity: 0.4;
}

.swiper.gallery-thumbs .swiper-slide-active {
  opacity: 1;
}

.product-detail-section {
  padding: 20px 0;
}

.product-info .product-thumbnails {
  height: 487px;
}

.product-info .product-thumbnails img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-size: cover;
  border-radius: 10px;
}

.product-info .product-content-detail {
  background: #fff;
  padding: 20px 25px;
  border-radius: 10px;
}

.product-content-detail .product-title {
  font-weight: 700;
  font-size: 2rem;
}

.product-content-detail .product-reviewer {
  display: flex;
  justify-content: space-between;
}

.product-content-detail .product-reviewer .product-category {
  color: #919191;
}

.product-content-detail .product-reviewer .product-status span {
  background: #0099cc;
  color: #fff;
  border-radius: 10px;
  padding: 3px 10px;
}

.product-content-detail .product-price {
  font-size: 2.5rem;
  color: #6d40be;
}

.product-content-detail .product-description {
  color: #919191;
}

.product-content-detail .btn-add-to-cart {
  border: 1px solid #0099cc;
  border-radius: 10px;
  color: #0099cc;
  transition: 0.3s;
}

.product-content-detail .btn-add-to-cart:hover {
  background-color: #0099cc;
  color: #fff;
}

.product-content-detail .share-social {
  margin: 20px 0;
  align-content: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.product-content-detail .share-social span {
  font-weight: 700;
  text-transform: uppercase;
}
</style>