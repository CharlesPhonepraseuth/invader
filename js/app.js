var app = {
  
  /**
   * to initialize the app
   */
  init() {
    // we declare a property who will help us to manipulate the DOM
    app.formElement = document.querySelector('.configuration');

    // we declare property wo will help us to update the board
    app.gridSizeInput = app.createInput('Taille de la grille');
    app.pixelSizeInput = app.createInput('Taille des pixels');
  },

  /**
   * to create an input number
   * @param {string} placeholder text to display inside the input
   */
  createInput(placeholder) {
    var inputElement = document.createElement('input');
    inputElement.className = 'input';
    inputElement.type = 'number';
    inputElement.placeholder = placeholder;
    inputElement.min = 1;
    inputElement.max = 40;
    app.formElement.appendChild(inputElement);

    return inputElement;
  }

};

// when the DOM is loaded, we start the property init who will launch the app
document.addEventListener('DOMContentLoaded', app.init);