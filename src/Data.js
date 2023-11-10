// export function loopOverResults(results, t) {
//   const fMax = [];
//   const fMin = [];
//   for (let i = 0; i < t; i++) {
//     let min = Infinity;
//     let max = -Infinity;
//     let maxIndex;

//     for (let j = 0; j < results.length; j++) {
//       if (Number(results[j].fX) > max) {
//         max = Number(results[j].fX);
//         maxIndex = Number(results[j].lp - 1);
//       }
//       if (Number(results[j].fX) < min) {
//         min = Number(results[j].fX);
//       }
//     }
//     let selectedObject = results.find((obj) => {
//       return (
//         Number(obj.newFx) === Number(max) &&
//         Number(obj.lp) !== Number(results[maxIndex].lp)
//       );
//     });

//     if (selectedObject) {
//       //prettier-ignore
//       results[selectedObject.lp - 1].xReal1 = results[selectedObject.lp - 1].xRealPoMutacji;
//       results[selectedObject.lp - 1].fX = results[selectedObject.lp - 1].newFx;
//     } else {
//       const dostepneObiekty = results.filter((obj) => obj.fX <= obj.newFx);
//       let randomIndex = Math.floor(Math.random() * dostepneObiekty.length);
//       let selectedIndex = results.find(
//         (obj) => obj.lp === results[randomIndex].lp
//       );
//       console.log(selectedIndex.lp - 1);
//       // while (results[randomIndex].newFx <= results[randomIndex].fX) {
//       //   randomIndex = Math.floor(Math.random() * results.length);
//       // }
//       results[selectedIndex.lp - 1].xReal1 =
//         results[selectedIndex.lp - 1].xRealPoMutacji;
//       results[selectedIndex.lp - 1].fX = max;
//     }
//     fMax.push(max);
//     fMin.push(min);
//     min = max = 0;
//   }
//   console.log(fMax, fMin);
//   return results;
// }
