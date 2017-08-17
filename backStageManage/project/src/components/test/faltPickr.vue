<template>
  <div class="s_inline">
    <flat-pickr class="s_input s_inputW"
                v-model="date"
                :config="config"
    ></flat-pickr>
  </div>
</template>

<script>
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';


  export default {
    data () {
      return {
        date: null,
        config:{
          wrap:true
        }
      }
    },
    components: {
      flatPickr
    }
  }
</script>
<style scoped>
  .s_inline{
    display: inline-block;
  }
  .s_input {
    border: 1px solid #dbdddd;
    width: 100px;
    color: #5c5c5c;
    height: 26px;
    box-sizing: content-box;
  }

  .s_inputW {
    width: 160px;
  }
</style>
