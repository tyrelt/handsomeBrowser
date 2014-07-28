function bro(element) {
    // broRegex = new RegExp(
    //         '(.+(?!</))' + // $1, mandatory: the string body, lazy
    //         '(,$)?' + // $2, optional: a comma at the end of the string, to be discarded
    //         '(' + // $3, optional:
    //             '(\\.|\\!|\\?|:' + // end punctuation...
    //             '|"|&ldquo;|&quot;|”' + // closing quotation marks...
    //             '|</.*?>)*' + // closing tags...
    //         ')$' // ...all at the end of the string
    //     );
    // element.innerHTML = element.innerHTML.trim().replace(broRegex, '$1' + ', bro' + '$3');
    element.innerHTML = element.innerHTML.trim().replace(/((<[^>]*>|\.|,|\!|\?)*)$/, ', bro' + '$1');
}
function isValid(element) {
    return (element.tagName == "H1" || element.tagName == "H2" || element.tagName == "H3" || element.tagName == "H4" || element.tagName == "P" || element.tagName == "LI" || element.tagName == "BUTTON") && /\S/.test(element.innerText); // innerText, not innerHTML, to exclude things like images
}
// function format(text) {
//     return text.replace(/(.)(<.*?>)(.)/g, '$1\n$2$3');
// }
function recurseDOM(element) {
    element.editedChildren = [];
    // element.innerHTML = format(element.innerHTML.trim());
    if (element.childNodes.length > 1) {
        for (var i = 0; i < element.childNodes.length; i++) {
            if (element.childNodes[i].nodeType == 1) {
                if (recurseDOM(element.childNodes[i])) {
                    element.editedChildren.push(element.childNodes[i]);
                } // recurse over every child node; if a single one returns true, noChildrenEdited is false
            }
        }
        if (element.editedChildren.length == 0 && isValid(element)) {
            console.log("extra: " + element.innerHTML.trim() + " | " + element.tagName);
            bro(element);
            return true;
        } else {
            return false;
        }
    } else {
        console.log("bottom element: " + element.innerHTML.trim() + " | " + element.tagName);
        if (isValid(element)) {
            bro(element);
            return true;
        } else {
            return false;
        }
    }
}
var dom = document.documentElement;
recurseDOM(dom);