import { default as cx } from "classnames";
const { React } = window.PluginApi;

const TagBanner: React.FC<TagBannerProps> = (props) => {
  const classes = cx("vsc-tag-banner", props.className);

  return (
    <div className={classes}>
      <span>{props.displayName}</span>
    </div>
  );
};

export default TagBanner;

interface TagBannerProps {
  className: string;
  displayName: string;
}
