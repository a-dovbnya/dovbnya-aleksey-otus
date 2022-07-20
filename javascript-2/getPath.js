"use strict"

/**
 * Возвращает селектор по id элемента
 * @param {HTMLElement} el 
 * @returns {string}
 */
const getIdSelector = (el) => {
    const id = el.getAttribute('id')

    if (id) {
        return `#${id.trim()}`
    }

    return ''
}

/**
 * Возвращает селектор по классам элемента
 * @param {HTMLElement} el 
 * @returns {string}
 */
const getClassSelector = (el) => {
    const classes = el.getAttribute('class')

    if (classes) {
        return `.${classes.split(' ').join('.')}`
    }

    return ''
}

/**
 * Возвращает индекс элемента в наборе соседних элементов
 * @param {HTMLElement} el 
 * @returns {number}
 */
const getIndexBySiblings = (el) => {
    let index = 1

    while (el.previousSibling) {
        el = el.previousSibling;

        if (el.nodeType === el.ELEMENT_NODE) {
            index++;
        }
    }
    return index;
}

/**
 * Возвращает селектор элемента
 * @param {HTMLElement} el 
 * @returns {string}
 */
const getNodeSelector = (el) => {
    const tag = el.nodeName.toLowerCase()
    const classes= getIdSelector(el)
    const id = getClassSelector(el)
    const index = getIndexBySiblings(el)

    return `${tag}:nth-child(${index})${id}${classes}`
}

/**
 * Возвращает уникальный селектор элемента
 * @param {HTMLElement} el 
 * @returns {string}
 */
function getPath (element) {
    if (!element  || !(element instanceof HTMLElement)) {
        return null;
    }

    const selector = []

    let tagName = element && element.tagName

    while (tagName) {

        if (tagName.toLowerCase() === "body") {
            selector.push("body");
            break
        } else {
            selector.push(getNodeSelector(element))
            element = element.parentNode;
            tagName = element && element.tagName;
        }
    }

    return selector.reverse().join(">")
}

module.exports = getPath