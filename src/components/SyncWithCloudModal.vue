<template>
  <teleport to="#modal">
    <div v-if="show" class="fixed inset-0 bg-slate-900/70">
      <div class="flex justify-center items-center h-full px-4">
        <div
          class="
            border-4
            shadow-md shadow-[#e5e7eb]
            bg-gray-900
            max-w-2xl
            w-full
            px-4
            py-8
          "
        >
          <div class="mb-8 text-2xl text-center">
            <p>Cloud data is different from local data.</p>
            <p>Do you want to update cloud data?</p>
          </div>
          <div class="flex justify-around flex-wrap gap-4 flex-row-reverse">
            <button
              class="bg-green-700 pl-3 pr-4 py-2 rounded-lg flex text-xl"
              type="button"
              @click="updateCloudData"
            >
              <upload-icon />
              <span class="ml-1">Update Cloud Data</span>
            </button>
            <button
              class="bg-red-700 pl-3 pr-4 py-2 rounded-lg flex text-xl"
              type="button"
              @click="updateLocalData"
            >
              <download-icon />
              <span class="ml-1">Update Local Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { computed } from "@vue/runtime-core";

import DownloadIcon from "./icons/DownloadIcon.vue";
import UploadIcon from "./icons/UploadIcon.vue";

import { store } from "../store";
import { setHeroesProgressToSupabase } from "../services/supabase";

export default {
  components: { DownloadIcon, UploadIcon },
  setup() {
    const show = computed(() => store.cloud.showSyncModal);

    const updateCloudData = () => {
      const heroesProgress = JSON.parse(JSON.stringify(store.heroesProgress));
      setHeroesProgressToSupabase(heroesProgress);
      store.cloud.showSyncModal = false;
    };

    const updateLocalData = () => {
      if (store.cloud.data) {
        const cloudData = JSON.parse(JSON.stringify(store.cloud.data));
        store.completedHeroes = {};
        store.heroesProgress = cloudData;
      }
      store.cloud.showSyncModal = false;
    };

    return {
      show,
      updateCloudData,
      updateLocalData,
    };
  },
};
</script>
