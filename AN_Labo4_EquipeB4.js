function myCos(x)
{
  var result = 0;
  var i = 0;
	var element = 1;
	
	//Dans cette boucle, on calcule les éléments la methode de Taylor et on les ajoute au résultat
	//(x^0)/0! - (x^2)/2! + (x^4)/4! ... etc
  //On continue jusqu'à ce que les résultats obtenus soient trop faibles pour JavaScript et soient donc égaux à 0
	while (element != 0)
    {
      element = Math.pow(-1,i);		// détermine si l'élément est positif ou négatif
      for(var j = 1; j <= 2*i; j++)
      {
        element *= x;				// augmente la puissance de x
        element /= (j < 2) ? 1 : j; // augmente le diviseur
      }
		  i++;
      result += element;		//on ajoute l'élément obtenu au résultat
    }
    return result;
}

function derivate(f,h)
{
  var func = function(x)
  {
    //On utilise la méthode de Richardson pour créer la fonction dérivée
    return (8*(f(x+(h/2))-f(x-(h/2))) -f(x+h) +f(x-h)) /(6*h);
  }
  return func;
}


  function main()
  {
    var h = document.getElementById("h").value;
    h = parseFloat(h);

    var min = document.getElementById("minRange").value;
    min = parseFloat(min);

    var max = document.getElementById("maxRange").value;
    max = parseFloat(max);

    var primeDerivate = derivate(myCos,h);
    var secondDerivate = derivate(primeDerivate,h);

    var dx = 0.1;

    var traceCos = calculTrace(traceCos, myCos, dx, "cos(x)", min, max);
    var traceCosPrim = calculTrace(traceCosPrim, primeDerivate, dx, "cos'(x)", min, max);
    var traceCosSecond = calculTrace(traceCosSecond, secondDerivate ,dx, "cos''(x)", min, max);

    var data = [traceCos, traceCosPrim,traceCosSecond];

    var layout = {
      xaxis: {
      range: [min,max]

      },
      yaxis: {
      range: [-1.2,1.2]

      },
      hovermode: 'closest'
    };

    Plotly.newPlot(graphique, data, layout);
  }

  function calculTrace(trace, fonction, dx, name, min, max)
  {
    trace = {};
    trace.type = 'scatter';
    trace.x = [];
    trace.y = [];
    trace.name = name;

    var x = min;

    while (x < max)
    {
      trace.x.push(x);
      trace.y.push(fonction(x));
      x+=dx;
    }

    return trace;
  }
