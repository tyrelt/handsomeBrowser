function bro(element) {
    // Finds 0 or more of anything that 1.) matches a whitelist of punctuation characters and tags and 2.) is at the end of the string; inserts ", bro" right before that matching group
    element.innerHTML = element.innerHTML.trim().replace(/((<[^>]*>|\.|,|\!|\?|:|"|\'|\&[^;\s]+;|\s?(\.\s?)+|\s?…|\)|\]|”|’|\s)*)$/, ', bro' + '$1');
    // blacklist version, not ready yet:
    // element.innerHTML = element.innerHTML.trim().replace(/(([^0-9\u00BF-\u1FFF\u2C00-\uD7FF\w]|<[^>]*>)*)$/, ', bro' + '$1');
}

function isValid(element) {
    // Checks argument against a whitelist, and makes sure it's not empty
    return (element.tagName == "H1" || 
            element.tagName == "H2" || 
            element.tagName == "H3" || 
            element.tagName == "H4" || 
            element.tagName == "P" || 
            element.tagName == "LI" || 
            element.tagName == "BUTTON") && 
        /\S/.test(element.innerText);
}

function recurse(element) {
    // recurse() calls itself on its argument's child nodes until there aren't any more (until we've reached the "lowermost" nodes), checks these for validity, and edits the valid ones. 
    // The child nodes return true or false to their parents, which use that return value to count their edited children. If there aren't any (say, the parent is a <p></p> with an [unedited] <em></em> in it), the function tries to tag the parent. After, the parent passes back up its own boolean.
    element.editedChildren = 0;
    if (element.childNodes.length > 1) {
        for (var i = 0; i < element.childNodes.length; i++) {
            if (element.childNodes[i].nodeType == 1 && recurse(element.childNodes[i])) {
                // recurse() calls itself in the process of evaluating the contition
                element.editedChildren++;
            }
        }
        if (element.editedChildren === 0) {
            if (isValid(element)) {
                bro(element);
                return true;
            } else {
                return false; // = Element has no edited children, and it's not edited itself: its parent is safe to (try to) edit
            }
        } else {
            return true; // So that knowledge of edited children "bubbles up"
        }
    } else {
        // Lowermost nodes
        if (isValid(element)) {
            bro(element);
            return true;
        } else {
            return false;
        }
    }
}

// window.addEventListener('load', function() {
    recurse(document.documentElement);
// }, false);