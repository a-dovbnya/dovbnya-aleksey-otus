export default class MyLeaf extends HTMLElement {
    connectedCallback(): void {
        this.render()
    }

    render (): void {
        const shadow = this.attachShadow({mode: 'open'});
		shadow.innerHTML = this.getAttribute('leaf');
    }

    static get observedAttributes (): Array<string> {
        return ['text']
    }

    attributeChangedCallback(): void {
        this.render()
    }
}
