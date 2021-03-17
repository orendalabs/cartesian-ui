export class ListHelper {
  /**
   * Compares values in two lists regardless of order of appearance.
   * @param listA First List
   * @param listB Second List
   * @param property Compares given property of each element in the lists
   * @returns `true` if data is same, `false` otherwise
   */
  static compareListData(
    listA: Array<any>,
    listB: Array<any>,
    property?: string
  ) {
    if (listA.length !== listB.length) {
      return false;
    }

    if (property) {
      return !listA.some((itemA) => {
        return !listB.find((itemB) => itemB[property] === itemA[property]);
      });
    } else {
      return !listA.some((itemA) => {
        return !listB.find((itemB) => itemB === itemA);
      });
    }
  }
}
