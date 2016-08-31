let numeral = require(`numeral`);

class Numeral {
  constructor() {
    numeral.language('br', {
      delimiters: {
        decimal: ','
      },
      currency: {
          symbol: 'R$'
      }
    });

    numeral.language(`br`);
  }

  real(price) {
    return numeral(price).format(`$ 0.00`);
  }
}

module.exports = new Numeral();
