function bro() {
    function recurseDOM(element) {
        if (element.childNodes.length > 1) {
            for (var i = 0; i < element.childNodes.length; i++) {
                if (element.childNodes[i].nodeType == 1) {
                    recurseDOM(element.childNodes[i]);
                }
            }
        } else {
            if ((element.tagName == "H1" || element.tagName == "H2" || element.tagName == "H3" || element.tagName == "H4" || element.tagName == "P" || element.tagName == "LI" || element.tagName == "BUTTON") && /\S/.test(element.innerText)) {
                console.log(element.tagName);
                console.log(element);
                element.innerText = element.innerText.replace(/(.*?)([^\w]("|&ldquo;|&quot;)?)?$/, '$1' + ', bro' + '$2');
            }
        }
    }
    var dom = document.getElementsByTagName('html')[0];
    recurseDOM(dom);
}
bro();