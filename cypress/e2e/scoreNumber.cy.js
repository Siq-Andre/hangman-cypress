describe('Check game score in win streak and in game lose scenario', () => {
    let arrayLetters = [];
    let scorePoints = 1;
  
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
    beforeEach(() => {
      cy.visit('/');
      cy.window().then((window) => {
        // Stub 'console.log' apenas uma vez antes dos testes
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
  
        // Clica nas letras que estão no arrayLetters
        arrayLetters.forEach((letra) => {
          if (!clickedLetters.has(letra)) {
            cy.get(`[data-test="letter-button-${letra}"]`).click();
            clickedLetters.add(letra);
          }
        });
  
        // Verifica a pontuação atual
        cy.get(`[data-test="score"]`)
          .should('exist')
          .and('have.text', `Pontuação: ${scorePoints++}`);
  
        // Clica no botão de novo jogo
        cy.get(`[data-test="btn-newGame"]`).click();
      });
    }
  
    it('plays multiple rounds and verifies the score', () => {
      // Executa o jogo por várias rodadas
      playGameRound();
      playGameRound();
      playGameRound();
      playGameRound();
  
      // Última rodada, verificando se a pontuação volta a 0
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
        cy.get(`[data-test="score"]`).should('exist').and('have.text', `Pontuação: 0`);
      });
    });
  });
  