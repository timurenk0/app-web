/** @type {import('tailwindcss').Config}  */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}"
    ],
    darkMode: "class",
    theme: {
        extend: {
            cssLayer: {
                name: "primevue",
                order: "tailwind-base, primeui, tailwind-utilities"
            }
        }
    },
    plugins: [forms, primeui], 

}