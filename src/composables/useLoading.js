import { ref } from "vue";

const useLoading = () => {
  const isLoading = ref(false);

  const setLoading = (value) => {
    isLoading.value = value;
  };

  return { isLoading, setLoading };
};

export default useLoading;
