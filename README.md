# Valkyr Scene Cards

A rework of the scene card component for Stash.

## Requirements

To use this plugin you must be running version 0.26 or higher of Stash. No other dependencies are required.

## Installation

1. In Stash go to Settings > Plugins.
2. Under _Available Plugins_ click the Add Source button.
3. Fill out the fields in the popup form. The Name and Local Path fields can be whatever you like, but the Source URL needs to match the URL below. I recommend the following;
   - Name: Valkyr-JS
   - Source URL: https://valkyr-js.github.io/stash-plugins/index.yml
   - Local Path: Valkyr-JS
4. Click confirm and you should see a new line under _Available Plugins_ called "Valkyr-JS" (or whatever you entered for Name in the popup). Click this and you'll see my available plugins.
5. Check the _Valkyr Scene Cards_ checkbox and click Install in the top right of _Avaialable Plugins_.
6. (Optional) Configure the plugin via the _Plugins_ panel below _Available Plugins_. For example, to enable the performer gender colors, under _Valkyr Scene Cards_ toggle _Display performer names in gender colors_ on.
7. Go to the scenes page or home page and you should see the cards styled differently. You may need to refresh the page to see the changes.

## Performer avatar setup

By default, the plugin displays scene performers as text. This can be replaced with a list of avatars via the Plugins page.

1. To enable avatars, in Stash go to Settings > Plugins.
2. Under _Plugins_, scroll down to _Valkyr Scene Cards_.
3. Enable the option titled _Display the performer list as avatars_.

Returning to any page with scene cards, you should see the performer list now displaying as a series of text-based avatars, showing the performer's initials and their gender icon behind it.

### Profile image avatars

Performers' profile images can be used in place of the text-based avatars by enabling the option titled _Use performer profile images as avatars_. The top square section of the profile image is used, so results may vary depending on each individual image.

If a performer has no profile image - i.e. it uses the default Stash profile image - then the default text-based avatar will be used.

### Custom image avatars

You can use a custom image for each performer's avatar with some setup.

1. In Stash, create a new tag. The name doesn't matter but take note of the ID.
   - The tag ID can be found in the tag profile URL; it's the number after `/tags/`. For example, in the URL `http://localhost:xxxx/tags/1731/scenes?sortby=date`, the tag ID would be `1731`.
2. Go to Settings > Plugins
3. Under _Plugins_, scroll down to _Valkyr Scene Cards_.
4. Click Edit on the option titled _Set tag ID for custom performer avatars_.
5. Enter the ID of the tag you created.
6. Add your custom image/s to your Stash if you haven't already done so.
7. Tag each image with the tag you created, and also tag the associated performer.

Returning to any page with scene cards, you should see the performer list now displaying your custom images for the performers that you have made them for. If a custom images hasn't been created for a performer, it will fall back to the default text-based avatar, or use a profile image avatar if you have enabled them.

## Styling

I've tried to minimize the amount of theme-based styling such as colors, font appearance, etc. so that the cards are as compatible with theme plugins as possible straight out of the box. Where this couldn't be achieved, I've used CSS variables for easier custom styling. They have the following default values;

```
:root {
    --vsc-font-sm: 12px;
    --vsc-performer-avatar-bg-color: rgba(0, 0, 0, 0.6);
    --vsc-performer-avatar-initials-size: 18px;
    --vsc-performer-avatar-size: 60px;
    --vsc-resolution-icon-bg-color: #f5f8fa;
    --vsc-resolution-icon-color: #30404d;
    --vsc-top-line-opacity: 0.8;

    --vsc-preview-background-color: #000;

    --vsc-gender-color--female: #f38cac;
    --vsc-gender-color--intersex: #c8a2c8;
    --vsc-gender-color--male: #89cff0;
    --vsc-gender-color--nonbinary: #c8a2c8;
    --vsc-gender-color--transfemale: #c8a2c8;
    --vsc-gender-color--transmale: #c8a2c8;
    --vsc-gender-color--unknown: #f5f8fa;
}
```

To adapt them, copy and paste the above into Settings > Interface > Custom CSS (make sure the _Custom CSS enabled_ option is on), then change the values as needed. This will override the default values.

If other variables are required, please [raise an issue on the Github page](https://github.com/Valkyr-JS/ValkyrSceneCards/issues). Variables will only be created where beneficial. For example, this plugin does not change the card's `border-radius`, so adding a variable here serves no purpose.
