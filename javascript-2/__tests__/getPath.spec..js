const { JSDOM } = require('jsdom');
const getPath = require('../getPath')

describe('getPath return null', () => {
    it('when is called without params', () => {
        jsDomInstance = new JSDOM()
        global.HTMLElement = jsDomInstance.window.HTMLElement
        expect(getPath()).toBe(null)
    })

    it('when is called with param !== HTMLElement', () => {
        jsDomInstance = new JSDOM()
        global.HTMLElement = jsDomInstance.window.HTMLElement

        expect(getPath({})).toBe(null)
        expect(getPath('')).toBe(null)
        expect(null).toBe(null)
    })
})

describe('getPath ', () => {
    let jsdom;
    beforeEach(async () => {
        jsdom = await JSDOM.fromFile('index.html', {
            resources: 'usable',
            runScripts: 'dangerously'
        })

        global.document = jsdom.window.document
        global.HTMLElement = jsdom.window.HTMLElement

        await new Promise(resolve =>
            jsdom.window.addEventListener('load', resolve)
        )
    })
  
    it('return is string', () => {
        const el = document.getElementById('box-col-inner-2')
        const path = getPath(el)

        expect(typeof(path)).toBe('string')
    })

    it('selector is contain the element id', () => {
        const el = document.getElementById('box-col-inner-2')
        const path = getPath(el)
        const elSelector = path.split('>').reverse()[0]

        expect(elSelector).toContain('#box-col-inner-2')
    })

    it('selector is contain the element class name', () => {
        const el = document.querySelector('.box__col')
        const path = getPath(el)
        const elSelector = path.split('>').reverse()[0]

        expect(elSelector).toContain('.box__col')
    })

    it('selector is contain the element tagName', () => {
        const el = document.querySelector('div')
        const path = getPath(el)
        const elSelector = path.split('>').reverse()[0]

        expect(elSelector).toContain('div')
    })

    it('selector starts with body', () => {
        const el = document.getElementById('box-col-inner-2')
        const path = getPath(el)
        const firstTag = path.split('>')[0]

        expect(firstTag).toBe('body')
    })

    it('querySelectorAll with received selector return one element', () => {
        const el_1 = document.getElementById('box-col-inner-2')
        const el_2 = document.getElementById('box-col-inner-1')
        const el_3 = document.querySelector('.box__row')
        const el_4 = document.querySelector('.box__col')
        const el_5 = document.querySelector('.box')

        expect(document.querySelectorAll(getPath(el_1)).length).toBe(1)
        expect(document.querySelectorAll(getPath(el_2)).length).toBe(1)
        expect(document.querySelectorAll(getPath(el_3)).length).toBe(1)
        expect(document.querySelectorAll(getPath(el_4)).length).toBe(1)
        expect(document.querySelectorAll(getPath(el_5)).length).toBe(1)
    }) 
})