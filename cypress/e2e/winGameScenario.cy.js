describe('check url access', () => {
    it('check if the basic url is working', () => {
      let arrayLetters = [];
      let clickedLetters = new Set(); 
   
      cy.visit('/'); 
   
      cy.window().then((window) => {
        cy.stub(window.console, 'log').callsFake((message) => {
          if (Array.isArray(message) && message.every(char => typeof char === 'string')) {
            arrayLetters = message;
          }
        });
      });
   
      cy.wait(2500).then(() => {
        expect(arrayLetters.length).to.be.greaterThan(0);
   
        arrayLetters.forEach((letra) => {
          if (!clickedLetters.has(letra)) {
            cy.get(`[data-test="letter-button-${letra}"]`).click();
            clickedLetters.add(letra); 
          }
        });
      });
    });
  });