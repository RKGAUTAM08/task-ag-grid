<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          Tag Wise Price Drop Form
        </slot>
        <button
          type="button"
          class="btn-close"
          @click="close"
        >
          x
        </button>
      </header>

      <section class="modal-body">
        <slot name="body">
          <form>
              <div class="input-cont">
                <label for="id">Id</label>
                <input type="text" id="id" class="input-ele" v-model="formdata.id">
              </div>
              <div class="input-cont">
                <label for="tag">Tag</label>
                <input type="text" id="tag" class="input-ele" v-model="formdata.tag">
              </div>
              <div class="input-cont">
                <label for="catalogue-name">Catalogue Name</label>
                <input type="text" id="catalogue-name" class="input-ele" v-model="formdata.catalogueName">
              </div>
              <div class="input-cont">
                <label for="sku_id">SKU ID</label>
                <input type="text" id="sku_id" class="input-ele" v-model="formdata.skuId">
              </div>
              <div class="input-cont">
                <label for="deal_price">Deal Price</label>
                <input type="text" id="deal_price" class="input-ele" v-model="formdata.dealPrice">
              </div>
              <div class="input-cont">
                <label for="moq">MOQ</label>
                <input type="text" id="moq" class="input-ele" v-model="formdata.moq">
              </div>
              <div class="input-cont">
                <label for="commission_percent">Commission Percent</label>
                <input type="text" id="commission_percent" class="input-ele" v-model="formdata.commissionPercent">
              </div>
              <div class="input-cont">
                <label for="campaign_name">Campaign Name</label>
                <input type="text" id="campaign_name" class="input-ele" v-model="formdata.campaignName">
              </div>
              <div class="input-cont">
                <label for="campaign_type">Campaign Type</label>
                <input type="text" id="campaign_type" class="input-ele" v-model="formdata.campaignType">
              </div>
              <div class="input-cont">
                <label for="campaign_description">Campaign Description</label>
                <input type="text" id="campaign_description" class="input-ele" v-model="formdata.campaignDescription">
              </div>
              <div class="input-cont">
                <label for="coupon_code">Coupon Code</label>
                <input type="text" id="coupon_code" class="input-ele" v-model="formdata.couponCode">
              </div>
              <div class="input-cont">
                <label for="is_active">Is Active</label>
                <input type="text" id="is_active" class="input-ele" v-model="formdata.isActive">
              </div>
              <div class="input-cont">
                <label for="start_time">Start Time</label>
                <input type="text" id="start_time" class="input-ele" v-model="formdata.startTime">
              </div>
              <div class="input-cont">
                <label for="end_time">End Time</label>
                <input type="text" id="end_time" class="input-ele" v-model="formdata.endTime">
              </div>
              <div class="input-cont">
                <label for="priority">Priority</label>
                <input type="text" id="priority" class="input-ele" v-model="formdata.priority">
              </div>
              <div class="input-cont">
                <label for="created_at">Created at</label>
                <input type="text" id="created_at" class="input-ele" v-model="formdata.createdAt">
              </div>
              <div class="input-cont">
                <label for="min_cart_value">Minimum Cart Value</label>
                <input type="text" id="min_cart_value" class="input-ele" v-model="formdata.minCartValue">
              </div>
              <div class="input-cont">
                <label for="clubbing_key">Clubbing Key</label>
                <input type="text" id="clubbing_key" class="input-ele" v-model="formdata.clubbingKey">
              </div>
              <div class="input-cont">
                <label for="use_case_filter">Use Case Filter</label>
                <input type="text" id="use_case_filter" class="input-ele" v-model="formdata.useCaseFilter">
              </div>
              <div class="input-cont">
                <label for="disallowed">Disallowed</label>
                <input type="text" id="disallowed" class="input-ele" v-model="formdata.disallowed">
              </div>
              <div class="modal-buttons">
                  <div>
                      <button @click="onSubmit(formdata)" class="btn-green">Submit</button>
                  </div>
                  <div>
                      <button
                        type="button"
                        class="btn-green"
                        @click="close"
                        >
                        Close Modal
                      </button>
                  </div>
              </div>
          </form>
        </slot>
       </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
  export default {
    name: 'Modal',
    data(){
      return{
        formdata:{
          id:"",
          tag:"",
          catalogueName:"",
          skuId:"",
          dealPrice:"",
          moq:"",
          commissionPercent:"",
          campaignName:"",
          campaignType:"",
          campaignDescription:"",
          couponCode:"",
          isActive:"",
          startTime:"",
          endTime:"",
          priority:"",
          createdAt:"",
          minCartValue:"",
          clubbingKey:"",
          useCaseFilter:"",
          disallowed:"",
        },
      }
    },
    methods: {
      close() {
        this.$emit('close');
      },
      onSubmit(data){
        axios.post('http://localhost:3000/add',data)
        .then((res)=>{
          console.log(res.data)
          this.fun();
        })
      },
    },
  };
</script>

<style>
  .modal-backdrop {
    position: fixed;
    left:25%;
    right: 25%;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-x:auto;
  }

  .modal {
    position: fixed;
    left:25%;
    right: 25%;
    top:20px;
    bottom: 20px;
    overflow-y: auto;
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    padding: 20px;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: center;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    width: 100px;
    height: 30px;
    border-radius: 2px;
  }
  
  .input-cont{
      display: flex;
      justify-content: space-between;
      margin: 20px;
  }

  .input-ele{
      width: 50%;
  }
  
  .radio-input{
      display: flex;
      justify-content: space-around;
  }

  .modal-buttons{
      display: flex;
      justify-content: space-around;
  }
  button:hover{
      border:1px solid black;
  }
</style>