describe('check url access', () => {
    it('check if the basic url is working', () => {
      let arrayLetters = [];
      let clickedLetters = new Set(); 
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   
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

        const lettersNotInWord = Array.from(alphabet).filter(
            (letter) => !arrayLetters.includes(letter)
          );
   
          lettersNotInWord.forEach((letra) => {
          if (!clickedLetters.has(letra) && clickedLetters.size < 7) {
            
            cy.get(`[data-test="letter-button-${letra}"]`).click();
            clickedLetters.add(letra); 

          }
        });
      });
    });
  });