module.exports = {
    tabWidth: 4,
    singleQuote: false,
    printWidth: 80,
    trailingComma: "none",
    useTabs: false,
    overrides: [
        {
            files: ["**/*.json"],
            options: {
                tabWidth: 2
            }
        },
        {
            files: [
                "**/*.yml",
                "**/*.yaml",
                "**/.*.yaml",
                "**/.*.yml",
                "**/*.yaml"
            ],
            options: {
                tabWidth: 2
            }
        },
        {
            files: ["**/*.md"],
            options: {
                tabWidth: 2
            }
        }
    ]
};
