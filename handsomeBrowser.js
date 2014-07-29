function bro(element) {
    element.innerHTML = element.innerHTML.trim()
        .replace(/(>)\s{2,}/g, '$1')
        .replace(/\s{2,}(<)/g, '$1')
        .replace(/((<[^>]*>|\.|,|\!|\?|:|"|\&[^;\s]*;|\s?(\.\s?)+|\s?…|\)|”|)*)$/, ', bro' + '$1');
    // console.log(element.innerHTML);
}

function isValid(element) {
    return (element.tagName == "H1" || element.tagName == "H2" || element.tagName == "H3" || element.tagName == "H4" || element.tagName == "P" || element.tagName == "LI" || element.tagName == "BUTTON") && /\S/.test(element.innerText); // innerText, not innerHTML, to exclude things like images
}

function recurse(element) {
    element.editedChildren = [];
    if (element.childNodes.length > 1) {
        for (var i = 0; i < element.childNodes.length; i++) {
            if (element.childNodes[i].nodeType == 1 && recurse(element.childNodes[i])) {
                // recurse over child nodes in the process of evaluating the condition; after, if editedChildren[] holds anything, noChildrenEdited is false
                element.editedChildren.push(element.childNodes[i]);
            }
        }
        if (element.editedChildren.length == 0 && isValid(element)) {
            // A node with children that aren't edited: e.g, a <p></p> with an (unedited) <em></em> inside it
            bro(element);
            return true; // The return value for the parent recurse() 
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

recurse(document.documentElement); // Start recursion into the DOM