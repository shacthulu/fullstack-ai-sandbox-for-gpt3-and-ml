import { ElementNode, RangeSelection, TextNode } from 'lexical';
import { $isAtNodeEnd } from '@lexical/selection';

/** getSelectedNode
 *
 * This function returns the selected node in a range selection.
 * @param {RangeSelection} selection
 * @returns {TextNode | ElementNode}
 */
export const getSelectedNode = (selection: RangeSelection): TextNode | ElementNode => {
  const { anchor } = selection;
  const { focus } = selection;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  } 
    return $isAtNodeEnd(anchor) ? anchorNode : focusNode;
};
