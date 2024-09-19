describe('Check game score in win streak and in game lose scenario', () => {
    let arrayLetters = [];
    let scorePoints = 1;
  
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
    beforeEach(() => {
      cy.visit('/');
      cy.window().then((window) => {
        if (!window.console.log.isSinonProxy) {
          cy.stub(window.console, 'log').callsFake((message) => {
            if (Array.isArray(message) && message.every(char => typeof char === 'string')) {
              arrayLetters = message;
            }
          });
        }
      });
    });
  
    function playGameRound() {
      let clickedLetters = new Set();
  
      cy.wait(2500).then(() => {
        expect(arrayLetters.length).to.be.greaterThan(0);
  
        arrayLetters.forEach((letra) => {
          if (!clickedLetters.has(letra)) {
            cy.get(`[data-test="letter-button-${letra}"]`).click();
            clickedLetters.add(letra);
          }
        });
  
        cy.get(`[data-test="score"]`)
          .should('exist')
          .and('have.text', `${scorePoints++}`);
  
        cy.get(`[data-test="btn-newGame"]`).click();
      });
    }
  
    it('plays multiple rounds and verifies the score', () => {
      playGameRound();
      playGameRound();
      playGameRound();
      playGameRound();
  
      cy.get(`[data-test="btn-newGame"]`).click();
      let clickedLetters = new Set();
  
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
        let scorePointsZero = 0;
        cy.get(`[data-test="score"]`).should('exist').and('have.text', `${scorePointsZero}`);
      });
    });
  });
  