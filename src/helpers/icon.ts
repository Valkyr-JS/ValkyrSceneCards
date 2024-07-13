const { faMars, faTansgenderAlt, faVenus } =
  window.PluginApi.libraries.FontAwesomeSolid;

export const getPerformerGenderIcon = (gender: Performer["gender"]) => {
  switch (gender) {
    case undefined:
      return null;
    case "FEMALE":
      return faVenus;
    case "MALE":
      return faMars;
    default:
      return faTansgenderAlt;
  }
};
