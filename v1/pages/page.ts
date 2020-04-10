export default abstract class Page {

    protected baseUrl = (global as any).baseUrl;

    title: string;

    abstract get url(): string;    

    open() {
        browser.url(this.url);
        browser.pause(1000);
    }
}