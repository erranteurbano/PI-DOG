export function merget(left, right) {
    let arr = [];
    while (left.length && right.length) {
      const leftWeight = parseFloat(left[0].weight.split(" - ")[1]) || parseFloat(left[0].weight.split(" - ")[0]);
      const rightWeight = parseFloat(right[0].weight.split(" - ")[1]) || parseFloat(right[0].weight.split(" - ")[0]);
      
      if (isNaN(leftWeight)) {
        arr.push(left.shift());
      } else if (isNaN(rightWeight)) {
        arr.push(right.shift());
      } else {
        const leftAvg = (leftWeight + parseFloat(left[0].weight.split(" - ")[0])) / 2;
        const rightAvg = (rightWeight + parseFloat(right[0].weight.split(" - ")[0])) / 2;
        if (leftAvg < rightAvg) { // Cambia ">" a "<" para ordenar de menor a mayor
          arr.push(left.shift());
        } else {
          arr.push(right.shift());
        }
      }
    }
    return arr.concat(left.slice().concat(right.slice()));
  }
  
  export function Menor(arr) { // Cambia el nombre de la función a "Menor"
    if (arr.length < 2) {
      return arr;
    }
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    return merget(Menor(left), Menor(right)); // Cambia "Mayor" a "Menor"
  }
  