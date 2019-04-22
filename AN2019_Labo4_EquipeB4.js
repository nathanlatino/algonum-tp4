/**
 Objet: Algo Num tp4
 Date: 19 avril 2019

 Tristan Seuret
 Nathan Latino
 Jonas Vallat
 Sol Rosca
 */

class Cos {
  /**
   * Cos and it's first and second derivatives.
   * @param x range
   * @param n Taylor's iterations
   * @param h dx
   */
  constructor(x, n, h) {
    this.x = x;
    this.n = n;
    this.h = h;

    this.values = {
      x: [],
      cos: {y: [], label: `True cos`},
      taylor: {y: [], label: `Taylor's cos`},
      firstDerivative: {y: [], label: `cos'`},
      secondDerivative: {y: [], label: `cos''`},
    };

    this.solve();
  }

  /**
   * Entry point of the computation.
   */
  solve() {
    for (let i = -this.x; i < this.x; i += 0.1) {
      this.values.cos.y.push(Math.cos(i));
      this.values.taylor.y.push(this.taylor(i));
      this.values.firstDerivative.y.push(this.firstDerivative(i));
      this.values.secondDerivative.y.push(this.secondDerivative(i));
      this.values.x.push(i);
    }
  }

  taylor(x) {
    let res = 0;
    for (let i = 0; i <= this.n / 2; i++) {
      res += (Math.pow(-1, i) / facto(2 * i)) * (Math.pow(x, 2 * i));
    }
    return res;
  }

  /**
   * Use Richardson's extrapolation to compute a derivative.
   */
  firstDerivative(x) {
    let a = this.taylor(x + (this.h / 2), this.n);
    let b = this.taylor(x - (this.h / 2), this.n);
    let c = this.taylor(x + this.h, this.n);
    let d = this.taylor(x - this.h, this.n);
    return (8 * (a - b) - c + d) / (6 * this.h);
  }

  secondDerivative(x) {
    let a = this.taylor(x + this.h, this.n);
    let b = this.taylor(x - this.h, this.n);
    let c = this.taylor(x, this.n);
    return (a + b - 2 * c) / (this.h * this.h);
  }
}

function facto(x) {
  if (x < 0) {
    alert('facoriel error');
  } else {
    return (x === 0) ? 1 : x * facto(x - 1);
  }
}
