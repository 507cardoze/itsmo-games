export const getPointsBattleRoyale = (
  placement: number,
  kills: number,
  limit: number,
): number | boolean => {
  if (placement > limit) return false;
  if (kills < 0) return false;

  switch (placement) {
    case 1:
      return 12 + kills;
    case 2:
      return 9 + kills;
    case 3:
      return 7 + kills;
    case 4:
      return 5 + kills;
    case 5:
      return 4 + kills;
    case 6 || 7:
      return 3 + kills;
    case 8 || 9 || 10:
      return 2 + kills;
    case 11 || 12 || 13 || 14 || 15:
      return 1 + kills;
    default:
      return 0 + kills;
  }
};

// const Partidos = [
//   {
//     equipos: [
//       {
//         name: 'Elite Gaming',
//         players: [
//           {
//             name: 'Hogan',
//             puntos: {
//               kills: 123,
//               damage: 123012,
//               pick: '',
//             },
//           },
//           {
//             name: 'Anthony',
//             puntos: {
//               kills: 123,
//               damage: 123012,
//               pick: '',
//             },
//           },
//         ],
//       },
//     ],
//   },
// ];

//Partido 1 > equipos > jugadores > puntos
