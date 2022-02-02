import { ref } from "@vue/reactivity";

const useModal = () => {
  const isOpen = ref(false);

  const toggleModal = () => {
    isOpen.value = !isOpen.value;
  };

  return { isOpen, toggleModal };
};

export default useModal;
