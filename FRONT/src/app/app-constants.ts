export class AppConstants {
    public static get baseServidor(): string { return "http://127.0.0.1:5000/"}
    public static get baseLogin(): string { return this.baseServidor + "login/"}
    public static get baseCards(): string { return this.baseServidor + "cards/"}
}
