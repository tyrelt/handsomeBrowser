function test() {
    // Iterate over the document's text nodes
    // https://developer.mozilla.org/en-US/docs/Web/API/document.createTreeWalker
    var allText = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_ELEMENT,
        { 
            acceptNode: function(node) 
            { 
                return NodeFilter.FILTER_ACCEPT; 
            } 
        },
        false
    );
    var nodeList = [];
    while(allText.nextNode()) {
        nodeList.push(allText.currentNode);
    }
    // nodeList = document.getElementsByTag('span');
    for (var i = 0; i < nodeList.length; i++) {
        innerText = nodeList[i].innerText;
        innerText = innerText.replace(/(.*?)([^\w])?$/, '$1' + ', bro' + '$2');
        nodeList[i].innerHTML = innerText;
    }
}
test();