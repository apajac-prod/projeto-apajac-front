export const getCarsAnwserByPoints = (pontos: number | undefined) => {
  switch (pontos) {
    case 0:
      return 0;

    case 1.5:
      return 1;

    case 2.5:
      return 2;

    case 3.5:
      return 3;
  }

  throw Error("CARS ANWSER points invalid!");
};
