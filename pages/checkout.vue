<template>
  <section class="checkout-section">
    <sections-breadcrumb :data="breadCrumbData" />
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-8">
          <div class="billing-detail">
            <h5>Billing details</h5>
            <hr />
            <div class="billing-form">
              <div class="d-flex">
                <b-form-group
                  label="Your Name"
                  class="mb-2 mr-sm-2 mb-sm-0 w-100"
                >
                  <b-form-input
                    type="text"
                    placeholder="Enter name"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group label="Your Phone" class="mb-2 w-100">
                  <b-form-input
                    type="text"
                    placeholder="Enter phone"
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
              <b-form-group label="Your Address" class="mb-2 mt-3 w-100">
                <b-form-input
                  type="text"
                  placeholder="Enter address"
                  required
                ></b-form-input>
              </b-form-group>
              
              <b-form-group label="Note" class="mb-2 mt-3 w-100">
               <b-form-textarea placeholder="Note..." rows="6"></b-form-textarea>
              </b-form-group>
              
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="checkout-info">
            <h5 class="checkout-title">Your Order</h5>
            <div>
              <span>Product 1</span> <span>{{ formatDollar(158) }}</span>
            </div>
            <div>
              <span>Product 2</span> <span>{{ formatDollar(20) }}</span>
            </div>
            <div>
              <span>Total</span
              ><span class="checkout-total">{{ formatDollar(178) }}</span>
            </div>
            <button class="btn checkout-btn">
              Place Order <b-icon icon="arrow-right"></b-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      breadCrumbData: {
        name: "Checkout",
        parentName: "Checkout",
        parentPath: "/checkout",
        childName: "",
        childPath: "",
      },
    };
  },
  methods: {
    removeFromCart() {
      this.$toast.error("Do you want remove ?");
    },
    minusQuantity() {},
    plusQuantity() {},
  },
};
</script>

<style scoped>
.checkout-section {
  padding: 20px 0;
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

.billing-form input {
  border-radius: 15px;
}

.billing-form input:focus {
  box-shadow: none;
}

.billing-form textarea {
  border-radius: 15px;
}
.billing-form textarea:focus {
  box-shadow: none;
}
</style>