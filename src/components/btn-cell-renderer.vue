<template>
  <div>
    <span class="btn-cont">
        <button @click="edit()" class="cell-btn">Edit</button>
        <button @click="deleteData()" class="cell-btn">Delete</button>
    </span>
  </div>
</template>

<script>
import axios from 'axios'


export default {
  name:'BtnCellRenderer',
  methods: {
    edit() {
        axios.get('http://localhost:3000/'+this.params.value).then((res)=>{
        this.$store.state.data=res.data[0];
      })
      axios.get('http://localhost:3000/').then((res)=>{
        this.$store.state.row=res.data;
      })
    },
    deleteData(){
      axios.delete('http://localhost:3000/delete/'+this.params.value)
      .then((res)=>{
        console.log(res.data)
      })
      axios.get('http://localhost:3000/').then((res)=>{
        this.$store.state.row=res.data;
      })
    },
  }
}
</script>

<style>
  .btn-cont{
    margin: 10px;
  }
  .cell-btn{
    margin: 10px;
  }
</style>