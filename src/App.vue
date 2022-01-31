<template>
   <div class="main-page">
      <div>
        <button 
          type="button"
          class="btn"
          @click="showModal"
        >Open Form
        </button>
        <h3>Upload CSV file</h3>
        <input type = "file" @change = "readFile">
      </div>
      <ag-grid-vue style="width: 90%; height: 80%;"
                    class="ag-theme-alpine"
                    :columnDefs="columnDefs"
                    :rowData="rowData"
                    @grid-ready="onGridReady">
      </ag-grid-vue>
      <div class="modal-backdrop" v-show="isModalVisible" @close="close">
        <div class="modal">
          <header class="modal-header">
            <slot name="header">
              Tag Wise Price Drop Form
            </slot>
            <button
              type="button"
              class="btn-close"
              @click="closeModal"
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
                    <label for="sku_id">SKU ID</label>
                    <input type="text" id="sku_id" class="input-ele" v-model="formdata.skuId">
                  </div>
                  <div class="modal-buttons">
                      <div>
                          <button v-if="editin" @click="save(formdata)" class="btn-green">Save Changes</button>
                          <button v-else @click="onSubmit(formdata)" class="btn-green">Submit</button>
                      </div>
                      <div>
                          <button
                            type="button"
                            class="btn-green"
                            @click="closeModal"
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
   </div>
</template>

<script>
import {AgGridVue} from "ag-grid-vue";
import Papa from "papaparse";
import axios from 'axios'
import BtnCellRenderer from './components/btn-cell-renderer.vue'
   export default {
       name: "App",
       data() {
           return {
               columnDefs: null,
               gridApi: null,
               columnApi: null,
               isModalVisible:false,
               file: '',
               content: [],
           };
       },
       components: {
           AgGridVue,
           btnCellRenderer:BtnCellRenderer
       },
       computed:{
          formdata(){
            return this.$store.state.data;
          },
          rowData(){
            return this.$store.state.row;
          },
          editin(){
            return this.$store.state.editing
          },

        },
       beforeMount() {
           this.columnDefs = [
               {field: 'id', sortable: true, filter: true},
               {field: 'tag', sortable: true, filter: true},
               {field: 'catalogue_name', sortable: true, filter: true},
               {field: 'sku_id', sortable: true, filter: true},
               {field: 'deal_price', sortable: true, filter: true},
               {field: 'moq', sortable: true, filter: true},
               {field: 'commission_percent', sortable: true, filter: true},
               {field: 'campaign_name', sortable: true, filter: true},
               {field: 'campaign_type', sortable: true, filter: true},
               {field: 'campaign_description', sortable: true, filter: true},
               {field: 'coupon_code', sortable: true, filter: true},
               {field: 'is_active', sortable: true, filter: true},
               {field: 'start_time', sortable: true, filter: true},
               {field: 'end_time', sortable: true, filter: true},
               {field: 'priority', sortable: true, filter: true},
               {field: 'created_at', sortable: true, filter: true},
               {field: 'min_cart_value', sortable: true, filter: true},
               {field: 'clubbing_key', sortable: true, filter: true},
               {field: 'use_case_filter', sortable: true, filter: true},
               {field: 'disallowed', sortable: true, filter: true},
               {headerName:'Actions', field: 'id', cellRenderer: 'btnCellRenderer'}
           ],
           this.frameworkComponents = {
             btnCellRenderer: BtnCellRenderer
           }
       },
       async mounted(){
         this.fun()
       },
       methods: {
           onGridReady(params) {
               this.gridApi = params.api;
               this.columnApi = params.columnApi;
           },
           fun(){
              axios.get('http://localhost:3000/').then((res)=>{
                this.$store.state.row=res.data;
              })
            },
           showModal() {
             this.isModalVisible = true;
           },
           closeModal() {
             this.isModalVisible = false;
           },
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
          readFile(event){
            this.file = event.target.files[0];
            Papa.parse( this.file, {
              header: true,
              skipEmptyLines: true,
              complete: function( results ){
                  this.content = results.data;
                  this.content.forEach(i=>{
                    this.onSubmit(i);
                  })
              }.bind(this)
            });
            this.fun()
          }
       },
   };
</script>
<style lang="scss">
  @import "~ag-grid-community/src/styles/ag-grid.scss";
  @import "~ag-grid-community/src/styles/ag-theme-alpine/sass/ag-theme-alpine-mixin.scss";

  .ag-theme-alpine {
      @include ag-theme-alpine((
          
      ));
  }
  .main-page{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
  }
  .btn{
    height: 30px;
    width: 100px;
    margin: 10px;
  }
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
