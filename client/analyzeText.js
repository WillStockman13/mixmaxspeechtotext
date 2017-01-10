const createElement = function(text, elementsCreated) {
  var span = document.createElement('span');
  var className = Math.random() * 1000000;
  span.className = className.toString();
  var textInput = document.createTextNode(text + ' ');
  span.appendChild(textInput);
  document.getElementById('sandBox').appendChild(span);
  elementsCreated.push({element: 'span', text: text + ' ', class: className.toString()}); 	
}

module.exports = {
  analyze: function(text) {
  if(text.indexOf('delete') >= 0) {
      this.elementsSelected.forEach(function(element) {
        console.log(this)
        this.elementsCreated.forEach(function(elements, i) {
          if(elements.class === element) {
            this.elementsCreated.splice(i, 1)
          }
        }.bind(this))
        var elem = document.getElementsByClassName(element)[0]; 
        elem.parentNode.removeChild(elem);
      }.bind(this))
    } else {
        createElement(text, this.elementsCreated)
    }
  },
  elementsCreated: [],
  elementsSelected: []
}