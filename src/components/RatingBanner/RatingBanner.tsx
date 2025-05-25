import {
  convertToRatingFormat,
  defaultRatingSystemOptions,
  RatingStarPrecision,
  RatingSystemType,
} from "@utils/rating";
const { React } = window.PluginApi;
const { FormattedMessage } = window.PluginApi.libraries.Intl;

interface IProps {
  stashSettings: ConfigResult;
  rating?: number | null;
}

export const RatingBanner: React.FC<IProps> = (props) => {
  const ratingSystemOptions =
    props.stashSettings?.ui.ratingSystemOptions ?? defaultRatingSystemOptions;
  const isLegacy =
    ratingSystemOptions.type === RatingSystemType.Stars &&
    ratingSystemOptions.starPrecision === RatingStarPrecision.Full;

  const convertedRating = convertToRatingFormat(
    props.rating ?? undefined,
    ratingSystemOptions
  );

  return props.rating ? (
    <div
      className={
        isLegacy
          ? `rating-banner rating-${convertedRating}`
          : `rating-banner rating-100-${Math.trunc(props.rating / 5)}`
      }
    >
      <FormattedMessage id="rating" />: {convertedRating}
    </div>
  ) : (
    <></>
  );
};
