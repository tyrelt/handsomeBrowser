function bro(element) {
    element.innerHTML = element.innerHTML.trim().replace(/((<[^>]*>|\.|,|\!|\?|:|"|&ldquo;|&quot;|”)*)$/, ', bro' + '$1');
}

function isValid(element) {
    return (element.tagName == "H1" || element.tagName == "H2" || element.tagName == "H3" || element.tagName == "H4" || element.tagName == "P" || element.tagName == "LI" || element.tagName == "BUTTON") && /\S/.test(element.innerText); // innerText, not innerHTML, to exclude things like images
}

function recurseDOM(element) {
    element.editedChildren = [];
    if (element.childNodes.length > 1) {
        for (var i = 0; i < element.childNodes.length; i++) {
            if (element.childNodes[i].nodeType == 1 && recurseDOM(element.childNodes[i])) {
                 // recurse over every child node; later, if the editedChildren array holds anything, noChildrenEdited is false
                element.editedChildren.push(element.childNodes[i]);
            }
        }
        if (element.editedChildren.length == 0 && isValid(element)) {
             // This is a node with children that aren't edited: e.g, a <p></p> with an unedited <em></em> inside it
            bro(element);
            return true; // Booleans passed back to the recurse() that called this one
        } else {
            // If there are edited child nodes, don't edit the parent
            return false;
        }
    } else {
        if (isValid(element)) {
            // The node has no children, so it's safe to edit
            bro(element);
            return true;
        } else {
            return false;
        }
    }
}

var dom = document.documentElement;
recurseDOM(dom);