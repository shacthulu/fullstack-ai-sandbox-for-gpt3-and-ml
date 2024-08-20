# Lexical Playground Journal

## Setup Steps

### Basic Editor

1. Add the @lexical libraries `yarn add lexical @lexical/react`
2. Import the core Lexical components:
```tsx
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
```
3. Create the initial config (namespace: string, theme: {}, onError()). We make all three of those.  Theme can be empty or w/e.  Namespace is a string.  onError() can be as easy as printing to console.  Example:
```tsx
const theme = {};
function onError(error: Error) {
  console.error(error);
}
const initialConfig = {
  namespace: 'playground',
  theme,
  onError,
};
```
4. Import optional but common basic plugins
```tsx
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
```
5. For onChange to be able to actually read the editor state, we need to use the lexical commands:
```tsx
import {$getRoot, $getSelection} from 'lexical';
// [...]
function onChange(editorState) {
  editorState.read(() => {
    const root = $getRoot();
    const selection = $getSelection();
    console.log(root, selection);
  });
}
```
6. Create our editor
```tsx
export default function LexicalEditor(props: any) {
  return (
        <LexicalComposer initialConfig={initialConfig}>
          <PlainTextPlugin // #312D4B
            contentEditable={<ContentEditable />}
            placeholder={<div> Enter your message here.... </div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePlugin onChange={onChange} />
          <HistoryPlugin />
        </LexicalComposer>
  );
}
```
### Styling

#### Framing

The initial editor is barebones.  Needs CSS and containers, etc.

1. Create a Grid to contain components (if necessary)
2. Center, container, sizing, w/e

Example:
```tsx
export default function PlaygroundLexical() {
  return (
    <div>
      <Center maw={800} h={500} mx="auto">
      <Grid m="lg" grow>
        <Grid.Col span={12}><Title align="center">Lexical Editor Playground</Title></Grid.Col>
        <Grid.Col span={12}>
          <Text align="center">
            This is a sandbox to test our NER systems using our (highly experimental)
            next-gen text editor based on Lexical
          </Text>
        </Grid.Col>
        <Grid.Col span={12}>
        <Paper shadow="xs" p="md" m="xl">
          <Box>
            <LexicalEditor /> {/*This is our custom component*/} 
          </Box>
        </Paper>
        </Grid.Col>
      </Grid>
      </Center>
    </div>
  );
}
```

#### CSS

Theming is through CSS.  When the editor is created, the "theme" object passes a mapping of CSS class names, not styles.  You then write the CSS to style the editor.  See https://lexical.dev/docs/getting-started/theming . Almost everything can be passed a classname to help style.
```tsx
// exampleTheme.js
const exampleTheme = {
  ltr: 'ltr',
  rtl: 'rtl',
  placeholder: 'editor-placeholder',
  paragraph: 'editor-paragraph',
};

// main file
import {exampleTheme} from './exampleTheme';
const initialConfig = {namespace: 'MyEditor', theme: exampleTheme};
export default function Editor() {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container">...</div>
    </LexicalComposer>
  );
}
```
That would only change class names.  To actually change the appearance, we would be using CSS a la
```css
.ltr {
  text-align: left;
}

.rtl {
  text-align: right;
}

.editor-placeholder {
  color: #999;
  overflow: hidden;
  position: absolute;
  top: 15px;
  left: 15px;
  user-select: none;
  pointer-events: none;
}

.editor-paragraph {
  margin: 0 0 15px 0;
  position: relative;
}
```
You can still use the Emotion and other styling mechanisms, however.  Create a new component with ContentEditable as a child, and style it there.  Same for Placeholder.  You should also wrap the editor with `position: relative`, then the placeholder with `position: absolute`.  Otherwise the placeholder will not appear over the actual editor.  Example:
```tsx
// styled replacements
import { Box } from '@mantine/core';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';

export const StyledContentEditable = (props: any) => (
    <Box
      component={ContentEditable}
      style={{
        minHeight: 200,
        width: '100%',
        padding: '0 8px',
        borderRadius: 5,
        paddingTop: 2,
        paddingLeft: 10,
        position: 'relative',
        outline: 'none',
      }}
      {...props}
    />
  );

export const placeHolderSx = {
  position: 'absolute',
  top: 15,
  left: 10,
  userSelect: 'none',
  display: 'inline-block',
  pointerEvents: 'none',
};

export const PlaceHolder = (props: any) => (
    <Box
      style={{
        position: 'absolute',
        top: 15,
        left: 10,
        userSelect: 'none',
        display: 'inline-block',
        pointerEvents: 'none',
      }}
      {...props}
    >
        {props.children}
    </Box>
  );

// main function.  Note that placing the Box OUTSIDe of the Lexical Composer makes positioning the Toolbar difficult.
export default function LexicalEditor(props: any) {
  return (

        <LexicalComposer initialConfig={initialConfig}>
            <Box sx={{ position: 'relative' }}>
          <PlainTextPlugin // #312D4B
            contentEditable={<StyledContentEditable />}
            placeholder={<PlaceHolder>Start typing here...</PlaceHolder>}
            ErrorBoundary={LexicalErrorBoundary}
          />
              </Box>
          <OnChangePlugin onChange={onChange} />
          <HistoryPlugin />
        </LexicalComposer>

  );
}
```

It's nuance time.  But first: get the styling into the editor for text and everything else.  We are going to create the config and classnames in a .ts file to import into configuration.  This will be the mapping from basic type to class name.  [Example below](https://github.com/facebook/lexical/blob/main/packages/lexical-playground/src/themes/PlaygroundEditorTheme.ts)
```tsx
const theme: EditorThemeClasses = {
  blockCursor: 'PlaygroundEditorTheme__blockCursor',
  characterLimit: 'PlaygroundEditorTheme__characterLimit',
  code: 'PlaygroundEditorTheme__code',
  codeHighlight: {
    atrule: 'PlaygroundEditorTheme__tokenAttr',
    attr: 'PlaygroundEditorTheme__tokenAttr',
    boolean: 'PlaygroundEditorTheme__tokenProperty',
    builtin: 'PlaygroundEditorTheme__tokenSelector',
    cdata: 'PlaygroundEditorTheme__tokenComment',
    char: 'PlaygroundEditorTheme__tokenSelector',
    class: 'PlaygroundEditorTheme__tokenFunction',
    'class-name': 'PlaygroundEditorTheme__tokenFunction',
    comment: 'PlaygroundEditorTheme__tokenComment',
    constant: 'PlaygroundEditorTheme__tokenProperty',
    deleted: 'PlaygroundEditorTheme__tokenProperty',
    doctype: 'PlaygroundEditorTheme__tokenComment',
    entity: 'PlaygroundEditorTheme__tokenOperator',
    function: 'PlaygroundEditorTheme__tokenFunction',
    important: 'PlaygroundEditorTheme__tokenVariable',
    inserted: 'PlaygroundEditorTheme__tokenSelector',
    keyword: 'PlaygroundEditorTheme__tokenAttr',
    namespace: 'PlaygroundEditorTheme__tokenVariable',
    number: 'PlaygroundEditorTheme__tokenProperty',
    operator: 'PlaygroundEditorTheme__tokenOperator',
    prolog: 'PlaygroundEditorTheme__tokenComment',
    property: 'PlaygroundEditorTheme__tokenProperty',
    punctuation: 'PlaygroundEditorTheme__tokenPunctuation',
    regex: 'PlaygroundEditorTheme__tokenVariable',
    selector: 'PlaygroundEditorTheme__tokenSelector',
    string: 'PlaygroundEditorTheme__tokenSelector',
    symbol: 'PlaygroundEditorTheme__tokenProperty',
    tag: 'PlaygroundEditorTheme__tokenProperty',
    url: 'PlaygroundEditorTheme__tokenOperator',
    variable: 'PlaygroundEditorTheme__tokenVariable',
  },
  embedBlock: {
    base: 'PlaygroundEditorTheme__embedBlock',
    focus: 'PlaygroundEditorTheme__embedBlockFocus',
  },
  hashtag: 'PlaygroundEditorTheme__hashtag',
  heading: {
    h1: 'PlaygroundEditorTheme__h1',
    h2: 'PlaygroundEditorTheme__h2',
    h3: 'PlaygroundEditorTheme__h3',
    h4: 'PlaygroundEditorTheme__h4',
    h5: 'PlaygroundEditorTheme__h5',
    h6: 'PlaygroundEditorTheme__h6',
  },
  image: 'editor-image',
  indent: 'PlaygroundEditorTheme__indent',
  link: 'PlaygroundEditorTheme__link',
  [...]
```

Now we have some unique class names we can target with raw .css.  [Simple .css stylings for it](https://github.com/facebook/lexical/blob/main/packages/lexical-playground/src/themes/PlaygroundEditorTheme.css)
```css
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */
.PlaygroundEditorTheme__ltr {
  text-align: left;
}
.PlaygroundEditorTheme__rtl {
  text-align: right;
}
.PlaygroundEditorTheme__paragraph {
  margin: 0;
  position: relative;
}
.PlaygroundEditorTheme__quote {
  margin: 0;
  margin-left: 20px;
  margin-bottom: 10px;
  font-size: 15px;
  color: rgb(101, 103, 107);
  border-left-color: rgb(206, 208, 212);
  border-left-width: 4px;
  border-left-style: solid;
  padding-left: 16px;
}
.PlaygroundEditorTheme__h1 {
  font-size: 24px;
  [...]
```

We are officially at the point where copy-pasting items from the facebook editor theme is quicker.  HOWEVER, the css formatting from the facebook playground mismatches our Mantine elements in a few areas, namely paragraph-to-placeholder placement and the like.  In the future we should probably anchor our placeholder to the actual cursor or something wonky.  Until then, this was reasonable.
```tsx
export const PlaceHolder = (props: any) => (
    <Box
      style={{
        position: 'absolute',
        top: 2,
        left: 8,
        userSelect: 'none',
        display: 'inline-block',
        pointerEvents: 'none',
      }}
      {...props}
    >
    <Text m={0} p={0} color="gray">{props.children}</Text>
    </Box>
  );
```
Note: NO CSS MEANS NO UNDERLINE.  Who knows what else.  Bold and italic works, sub, sup etc.  Underline doesn't.  Now of particular note, with Next and some others, you have to pay attention to where you are putting your CSS styles.  That's a non-lexical-specific topic though so I'm leaving it out of here and just dropping off a link to the [Next.js commentary on it](https://nextjs.org/docs/messages/css-global).



## Structure and Workings

LexicalComposer appears to be, essentially, a wrapper around a React Context Provider
The Context Provider is used to provide the EditorState to the rest of the app
The PlainTextPlugin appears to be the editor text input area
ContentEditable is a wrapper around a contenteditable div provided as a react component from Lexical
Error boundary is also directly from lexical
The OnChangePlugin is a wrapper around a useEffect hook that fires when the editor state changes.  Optional and simply a convenience to add on a simple function to fire when the editor state changes
Interestingly enough, I could place Paper, and other items inside LexicalComposer and PlainTextPlugin and it works as expected.  My assumption of the inner workings are:
- `LexicalComposer` appears to be a wrapper around a React Context Provider
- The Context Provider, `LexicalComposer` is used to provide the EditorState and expose functions to the children
- The `PlainTextPlugin` appears to be the editor text input area
- `ContentEditable` is a wrapper around a contenteditable div provided as a react component from Lexical
- `ErrorBoundary` is also directly from lexical
- The `OnChangePlugin` is a wrapper around a useEffect hook that fires when the editor state changes.  Optional and simply a convenience to add on a simple function to fire when the editor state changes
- All of the plugins simply jack a hook or feature into the LexicalComposer context provider
- The "PlainTextPlugin" is the editor input area and, as expected, can be wrapped in any other component without noticable impact.  To keep things clean, I'm going to leave it as is and simply wrap the entire editor in a HOC.
- `$functions` seem to be the imperative way to interact with the editor state, comparable to Prosemirror "commands"

## Custom Components

### Toolbar
Additionally I started making my own toolbar with its logic, etc.  It's really as simple as below:
```tsx
export default function useOnToolbarClick() {
    const [editor] = useLexicalComposerContext();
    function onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, action: string) {
        console.log('onClick action:' + action);
        switch (action) {
            case 'toggle_bold':
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
                break;
            case 'toggle_italic':
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
                break;
            case 'clear_formatting':
                // Add the code for "clear_formatting" action
                break;
            case 'toggle_highlight':
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "highlight");
                break;
            case 'toggle_strikethrough':
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
                break;
            case 'toggle_code':
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
```
This quickly grows and, wanting to add "toggle on and off" as well as not doubling-up on formatting, we need to manage state.  Again the playground is helpful here.  [Check its gratuitously fatty code here](https://github.com/facebook/lexical/blob/main/packages/lexical-playground/src/plugins/ToolbarPlugin/index.tsx).  There are a few things in there that are off.  It's huge because ALL the button and toolbar code is in there, all the dropdowns with conditional logic, etc.  For example:
```tsx
// They have
function getCodeLanguageOptions(): [string, string][] {
  const options: [string, string][] = [];

  for (const [lang, friendlyName] of Object.entries(
    CODE_LANGUAGE_FRIENDLY_NAME_MAP,
  )) {
    options.push([lang, friendlyName]);
  }

  return options;
}

//Should be
function getCodeLanguageOptions(): [string, string][] {
  return Object.entries(CODE_LANGUAGE_FRIENDLY_NAME_MAP);
}
```
We have our code for dropdowns on block format -- all kinds of stuff.  I'd blow up the size of this document if I went  into all of it -- suffice it to say, replacing with framework components is pretty plug and play and almost everything is self-explanatory.  The toolbar plugin state names are fairly obvious but it's worth revisiting in the future for a cleaner and more concise way.  There are a few functions that will take some explaining, however.  Just a little in the middle where it got much back (callBack).  Also, the playground is setup for a ton of additional features that won't matter to us.  For now we need:
1. Bold for "important"
2. Italic for "emphasis"
3. Underline for... underline
4. Inline code
5. Code block
6. Undo / Redo
7. Table
8. Bullets
9. Numbered list
10. Insert
11. Highlight

From the bottom we want
Clear, microphone, upload, save draft, markdown view

Future thoughts: Checklist for the agent, comment for "thoughts and context".  Sticky notes for "remember".