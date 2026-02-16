/** @type {import('tailwindcss').Config}  */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colos: {
                background: "var(--color-bg)",
                text: "var(--color-text)",
            }
        },
    },
    plugins: [], 
}