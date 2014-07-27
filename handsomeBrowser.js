function bro(element) {
    element.innerHTML = element.innerHTML.trim().replace(/(.*?)((\.|\!|\?|:)?("|&ldquo;|&quot;|”)?)?$/, '$1' + ', bro' + '$2');
}
function isValid(element) {
    return (element.tagName == "H1" || element.tagName == "H2" || element.tagName == "H3" || element.tagName == "H4" || element.tagName == "P" || element.tagName == "LI" || element.tagName == "BUTTON") && /\S/.test(element.innerText);
}
function recurseDOM(element) {
    element.editedChildren = [];
    if (element.childNodes.length > 1) {
        for (var i = 0; i < element.childNodes.length; i++) {
            if (element.childNodes[i].nodeType == 1) {
                if (recurseDOM(element.childNodes[i])) {
                    element.editedChildren.push(element.childNodes[i]);
                } // recurse over every child node; if a single one returns true, noChildrenEdited is false
            }
        }
        if (element.editedChildren.length == 0 && isValid(element)) {
            console.log("extra: " + element.tagName);
            bro(element);
            return true;
        } else {
            return false;
        }
    } else {
        if (isValid(element)) {
            bro(element);
            return true;
        } else {
            return false;
        }
    }
}
var dom = document.getElementsByTagName('body')[0];
recurseDOM(dom);