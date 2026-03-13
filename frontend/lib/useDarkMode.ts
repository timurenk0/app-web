import { ref, computed, watchEffect } from "vue";


const DARK_CLASS = "dark";
const isDark = ref(false);

const theme = localStorage.getItem("theme");

switch (theme) {
    case "dark":
        isDark.value = true;
        break;
    case "light":
        isDark.value = false;
        break;
    default:
        isDark.value = false;
        break;
}

document.documentElement.classList.toggle(DARK_CLASS, isDark.value);

watchEffect(() => {
    document.documentElement.classList.toggle(DARK_CLASS, isDark.value);
    localStorage.setItem("theme", isDark.value ? "dark" : "light");
});

export function useDarkMode() {
    function toggle() {
        isDark.value = !isDark.value;
    }

    return {
        isDark: computed(() => isDark.value),
        toggle
    }
}