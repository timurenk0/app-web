import { ref, computed, watch, onMounted } from "vue";

const DARK_CLASS = "dark";

export function useDarkMode() {
    const isDark = ref(false);

    function apply() {
        if (isDark.value) {
            document.documentElement.classList.add(DARK_CLASS);
        } else {
            document.documentElement.classList.remove(DARK_CLASS);
        }
    }

    onMounted(() => {
        const savedTheme = localStorage.getItem("theme");
        
        switch (savedTheme) {
            case "dark":
                isDark.value = true;
            case "light":
                isDark.value = false;
            default:
                isDark.value = false;
        }
        apply();
    });

    function toggle() {
        isDark.value = !isDark.value;
    }

    watch(isDark, () => {
        apply();
        localStorage.setItem("theme", isDark.value ? "dark" : "light"); 
    })

    return {
        isDark: computed(() => isDark.value),
        toggle
    }
}