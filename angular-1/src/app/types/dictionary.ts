import { Word } from './word'

export interface Dictionary {
    lang: string,
    dictionary: Word[]
}