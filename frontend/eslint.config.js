import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
    { ignores: ["dist"] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ["*/.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
            ],
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    varsIgnorePattern: "^",
                    argsIgnorePattern: "^",
                },
            ],
            "@typescript-eslint/ban-ts-comment": [
                "error",
                {
                    "ts-ignore": false,
                },
            ],
        },
        settings: {
            "import/resolver": {
                alias: {
                    map: [
                        ["@entities", "./src/entities"],
                        ["@app/", "./src/app"],
                        ["@pages/", "./src/pages"],
                        ["@shared/", "./src/shared"],
                        ["@widgets/", "./src/widgets"],
                    ],
                    extensions: [".ts", ".tsx", ".js", ".jsx"],
                },
            },
        },
    }
);