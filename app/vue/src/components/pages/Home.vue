<template>
  <div class="grid gap-4">
    <div>
      <FormGroup label="請輸入資料" :helperText="example">
        <Textarea
          :rows="9"
          v-model:value="rawData"
          ph="姓名,品項$單價*數量(選填)"
        />
      </FormGroup>
      <div class="flex justify-end">
        <Button variant="outline-secondary" class="mr-1" @click="clear">
          清空
        </Button>
        <Button variant="primary" @click="convert">轉換</Button>
      </div>
    </div>
    <div>
      <ResultArea :data="convertedData" />
      <div class="flex justify-end">
        <Button variant="outline-secondary" class="mr-1" @click="print">
          列印
        </Button>
        <Button variant="primary" @click="save"> 保存 </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../atoms/Button.vue";
import Textarea from "../atoms/Textarea.vue";
import FormGroup from "../molecules/FormGroup.vue";
import ResultArea from "../organisms/ResultArea.vue";

export default {
  name: "Home",
  components: {
    Button,
    FormGroup,
    Textarea,
    ResultArea,
  },

  data: () => ({
    example: [
      "請按照格式貼上，例如:",
      "黃大明,多多綠茶$75",
      "黃小明,雞排飯$75*2",
    ],
    rawData: "",
    convertedData: null,
  }),

  methods: {
    clear() {
      this.rawData = "";
    },
    convert() {
      const replacedRaw = this.rawData
        .replaceAll("，", ",")
        .replaceAll("（", "(")
        .replaceAll("）", ")")
        .trim();
      try {
        if (replacedRaw === "")
          throw { name: "TypeError", text: "請先輸入資料" };
        const peopleArr = [];
        const foodArr = [];

        // Split textarea content by line break
        replacedRaw.split(/\n/).forEach((row) => {
          if (row.indexOf(",") < 0) throw { name: "TypeError", text: row };
          const match = row.match(/^([\s\S]+),([\s\S]+)\$([0-9]*)\*?([0-9]*)$/);
          if (!match) {
            throw { name: "TypeError", text: row };
          }
          const people = match[1].trim();
          const food = match[2].trim();
          const price = parseInt(match[3]);
          const quantity = parseInt(match[4] || 1);

          // Total by food
          const foodfounded = foodArr.find(
            (f) => f.name.toLowerCase() === food.toLowerCase()
          );
          if (!foodfounded)
            foodArr.push({
              name: food,
              quantity: quantity,
              price: price * quantity,
            });
          else {
            foodfounded.quantity += quantity;
            foodfounded.price += price * quantity;
          }

          // Total by people
          const peoplefounded = peopleArr.find(
            (p) => p.name.toLowerCase() === people.toLowerCase()
          );
          if (!peoplefounded)
            peopleArr.push({
              name: people,
              food: food + (quantity > 1 ? "*" + quantity : ""),
              quantity: quantity,
              price: price * quantity,
            });
          else {
            peoplefounded.food +=
              "，" + food + (quantity > 1 ? "*" + quantity : "");
            peoplefounded.quantity += quantity;
            peoplefounded.price += price * quantity;
          }
        });

        this.convertedData = {
          peopleArr: peopleArr.sort((a, b) =>
            a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
          ),
          foodArr: foodArr.sort((a, b) =>
            a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
          ),
        };
        this.$store.dispatch("fireToast", { title: "轉換成功" });
      } catch (e) {
        console.log(e);
        if (e.name === "TypeError")
          this.$store.dispatch("fireToast", {
            title: "格式錯誤",
            text: e.text,
            variant: "error",
          });
      }
    },

    save() {
      if (!this.convertedData) {
        return this.$store.dispatch("fireToast", {
          title: "保存失敗",
          text: "請先轉換資料",
          variant: "warning",
        });
      }
      localStorage.setItem("bentoApp_data", JSON.stringify(this.convertedData));
      this.$store.dispatch("fireToast", {
        title: "保存成功",
        text: "可到紀錄頁面查看",
      });
    },
    
    print() {
      if (!this.convertedData) {
        return this.$store.dispatch("fireToast", {
          title: "列印失敗",
          text: "請先轉換資料",
          variant: "warning",
        });
      }
      window.print();
    },
  },
};
</script>
