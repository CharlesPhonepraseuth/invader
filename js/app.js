var app = {
  
  /**
   * to initialize the app
   */
  init() {
    // we declare a property who will help us to manipulate the DOM
    app.formElement = document.querySelector('.configuration');
    app.boardElement = document.querySelector('.board');
    // on the click, we change the color
    app.boardElement.addEventListener('click', app.handleCellClick);

    // we declare property wo will help us to update the board
    app.gridSizeInput = app.createInput('Taille de la grille');
    app.pixelSizeInput = app.createInput('Taille des pixels');
    // we create buttons who will make the app more interactive
    app.createButtons(['valider', 'réinitialiser']);

    //on the click, we update the board
    var submitButtons = document.querySelectorAll('.button');
    submitButtons.forEach(element => element.addEventListener('click', app.handleFormSubmit));

    // when start for the first time, we create a grid to render something to the user
    app.createGrid(13, 40);
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
  },

  /**
   * create buttons from array of text
   * @param {array} values contain text to insert 
   */
  createButtons(values) {
    values.forEach(element => {
      var buttonElement = document.createElement('button');
      buttonElement.className = 'button';
      buttonElement.type = 'submit';
      buttonElement.textContent = element;
      app.formElement.appendChild(buttonElement);
    });
  },

  /**
   * to update the board depend on which button who were clicked
   * @param {event} event event received from addEventListener
   */
  handleFormSubmit(event) { 
    event.preventDefault();
    // before to treat something, we delete all error message if an old one occured
    var errorMessage = document.querySelectorAll('.errorMessage');
    errorMessage.forEach(element => app.formElement.removeChild(element));

    var action = event.target.textContent;
    
    // we adapt the board with gridSize and pixelSize properties
    if (action === 'valider') {
      // we check each input if an error occured
      var error = app.checkError([parseInt(app.gridSizeInput.value, 10), parseInt(app.pixelSizeInput.value,10)]);
      if (error.length > 0) {
        app.sendErrorMessage(error);
      } else {
        // first, we remove the board before create a new one
        app.boardElement.innerHTML = '';
        app.createGrid(app.gridSizeInput.value, app.pixelSizeInput.value);
      }
    } else if (action === 'réinitialiser') {
      app.resetColorGrid();
    };
  },

  /**
   * to create the boad depend on user input
   * @param {*} size number of cells
   * @param {*} pixelSize
   */
  createGrid(size, pixelSize) {
    // for each iteration of size, we create a new line
    for (var rowCounter = 0; rowCounter < size; rowCounter++) {
      var newRowElement = app.createLine();
      // same as above, we create a new cell
      for (var cellCounter = 0; cellCounter < size; cellCounter++) {
        app.createCell(newRowElement, pixelSize);
      };
    };
  },

  /**
   * to create new line
   */
  createLine() {
    var rowElement = document.createElement('div');
    rowElement.className = 'ligne';
    app.boardElement.appendChild(rowElement);
    // we return the element to insert cells inside
    return rowElement;
  },

  /**
   * to create new cell
   * @param {HTMLElement} parentRowElement the html element where we will append new html element
   * @param {*} pixelSize size of the cell in pixel
   */
  createCell(parentRowElement, pixelSize) {
    var cellElement = document.createElement('div');
    cellElement.className = 'cellule';
    cellElement.style.width = pixelSize + 'px';
    cellElement.style.height = pixelSize + 'px';
    parentRowElement.appendChild(cellElement);
  },

  /**
   * to toggle classname who will colorize the cell by css
   * @param {event} event event received from addEventListener
   */
  handleCellClick(event) {
    var clickedCell = event.target;
    clickedCell.classList.toggle('cellule--black');
  },

  /**
   * to reset the color by remove the concern css class
   */
  resetColorGrid() {
    var gridElement = document.querySelectorAll('.cellule--black');
    gridElement.forEach(element => element.classList.remove('cellule--black'));
  },

  /**
   * to check if an error occured
   * @param {array} array contain input values 
   */
  checkError(array) {
    var errorList = [];

    for (let input of array) {
      if (isNaN(input)) {
        errorList.push('La valeur ne peut pas être vide');
      } else if (input <= 0) {
        errorList.push('La valeur doit être positive');
      } else if (input > 40) {
        errorList.push('La valeur doit être inférieur à 40')
      };
    };

    // we filter the array to remove duplicates
    var list = errorList.filter((value, index, self) => self.indexOf(value) === index)
    return list;
  },

  /**
   * 
   * @param {array} message contain error message
   */
  sendErrorMessage(message) {
    message.forEach(text => {
      var pElement = document.createElement('p');
      pElement.textContent = text;
      pElement.className = 'errorMessage';
      app.formElement.prepend(pElement);
    });
  }

};

// when the DOM is loaded, we start the property init who will launch the app
document.addEventListener('DOMContentLoaded', app.init);