/**
 Objet: Algo Num tp4
 Date: 19 avril 2019

 Tristan Seuret
 Nathan Latino
 Jonas Vallat
 Sol Rosca
 */

function taylor(x) {
  let result = 0;
  let i = 0;
  let element = 1;

  //Dans cette boucle, on calcule les éléments la methode de Taylor et on les
  // ajoute au résultat (x^0)/0! - (x^2)/2! + (x^4)/4! ... etc On continue
  // jusqu'à ce que les résultats obtenus soient trop faibles pour JavaScript
  // et soient donc égaux à 0
  while (element != 0) {
    element = Math.pow(-1, i);		// détermine si l'élément est positif ou négatif
    for (let j = 1; j <= 2 * i; j++) {
      element *= x;				// augmente la puissance de x
      element /= (j < 2) ? 1 : j; // augmente le diviseur
    }
    i++;
    result += element;		//on ajoute l'élément obtenu au résultat
  }
  return result;
}

function derivative(f, h) {
  let func = function (x) {
    //On utilise la méthode de Richardson pour créer la fonction dérivée
    return (8 * (f(x + (h / 2)) - f(x - (h / 2))) - f(x + h) + f(x - h)) /
      (6 * h);
  };
  return func;
}

function main() {
  let h = document.getElementById('h').value;
  h = parseFloat(h);

  let min = document.getElementById('minRange').value;
  min = parseFloat(min);

  let max = document.getElementById('maxRange').value;
  max = parseFloat(max);

  let firstDerivative = derivative(taylor, h);
  let secondDerivative = derivative(firstDerivative, h);


  let traceCos = calculTrace(taylor, `cos(x)`, min, max);
  let traceCosPrim = calculTrace(firstDerivative, `cos'(x)`, min, max,);
  let traceCosSecond = calculTrace(secondDerivative, `cos''(x)`, min, max);

  let data = [traceCos, traceCosPrim, traceCosSecond];

  let layout = {
    xaxis: {range: [min, max]},
    yaxis: {range: [-1.2, 1.2]},
    hovermode: 'closest',
  };

  Plotly.newPlot(graphique, data, layout);
}

function calculTrace(func, name, min, max) {

  let dx = 0.1;
  let trace = {};
  trace.type = 'scatter';
  trace.x = [];
  trace.y = [];
  trace.name = name;

  let x = min;

  while (x < max) {
    trace.x.push(x);
    trace.y.push(func(x));
    x += dx;
  }

  return trace;
}
