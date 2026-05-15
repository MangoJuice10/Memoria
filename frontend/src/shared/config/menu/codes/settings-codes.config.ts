export const settingsCodes = {
    SETTINGS_PROFILE: "SETTINGS_PROFILE",
    SETTINGS_THEME: "SETTINGS_THEME",
    SETTINGS_LANGUAGE: "SETTINGS_LANGUAGE",
} as const satisfies Record<`SETTINGS_${string}`, `SETTINGS_${string}`>;