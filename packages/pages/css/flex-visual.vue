<template>
  <div class="components-container">
    <n-form ref="formRef" :label-width="80" :model="flexForm">
      <n-grid :cols="24" :x-gap="12">
        <n-form-item-gi :span="6" label="flex-direction">
          <n-select v-model:value="flexForm.flexDirection" :options="flexDirectionOptions" />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="flex-wrap" path="flexWrap">
          <n-select v-model:value="flexForm.flexWrap" :options="flexWrapOptions" />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="flex-flow">
          <n-input v-model:value="flexFlow" readonly disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="justify-content" path="justifyContent">
          <n-select v-model:value="flexForm.justifyContent" :options="justifyContentOptions" />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="align-items" path="alignItems">
          <n-select v-model:value="flexForm.alignItems" :options="alignItemsOptions" />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="align-content">
          <n-select v-model:value="flexForm.alignContent" :options="alignContentOptions" />
        </n-form-item-gi>
        <n-form-item-gi :span="6">
          <n-space>
            <n-button type="primary" @click="addItem">新增</n-button>
          </n-space>
        </n-form-item-gi>
      </n-grid>
    </n-form>
    <pre>{{ JSON.stringify(flexForm, null, 2) }}</pre>
    <div style="border: 1px solid springgreen">
      <div :style="{ ...flexForm, display: 'flex', minHeight: '300px' }">
        <div
          class="item"
          v-for="(item, index) in items"
          :style="{
            ...item,
            width: `${item.width}px`,
            height: `${item.height}px`,
            background: colors[index % colors.length],
          }"
          @click="handleItemClick(item)"
        >
          {{ index }}
        </div>
      </div>
    </div>
    <n-drawer v-model:show="active" :default-width="502" placement="right" resizable>
      <n-drawer-content title="子容器属性">
        <n-form label-placement="left" label-width="auto" :model="flexItem">
          <n-form-item label="width">
            <n-input-number :step="20" v-model:value="flexItem.width" />
          </n-form-item>
          <n-form-item label="height">
            <n-input-number :step="20" v-model:value="flexItem.height" />
          </n-form-item>
          <n-form-item label="order">
            <n-input-number v-model:value="flexItem.order" />
          </n-form-item>
          <n-form-item label="flex-grow" path="flexGrow">
            <n-input-number v-model:value="flexItem.flexGrow" />
          </n-form-item>
          <n-form-item label="flex-shrink" path="flexShrink">
            <n-input-number v-model:value="flexItem.flexShrink" />
          </n-form-item>
          <n-form-item label="flex-basis" path="flexBasis">
            <n-input v-model:value="flexItem.flexBasis" />
          </n-form-item>
          <n-form-item label="align-self" path="alignSelf">
            <n-select v-model:value="flexItem.alignSelf" :options="justifyContentOptions" />
          </n-form-item>
          <n-form-item label="flex" path="selectValue">
            <n-input v-model:value="flex" disabled />
          </n-form-item>
        </n-form>
        <template #footer>
          <n-space>
            <n-button @click="active = false">取消</n-button>
            <n-button type="primary" @click="handleSubmit">确认</n-button>
          </n-space>
        </template>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import {
  alignContentOptions,
  alignItemsOptions,
  flexDirectionOptions,
  flexWrapOptions,
  justifyContentOptions,
} from "../../common/flexConfig";
import { colors } from "../../common/constant";
import { uid } from "uid";
import { FlexItem } from "../../common/interface";
import { useMessage } from "naive-ui";

const formRef = ref(null);
const active = ref(false);

const items = ref<FlexItem[]>();

const addItem = () => {
  items.value.push({
    id: uid(),
    width: 100,
    height: 80,
    order: 0,
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "auto",
    alignSelf: "auto",
  });
};

onMounted(() => {
  items.value = Array(5)
    .fill(0)
    .map(() => ({
      id: uid(),
      width: 100,
      height: 80,
      order: 0,
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: "auto",
      alignSelf: "auto",
    }));
});

const handleItemClick = (item) => {
  flexItem.value = { ...item };
  active.value = true;
};

const message = useMessage();

const handleSubmit = () => {
  items.value = items.value.map((item) => {
    if (item.id === flexItem.value.id) {
      if (flexItem.value.flexBasis !== "auto") {
        if (typeof Number.parseInt(flexItem.value.flexBasis) === "number") {
          flexItem.value.flexBasis = `${flexItem.value.flexBasis}px`;
        } else {
          message.error("参数存在错误");
        }
      }
      item = flexItem.value;
    }
    return item;
  });
  // flexItem.value = null;
  active.value = false;
};

const flexForm = ref({
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  alignContent: "stretch",
  alignItems: "center",
});

const flexItem = ref<FlexItem>();

const flexFlow = computed(() => {
  return `${flexForm.value.flexDirection} ${flexForm.value.flexWrap}`;
});
const flex = computed(() => {
  return `${flexItem.value.flexGrow} ${flexItem.value.flexShrink} ${flexItem.value.flexBasis} `;
});
</script>

<style scoped>
.item {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
  word-break: break-all;
}
</style>
