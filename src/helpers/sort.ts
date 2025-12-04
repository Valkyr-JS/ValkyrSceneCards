import type { IPerformerFragment } from "@pluginTypes/stashPlugin";

export function sortPerformers<T extends IPerformerFragment>(
  performers: T[],
  performerGenderFilter: string
) {
  const ret = performers.slice();
  ret.sort((a, b) => {
    if (a.gender === b.gender) {
      // sort by name
      return (a.name ?? "").localeCompare(b.name ?? "");
    }

    // TODO - may want to customise gender order
    const aIndex = a.gender ? GENDERS.indexOf(a.gender) : GENDERS.length;
    const bIndex = b.gender ? GENDERS.indexOf(b.gender) : GENDERS.length;
    return aIndex - bIndex;
  });

  // Filter out genders not included by the user
  if (performerGenderFilter.length) {
    const genderList = [
      "FEMALE",
      "TRANSGENDER_FEMALE",
      "MALE",
      "TRANSGENDER_MALE",
      "INTERSEX",
      "NON_BINARY",
    ];

    const acceptedGenders = performerGenderFilter
      .split(",")
      .map((str) => {
        // Sanitise the string to allow for case and grammar differences
        const s = str
          .trim()
          .toUpperCase()
          .split(" ")
          .join("_")
          .split("-")
          .join("_");
        return genderList.includes(s) ? s : null;
      })
      .filter((x) => x !== null);

    return ret.filter(
      (p) => !!p.gender && acceptedGenders.includes(p.gender as string)
    );
  }

  return ret;
}

const SortUtils = {
  sortPerformers,
};

export default SortUtils;

/** `enum GenderEnum` as an array. */
export const GENDERS = [
  "FEMALE",
  "TRANSGENDER_FEMALE",
  "MALE",
  "TRANSGENDER_MALE",
  "INTERSEX",
  "NON_BINARY",
] as GenderEnum[];
