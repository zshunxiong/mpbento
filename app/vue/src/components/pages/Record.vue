<template>
  <div class="grid gap-4">
    <ResultArea :data="convertedData" :rows="25" />
    <div class="flex justify-end">
      <Button variant="primary" @click="print"> 列印 </Button>
    </div>
  </div>
</template>

<script>
import Button from "../atoms/Button.vue";
import ResultArea from "../organisms/ResultArea.vue";

export default {
  name: "Record",
  components: {
    Button,
    ResultArea,
  },

  data: () => ({
    convertedData: JSON.parse(localStorage.getItem("bentoApp_data")),
  }),
  
  methods: {
    print() {
      if (!this.convertedData) {
        return this.$store.dispatch("fireToast", {
          title: "列印失敗",
          text: "請先轉換並保存資料",
          variant: "warning",
        });
      }
      window.print();
    },
  },
};
</script>