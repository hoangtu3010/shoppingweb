export default {
  state: () => ({
    shoppingCart: {},
    cartItemsData: [],
  }),
  mutations: {
    SET_SHOPPING_CART: (state, data) => {
      state.shoppingCart = data;
    },
    SET_CART_ITEM_DATA: (state, data) => {
      state.cartItemsData = data;
    }
  },
  actions: {
    sLogin({commit}, data){
      return new Promise((resolve, reject) => {
        return this.$auth.loginWith("local", { data: data })
          .then((res) => {
            return resolve(res);
          })
          .catch((err) => {
            return reject(err);
          });
      });
    },
    sGetPageProduct({ commit }, data) {
      return new Promise((resolve, reject) => {
        return this.$axios
          .get(this.$api.GET_PAGE_PRODUCT, { params: data })
          .then((res) => {
            return resolve(res.data);
          })
          .catch((err) => {
            return reject(err);
          });
      });
    },
    sGetProductById({ commit }, id) {
      return new Promise((resolve, reject) => {
        return this.$axios
          .get(this.$api.GET_PRODUCT_BY_ID + id)
          .then((res) => {
            return resolve(res.data);
          })
          .catch((err) => {
            return reject(err);
          });
      });
    },
    sGetListCategory({ commit }) {
      return new Promise((resolve, reject) => {
        return this.$axios
          .get(this.$api.GET_CATEGORY)
          .then((res) => {
            return resolve(res.data);
          })
          .catch((err) => {
            return reject(err);
          });
      });
    },
    sGetShoppingCart({ state, commit }) {
      return new Promise((resolve, reject) => {
        return this.$axios
          .get(this.$api.GET_SHOPPING_CART)
          .then((res) => {
            res.data.cartItems = _.sortBy(res.data.cartItems, [
              function (o) {
                return o.quantity;
              },
            ]);
            let cartItemsData = [];
            res.data.cartItems.forEach((e) => {
              cartItemsData.push({
                productId: e.id.productId,
                quantity: e.quantity,
                status: e.status,
              });
            });
            commit("SET_SHOPPING_CART", res.data);
            commit("SET_CART_ITEM_DATA", cartItemsData);
            return resolve(res.data);
          })
          .catch((err) => {
            return reject(err);
          });
      });
    },
    sCreateShoppingCart({ commit }, data) {
      return new Promise((resolve, reject) => {
        return this.$axios
          .post(this.$api.GET_SHOPPING_CART, data)
          .then((res) => {
            return resolve(res.data);
          })
          .catch((err) => {
            return reject(err);
          });
      });
    },
    sCreateOrder({ commit }, data) {
      return new Promise((resolve, reject) => {
        return this.$axios
          .post(this.$api.ORDER, data)
          .then((res) => {
            return resolve(res.data);
          })
          .catch((err) => {
            return reject(err);
          });
      });
    },
  },
  getters: {
    shoppingCart: (state) => state.shoppingCart,
    cartItemsData: (state) => state.cartItemsData,
  },
};
