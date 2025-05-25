import { default as cx } from "classnames";
const { PluginApi } = window;
const { React } = PluginApi;

const OverflowPopover: React.FC<OverflowPopoverProps> = (props) => {
  /**
   * ! There is an issue with the HoverPopover component which is likely
   * happening in the PluginApi. The component only loads if called on an page
   * other than the first. I.e. it doesn't work on a hard refresh or if the
   * performer profile page is navigated to directly. Bug raised at
   * https://github.com/stashapp/stash/issues/5479 for the same issue in another
   * component.
   */
  const [componentsReady, setComponentsReady] = React.useState(false);

  // ? Short-term workaround for the above bug. Use a timeout to wait for the
  // PluginApi to fully load before continuing.
  setTimeout(() => setComponentsReady(true), 100);

  if (!componentsReady) return null;

  const { HoverPopover } = window.PluginApi.components;

  const content = (
    <>
      {props.items.map(({ data, link }, i) => {
        const containerClasses = cx("performer-tag-container", "row", {
          // Class added for styling studio tags, which don't exist in native
          // Stash.
          ["studio-tag-container"]: props.type === "studio",
        });

        return (
          <div className={containerClasses}>
            <a href={link} className="performer-tag col m-auto">
              <img
                className="image-thumbnail"
                alt={data.name ?? ""}
                src={data.image_path ?? ""}
              />
            </a>
            <span className="tag-item d-block badge badge-secondary">
              <a href={link}>
                <span>{data.name}</span>
              </a>
            </span>
          </div>
        );
      })}
    </>
  );

  return (
    <HoverPopover
      className="overflow-popover"
      children={props.children}
      content={content}
      leaveDelay={100}
      placement="bottom"
    ></HoverPopover>
  );
};

export default OverflowPopover;

type OverflowPopoverProps =
  | PerformerOverflowPopoverProps
  | StudioOverflowPopoverProps;

interface StudioOverflowPopoverProps extends React.PropsWithChildren {
  items: {
    data: Studio;
    link: string;
  }[];
  type: "studio";
}

interface PerformerOverflowPopoverProps extends React.PropsWithChildren {
  items: {
    data: Performer;
    link: string;
  }[];
  type: "performer";
}
