export default class MyLeaf extends HTMLElement {
    connectedCallback() {
        this.render()
    }

    render () {
        const shadow = this.attachShadow({mode: 'open'});
		shadow.innerHTML = this.getAttribute('leaf');
    }

    static get observedAttributes () {
        return ['text']
    }

    attributeChangedCallback() {
        this.render()
    }
}
