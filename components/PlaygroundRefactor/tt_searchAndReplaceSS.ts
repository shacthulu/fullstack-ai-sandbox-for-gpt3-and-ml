/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/space-infix-ops */
/* eslint-disable @typescript-eslint/object-curly-spacing */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eol-last */
/* eslint-disable no-return-assign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-continue */
/* eslint-disable no-param-reassign */
/* eslint-disable array-bracket-spacing */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */
// MIT License

// Copyright (c) 2022 Jeet Mandaliya (Github Username: sereneinserenade)

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import { Extension, Range } from "@tiptap/core"
import { Decoration, DecorationSet } from "prosemirror-view"
import { Plugin, PluginKey } from "prosemirror-state"
import { Node as ProsemirrorNode } from "prosemirror-model"

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    search: {
      /**
       * @description Set search term in extension.
       */
      setSearchTerm: (searchTerm: string) => ReturnType,
      /**
       * @description Set replace term in extension.
       */
      setReplaceTerm: (replaceTerm: string) => ReturnType,
      /**
       * @description Replace first instance of search result with given replace term.
       */
      replace: () => ReturnType,
      /**
       * @description Replace all instances of search result with given replace term.
       */
      replaceAll: () => ReturnType,
    }
  }
}

interface TextNodesWithPosition {
  text: string;
  pos: number;
}

const getRegex = (s: string, disableRegex: boolean, caseSensitive: boolean): RegExp => {
  return RegExp(disableRegex ? s.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&") : s, caseSensitive ? "gu" : "gui")
}

interface ProcessedSearches {
  decorationsToReturn: DecorationSet,
  results: Range[]
}

interface ISearchAndReplaceStorageObject {
      searchTerm: string,
      entity_type: string,
      identifier: string,
      replaceTerm: string,
      results: [],
      lastSearchTerm: string,

}

function processSearches (doc: ProsemirrorNode, searchTerm: RegExp, searchResultClass: string): ProcessedSearches {
  const decorations: Decoration[] = []
  let textNodesWithPosition: TextNodesWithPosition[] = []
  const results: Range[] = []

  let index = 0

  if (!searchTerm) return { decorationsToReturn: DecorationSet.empty, results: [] }

  doc?.descendants((node, pos) => {
    if (node.isText) {
      if (textNodesWithPosition[index]) {
        textNodesWithPosition[index] = {
          text: textNodesWithPosition[index].text + node.text,
          pos: textNodesWithPosition[index].pos,
        }
      } else {
        textNodesWithPosition[index] = {
          text: `${node.text}`,
          pos,
        }
      }
    } else {
      index += 1
    }
  })

  textNodesWithPosition = textNodesWithPosition.filter(Boolean)

  for (let i = 0; i < textNodesWithPosition.length; i += 1) {
    const { text, pos } = textNodesWithPosition[i]

    const matches = Array.from(text.matchAll(searchTerm)).filter(([ matchText ]) => matchText.trim())

    for (let j = 0; j < matches.length; j += 1) {
      const m = matches[j]

      if (m[0] === "") break

      if (m.index !== undefined) {
        results.push({
          from: pos + m.index,
          to: pos + m.index + m[0].length,
        })
      }
    }
  }

  for (let i = 0; i < results.length; i += 1) {
    const r = results[i]
    decorations.push(Decoration.inline(r.from, r.to, { class: searchResultClass }))
  }

  return {
    decorationsToReturn: DecorationSet.create(doc, decorations),
    results,
  }
}

const replace = (replaceTerm: string, results: Range[], { state, dispatch }: any) => {
  const firstResult = results[0]
  console.log(state)

  if (!firstResult) return
  const { from, to } = results[0]
//   const textNode = state.schema.text(replaceTerm || "PONG")
  const replaceNode = state.schema.nodes.entity.create({type: "US_SSN", text_content: replaceTerm })
  if (dispatch) dispatch(state.tr.replaceRangeWith(from, to, replaceNode))
  console.log(state)
}

// No longer needed since I reversed the replaceAll function
// const rebaseNextResult = (replaceTerm: string, index: number, lastOffset: number, results: Range[]): [number, Range[]] | null => {
//   const nextIndex = index + 1

//   if (!results[nextIndex]) return null

//   const { from: currentFrom, to: currentTo } = results[index]
//   console.log("replaceTerm", replaceTerm)
//     console.log("initial offset", lastOffset)
// //  const offset = (currentTo - currentFrom - replaceTerm.length) + lastOffset
//     const offset = (currentTo - currentFrom - replaceTerm.length) + lastOffset
//   const { from, to } = results[nextIndex]
//     console.log("modified offset", offset)
//   results[nextIndex] = {
//     to: to - 8,
//     from: from - 8,
//   }
//   console.log("results", results[nextIndex])
//   return [ offset, results ]
// }

const replaceAll = (replaceTerm: string, results: Range[], { state, tr, dispatch }: any) => {
  if (!results.length) return

  // Make a copy and reverse it so we're working from the end of the document to the start
  let resultsCopy = results.slice().reverse()

  for (let i = 0; i < resultsCopy.length; i += 1) {
    const { from, to } = resultsCopy[i]
    const replaceNode = state.schema.nodes.entity.create({type: "CREDIT_CARD", text_content: replaceTerm })
    tr.replaceRangeWith(from, to, replaceNode)
  }

  dispatch(tr)
}


export const searchAndReplacePluginKey = new PluginKey("searchAndReplacePlugin")

interface SearchAndReplaceOptions {
  searchResultClass: string;
  caseSensitive: boolean;
  disableRegex: boolean;
}

interface SearchAndReplaceStorage {
  searchTerm: string;
  replaceTerm: string;
  results: Range[];
  lastSearchTerm: string;
}

export const SearchAndReplace = Extension.create<SearchAndReplaceOptions, SearchAndReplaceStorage>({
  name: "searchAndReplace",

  addOptions () {
    return {
      searchResultClass: "search-result",
      caseSensitive: false,
      disableRegex: false,
    }
  },

  addStorage () {
    let replacementObject: ISearchAndReplaceStorageObject = {
        searchTerm: "",
        entity_type: "",
        identifier: "",
        replaceTerm: "",
        results: [],
        lastSearchTerm: "",
    };
    return replacementObject
  },

  addCommands () {
    return {
      setSearchTerm: (searchTerm: string) => ({ editor }) => {
        editor.storage.searchAndReplace.searchTerm = searchTerm
        return false
      },
      setReplaceTerm: (replaceTerm: string, entity_type?: string, identifier?: string) => ({ editor }) => {
        let replacementObject : ISearchAndReplaceStorageObject = {
            searchTerm: editor.storage.searchAndReplace.searchTerm || "no search term",
            entity_type: entity_type || "UNKNOWN",
            identifier: identifier || "UNASSIGNED",
            replaceTerm: replaceTerm || "no replace term",
            results: editor.storage.searchAndReplace.results || [],
            lastSearchTerm: editor.storage.searchAndReplace.lastSearchTerm || "no last search term",
        }
        editor.storage.searchAndReplace = replacementObject;
        // editor.storage.searchAndReplace.replaceTerm = replaceTerm
        // editor.storage.searchAndReplace.entity_type = entity_type || "UNKNOWN"
        // editor.storage.searchAndReplace.identifier = identifier || "UNASSIGNED"
        // replacementObject
        return false
      },
      replace: () => ({ editor, state, dispatch }) => {
        const { replaceTerm, results } = editor.storage.searchAndReplace
        replace(replaceTerm, results, { state, dispatch })
        return false
      },
      replaceAll: () => ({ editor, state, tr, dispatch }) => {
        const { replaceTerm, results } = editor.storage.searchAndReplace
        console.log("search Term replace term", replaceTerm, results)
        replaceAll(replaceTerm, results, { state, tr, dispatch })
        return false
      },
    }
  },

  addProseMirrorPlugins () {
    const editor = this.editor
    const { searchResultClass, disableRegex, caseSensitive } = this.options

    const setLastSearchTerm = (t: any) => editor.storage.searchAndReplace.lastSearchTerm = t

    return [
      new Plugin({
        key: searchAndReplacePluginKey,
        state: {
          init: () => DecorationSet.empty,
          apply ({ doc, docChanged }, oldState) {
            const { searchTerm, lastSearchTerm } = editor.storage.searchAndReplace
            if (!docChanged && lastSearchTerm === searchTerm) return oldState
            setLastSearchTerm(searchTerm)
            if (!searchTerm) return DecorationSet.empty
            const {
              decorationsToReturn,
              results,
            } = processSearches(doc, getRegex(searchTerm, disableRegex, caseSensitive), searchResultClass)
            editor.storage.searchAndReplace.results = results
            return decorationsToReturn
          },
        },
        props: {
          decorations (state) {
            return this.getState(state)
          },
        },
      }),
    ]
  },
})