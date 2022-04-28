<template>
  <FormGroup helperText="點選區域可複製">
    <div class="flex items-center mb-1">
      <label class="text-sm font-medium text-gray-700 mr-1">整理方式：</label>
      <Radio
        name="type"
        value="food"
        text="品項"
        class="mr-2"
        :checked="type === 'food'"
        @change="handleRadio"
      />
      <Radio
        name="type"
        value="people"
        text="人員"
        :checked="type === 'people'"
        @change="handleRadio"
      />
    </div>
    <Textarea
      id="convertedArea"
      readOnly
      :rows="rows"
      @click="copyText()"
      v-model:value="convertedString"
    />
  </FormGroup>
  <div class="printArea hidden">{{ convertedString }}</div>
</template>

<script>
import Radio from "../atoms/Radio.vue";
import Textarea from "../atoms/Textarea.vue";
import FormGroup from "../molecules/FormGroup.vue";

export default {
  name: "ResultArea",
  components: {
    Radio,
    FormGroup,
    Textarea,
  },
  props: {
    data: Object,
    rows: {
      type: Number,
      default: 9,
    },
  },
  data: () => ({
    type: "food",
  }),
  computed: {
    totalByFood() {
      let converted = "";
      let totalPrice = 0;
      let count = 0;
      this.data.foodArr?.forEach((row) => {
        converted += `${row.name}【 ${row.quantity} 個 】小計: ${row.price} 元。\n`;
        totalPrice += row.price;
        count += row.quantity;
      });
      converted += `\n全部總共【 ${count} 個 】合計: ${totalPrice}元。`;
      return converted;
    },
    totalByPeople() {
      let converted = "";
      let totalPrice = 0;
      let count = 0;
      this.data.peopleArr?.forEach((row) => {
        converted += `${row.name}【 ${row.food} 】小計: ${row.price} 元。\n`;
        totalPrice += row.price;
        count += row.quantity;
      });
      converted += `\n全部總共【 ${count} 個 】合計: ${totalPrice}元。`;
      return converted;
    },
    convertedString() {
      if (!this.data) return "";
      const obj = {
        food: this.totalByFood,
        people: this.totalByPeople,
      };
      return obj[this.type];
    },
  },
  methods: {
    copyText() {
      if (!this.data) return "";
      const copyArea = document.getElementById("convertedArea");
      copyArea.select();
      copyArea.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(copyArea.value);
      this.$store.dispatch("fireToast", { title: "複製成功" });
    },
    handleRadio(e) {
      this.type = e.target.value;
    },
  },
};
</script>