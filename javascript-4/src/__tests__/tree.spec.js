const { JSDOM } = require('jsdom');

describe('My tree', () => {
    let jsdom;
    beforeEach(async () => {
        jsdom = await JSDOM.fromFile('dist/index.html', {
            resources: 'usable',
            runScripts: 'dangerously'
        })

        global.document = jsdom.window.document

        await new Promise(resolve =>
            jsdom.window.addEventListener('load', resolve)
        )
    })

    it('to be in DOM', () => {
        const tree = document.querySelector('my-tree')
        expect(tree).not.toBe(null);
        console.log('tree', tree.shadowRoot.querySelector('my-leaf'))
    })

    it('to have markup in shadow dom', () => {
        const tree = document.querySelector('my-tree')
        expect(typeof(tree.shadowRoot.innerHTML)).toBe('string');
    })

    it('render ul', () => {
        const tree = document.querySelector('my-tree')
        expect(tree.shadowRoot.querySelector('ul')).not.toBe(null);
    })

    it('contain element my-leaf', () => {
        const tree = document.querySelector('my-tree')
        expect(tree.shadowRoot.querySelector('my-leaf')).not.toBe(null);
    })

    it('Element the my-leaf have attribute the leaf', () => {
        const tree = document.querySelector('my-tree')
        const leaf = tree.shadowRoot.querySelector('my-leaf')
        expect(leaf.hasAttribute('leaf')).toBe(true);
    })
})