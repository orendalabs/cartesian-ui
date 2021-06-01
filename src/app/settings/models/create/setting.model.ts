export class SettingForm {
    key: string;
    value: string;

    constructor(settingForm?: SettingForm) {
        this.key = settingForm ? settingForm.key : "";
        this.value = settingForm ? settingForm.value : "";
    }
}