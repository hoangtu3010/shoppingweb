<template>
  <section class="section-product-list">
    <div class="container">
      <div class="row">
        <div class="col-md-3 sidebar-left">
          <h4 style="font-weight: 700">
            <b-icon icon="filter-circle"></b-icon> Filters
          </h4>
          <hr />
          <p class="filter-title">
            <b-icon icon="caret-right-fill"></b-icon> Theo danh mục
          </p>
          <ul class="category-filter">
            <li class="category-filter-item">
              <nuxt-link to="/">Category 1</nuxt-link>
            </li>
            <li class="category-filter-item">
              <nuxt-link to="/">Category 1</nuxt-link>
            </li>
            <li class="category-filter-item">
              <nuxt-link to="/">Category 1</nuxt-link>
            </li>
          </ul>
        </div>
        <div class="col-md-9 content-main">
          <div class="content-tools">
            <div class="content-search">
              <input
                type="text"
                class="form-control"
                @keyup.enter="search"
                v-model="objParams.keyword"
                placeholder="Enter name or category...."
              />
              <b-icon
                icon="search"
                @click="search"
                style="cursor: pointer"
              ></b-icon>
            </div>
            <div class="content-filter">
              <multiselect
                v-model="sortSelected"
                track-by="code"
                label="text"
                placeholder="Giá"
                :options="options"
                :searchable="false"
                :show-labels="false"
                show-no-results
              >
              </multiselect>
            </div>
          </div>
          <div class="row">
            <div
              v-for="product in listProduct"
              :key="product.id"
              class="col-md-4 mb-4"
            >
              <div class="content-item">
                <div class="image-content">
                  <div class="content-icon cart-plus-icon">
                    <a href="javascript:;">
                      <b-icon
                        @click="addToCart(product.id)"
                        icon="cart-plus"
                      ></b-icon>
                    </a>
                  </div>
                  <nuxt-link :to="'/products' + product.slug">
                    <img :src="product.thumbnail" alt="" />
                  </nuxt-link>
                </div>
                <div class="content-tag">
                  <span>{{ product.category.name }}</span>
                </div>
                <div class="info-content">
                  <p class="text-center">
                    <nuxt-link :to="'/products' + product.slug">{{
                      product.name
                    }}</nuxt-link>
                  </p>
                  <b>{{ formatDollar(product.price) }}</b>
                </div>
              </div>
            </div>
          </div>
          <div class="pagination-section" v-if="pagingData.totalPages > 1">
            <div class="pagination-wrapper">
              <div class="pagination">
                <button
                  @click="changeIndex('pre')"
                  class="btn prev page-numbers"
                  :class="objParams.pageIndex === 1 ? 'disabled' : ''"
                  :disabled="objParams.pageIndex === 1"
                >
                  prev
                </button>
                <span
                  v-for="number in this.pagingData.totalPages"
                  :key="number"
                  @click="changeIndex('press', number)"
                  class="page-numbers"
                  :class="objParams.pageIndex === number ? 'current' : ''"
                  >{{ number }}</span
                >
                <button
                  @click="changeIndex('next')"
                  class="btn next page-numbers"
                  :class="
                    objParams.pageIndex === pagingData.totalPages
                      ? 'disabled'
                      : ''
                  "
                  :disabled="objParams.pageIndex === pagingData.totalPages"
                >
                  next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      listProduct: [],
      createShoppingCartData: {
        userId: "",
        cartItemDTOSet: [],
      },
      pagingData: {
        totalPages: 0,
        totalElements: 0,
        numberOfElements: 0,
      },
      objParams: {
        pageIndex: 1,
        pageSize: 2,
      },
      sortSelected: null,
      options: [
        { code: "ASC", text: "Từ thấp đến cao" },
        { code: "DESC", text: "Từ cao đến thấp" },
      ],
    };
  },
  created() {
    this.getPageProduct();
    this.getShoppingCart();
  },
  watch: {
    sortSelected(val) {
      this.objParams.sort = "";
      if (val) {
        this.objParams.sort = val.code;
      }
      this.getPageProduct();
    },
  },
  computed: {
    ...mapGetters("shopping", ["userId", "shoppingCart", "cartItemsData"]),
  },
  methods: {
    getPageProduct() {
      this.$store
        .dispatch("shopping/sGetPageProduct", this.objParams)
        .then((res) => {
          this.listProduct = res.content;
          this.pagingData.totalPages = res.totalPages;
          this.pagingData.totalElements = res.totalElements;
          this.pagingData.numberOfElements = res.numberOfElements;
        });
    },
    search() {
      this.objParams.pageIndex = 1;
      this.getPageProduct();
    },
    changeIndex(action, index) {
      if (action === "pre") {
        if (this.objParams.pageIndex > 0) {
          this.objParams.pageIndex--;
        }
      } else if (action === "next") {
        if (this.objParams.pageIndex < this.pagingData.totalPages) {
          this.objParams.pageIndex++;
        }
      } else {
        this.objParams.pageIndex = index;
      }
      this.getPageProduct();
    },
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
    addToCart(productId) {
      let findProductFromCart = this.createShoppingCartData.cartItemDTOSet.find(
        (x) => x.productId === productId
      );

      if (findProductFromCart) {
        findProductFromCart.quantity++;
      } else {
        this.createShoppingCartData.cartItemDTOSet.push({
          productId: productId,
          quantity: 1,
        });
      }
      this.createShoppingCart();
    },
  },
};
</script>

<style scoped>
.section-product-list {
  padding: 20px 0;
}

.sidebar-left {
  height: 100vh;
  border-radius: 10px;
}

.filter-title {
  color: #000;
  font-size: 18px;
}

.category-filter .category-filter-item {
  list-style: none;
  padding-left: 25px;
  margin-bottom: 15px;
}

.category-filter .category-filter-item a {
  text-decoration: none;
  color: #6f6c6c;
  transition: 0.2s;
}

.category-filter .category-filter-item a:hover {
  color: #41adde;
}

.content-main .content-tools {
  background: #fff;
  margin-bottom: 20px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
}

.content-main .content-tools .content-search {
  position: relative;
}

.content-main .content-tools .content-search input {
  border-radius: 20px;
  min-width: 300px;
}

.content-main .content-tools .content-search input:focus {
  box-shadow: none;
  outline: none;
  border-color: #0099cc;
}

.content-main .content-tools .content-search svg {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
}

.content-main .content-tools .content-filter {
  min-width: 200px;
}

.content-main .content-item {
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
}

.content-main .content-item .image-content {
  position: relative;
  height: 200px;
}

.content-main .content-item .content-tag {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1;
  background: #0099cc;
  color: #fff;
  padding: 0 5px;
  border-top-left-radius: 5px;
}

.content-main .content-item .image-content .content-icon svg {
  font-size: 1.8rem;
  color: #000;
}

.content-main .content-item .image-content .cart-plus-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -100px);
  transition: 0.3s;
  opacity: 0;
  background: #fff;
  padding: 5px;
  border-radius: 5px;
}

.content-main .content-item .image-content .cart-plus-icon svg {
  color: #000;
  transition: 0.2s;
}

.content-main .content-item .image-content .cart-plus-icon:hover {
  background: #0099cc;
}

.content-main .content-item .image-content .cart-plus-icon:hover svg {
  color: #fff;
}

.content-main .content-item:hover .image-content .cart-plus-icon {
  transform: translate(-50%, -50%);
  opacity: 0.85;
}

.content-main .content-item .image-content img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-size: cover;
  transition: 0.2s;
}

.content-main .content-item:hover .image-content img {
  filter: blur(1px);
  -webkit-filter: blur(1px);
}

.content-main .content-item .info-content {
  padding: 5px;
}

.content-main .content-item .info-content a {
  font-size: 1.2rem;
  color: #000;
  text-decoration: none;
  transition: 0.2s;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
}

.content-main .content-item .info-content a:hover {
  color: #0099cc;
}

/* PAGINATION */
.pagination-wrapper {
  text-align: center;
  margin: 20px 0;
}

.pagination {
  display: inline-block;
  padding: 0 25px;
  border-radius: 35px;
  background-color: #fff;
}

.page-numbers {
  display: block;
  padding: 5px 25px;
  float: left;
  transition: 0.3s;
  color: #919191;
  letter-spacing: 0.1em;
  cursor: pointer;
}

.page-numbers:hover {
  background-color: #41adde;
  color: #fff;
}

.page-numbers.current {
  background-color: #41adde;
  color: #fff;
}

.page-numbers.prev.disabled,
.next.disabled {
  cursor: default;
}

.page-numbers.prev.disabled:hover,
.next.disabled:hover {
  color: #919191;
}

.page-numbers.prev:hover,
.next:hover {
  background-color: transparent;
  color: #41adde;
}
/* END PAGINATION */
</style>