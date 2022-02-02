import { onBeforeUnmount, onMounted } from "@vue/runtime-core";

const useHandlingEscapePress = ({ isOpen, toggleModal }) => {
  const handleEscapePress = (event) => {
    if (event.code === "Escape" && isOpen.value) {
      toggleModal();
    }
  };

  onMounted(() => {
    window.addEventListener("keydown", handleEscapePress);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("keydown", handleEscapePress);
  });
};

export default useHandlingEscapePress;
