export default {
  state: () => ({}),
  mutations: {},
  actions: {
    sGetPageProduct({ commit }, data) {
      return new Promise((resolve, reject) => {
        return this.$axios
          .get(this.$api.GET_PAGE_PRODUCT, {params: data})
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
    sGetShoppingCartByUserId({ commit }, id) {
      return new Promise((resolve, reject) => {
        return this.$axios
          .get(this.$api.GET_SHOPPING_CART, {params: {userId: id}})
          .then((res) => {
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

  },
  getters: {},
};
