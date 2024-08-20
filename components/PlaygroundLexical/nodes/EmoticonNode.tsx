import { TextNode } from 'lexical';

export class EmoticonNode extends TextNode {
    __className;

    static getType() {
        return 'emoticon';
    }

    static clone(node: any) {
        return new EmoticonNode(node.__className, node.__text, node.__key);
    }

    constructor(className: any, text: any, key: any) {
        super(text, key);
        this.__className = className;
    }

    createDOM(config: any) {
        const dom = super.createDOM(config);
        dom.className = this.__className;
        return dom;
    }
}

export function $isEmoticonNode(node: any) {
    return node instanceof EmoticonNode;
}

export function $createEmoticonNode(className: any, emoticonText: any) {
    return new EmoticonNode(className, emoticonText, undefined).setMode('token');
}
