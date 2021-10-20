const ERROR_TEXT = 'This attribute tree is not valid'
import demoTree from './tree.json'

interface Tree {
    id: number,
    items?: Array<Tree>
}

export default class MyTree extends HTMLElement {

    error: boolean = false
    tree: Tree = {
        id: 0,
        items: []
    }

    connectedCallback(): void {
        this.setTree()
    }

    getMarkup (tree: Tree): HTMLElement {
        if (!tree || !tree.id) {
            this.error = true
            return
        }

        const root = document.createElement('ul')
        const item = document.createElement('li')
        const leaf = document.createElement('my-leaf')

        leaf.setAttribute('leaf', `ID: ${tree.id}`)
        item.appendChild(leaf)
        root.appendChild(item)

        if (tree.items && Array.isArray(tree.items)) {
            const itemsBox = document.createElement('div')

            for (let i = 0; i < tree.items.length; i++) {
                itemsBox.append(this.getMarkup(tree.items[i]))
            }

            item.appendChild(itemsBox)
        }

        return root
    }

    setTree (): void {
        try {
            this.tree = demoTree
            this.error = null
            this.render()
        } catch {
            this.error = true
        }
    }

    render (): void {
        const shadow = this.attachShadow({mode: 'open'})
        const markup = this.getMarkup(this.tree)

        if (this.error) {
            shadow.innerHTML = ERROR_TEXT;
            return
        }

        shadow.innerHTML = ''
        shadow.appendChild(markup)
    }

    static get observedAttributes (): Array<string> {
        return ['tree']
    }

    attributeChangedCallback(): void {
        this.setTree()
    }
}
