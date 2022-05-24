<template>
  <section class="cart-section">
    <sections-breadcrumb :data="breadCrumbData" />
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-8">
          <table class="table cart-detail">
            <thead>
              <tr>
                <th>Product</th>
                <th></th>
                <th></th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in shoppingCart.cartItems"
                :key="index"
                class="cart-item"
              >
                <td>
                  <img
                    :src="item.productThumbnail"
                    width="80"
                    alt=""
                    style="border-radius: 10px"
                  />
                </td>
                <td>
                  <span class="cart-item-name">{{ item.productName }}</span>
                </td>
                <td>
                  <span class="cart-item-price">{{
                    formatDollar(item.unitPrice)
                  }}</span>
                </td>
                <td>
                  <div class="product-quantity">
                    <b-icon
                      @click="changeQuantity(item.id.productId, 'minus')"
                      class="dash-icon"
                      icon="dash-circle"
                    ></b-icon>
                    <b-icon
                      @click="changeQuantity(item.id.productId, 'plus')"
                      class="plus-icon"
                      icon="plus-circle"
                    ></b-icon>
                    <input
                      min="0"
                      type="number"
                      v-model="
                        cartItemsData.find(
                          (x) => x.productId === item.id.productId
                        ).quantity
                      "
                      @keyup.enter="createShoppingCart"
                      class="form-control"
                      placeholder="Quantity"
                    />
                  </div>
                </td>
                <td>{{ formatDollar(item.quantity * item.unitPrice) }}</td>
                <td>
                  <b-icon
                    @click="removeFromCart(item.id.productId)"
                    class="cart-item-icon"
                    icon="trash"
                  ></b-icon>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-md-4">
          <div class="checkout-info">
            <h5 class="checkout-title">Cart Totals</h5>
            <div>
              <span>Sub total</span>
              <span>{{ formatDollar(shoppingCart.totalPrice) }}</span>
            </div>
            <div>
              <span>Shipping Fee</span> <span>{{ formatDollar(0) }}</span>
            </div>
            <div>
              <span>Total</span
              ><span class="checkout-total">{{
                formatDollar(shoppingCart.totalPrice)
              }}</span>
            </div>
            <nuxt-link to="/checkout" class="btn checkout-btn"
              >Proceed To Checkout <b-icon icon="arrow-right"></b-icon
            ></nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  // middleware: 'auth',
  data() {
    return {
      createShoppingCartData: {
        cartItemDTOSet: [],
      },
      breadCrumbData: {
        name: "Shopping Cart",
        parentName: "Shopping Cart",
        parentPath: "/cart",
        childName: "",
        childPath: "",
      },
    };
  },
  created() {
    this.getShoppingCart();
  },
  computed: {
    ...mapGetters("shopping", ["shoppingCart", "cartItemsData"]),
  },
  methods: {
    getShoppingCart() {
      this.$store.dispatch("shopping/sGetShoppingCart").then(() => {
        this.createShoppingCartData.cartItemDTOSet = this._.cloneDeep(
          this.cartItemsData
        );
      });
    },
    createShoppingCart() {
      this.$store
        .dispatch("shopping/sCreateShoppingCart", this.createShoppingCartData)
        .then(() => {
          this.$toast.success("Update Success!!!");
          this.getShoppingCart();
        });
    },
    removeFromCart(productId) {
      let findProduct = this.createShoppingCartData.cartItemDTOSet.find(
        (x) => x.productId === productId
      );

      if (findProduct) {
        if (confirm("Do you want remove this product ?")) {
          findProduct.quantity = 0;
          this.createShoppingCart();
        }
      }
    },
    changeQuantity(productId, action) {
      let findProduct = this.createShoppingCartData.cartItemDTOSet.find(
        (x) => x.productId === productId
      );

      if (action === "minus") {
        if (findProduct.quantity > 1) {
          findProduct.quantity--;
          this.createShoppingCart();
        } else if (findProduct.quantity === 1) {
          if (confirm("Do you want remove this product ?")) {
            findProduct.quantity--;
            this.createShoppingCart();
          }
        }
      } else {
        findProduct.quantity++;
        this.createShoppingCart();
      }
    },
  },
};
</script>

<style scoped>
.cart-section {
  padding: 20px 0;
}

.cart-detail th {
  border-top: none;
}

.cart-detail td {
  border-top: none;
  vertical-align: middle;
}

.cart-detail .cart-item td span {
  margin-left: 20px;
}

.cart-detail .cart-item .cart-item-icon {
  color: #919191;
  cursor: pointer;
}

.checkout-info {
  background: #fff;
  padding: 20px 25px;
  border-radius: 20px;
}

.checkout-info .checkout-title {
  font-weight: 700;
  margin-bottom: 25px;
}

.checkout-info div {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
}

.checkout-info div .checkout-total {
  color: #6d40be;
  font-size: 2rem;
}

.checkout-info .checkout-btn {
  background: #0099cc;
  border-radius: 20px;
  color: #fff;
  width: 100%;
  transition: 0.3s;
  margin: 20px 0;
}

.checkout-info .checkout-btn:hover {
  background: #046b8d;
}

.checkout-info .checkout-btn:hover svg {
  transition: 0.3s;
}

.checkout-info .checkout-btn:hover svg {
  transform: translateX(10px);
}
</style>