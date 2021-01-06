import { PanelPlugin } from '@grafana/data';
import { TimestampImagePanelOptions } from './types';
import { TimestampImagePanel } from './TimestampImagePanel';

// supports url with param or without: https://server:host/path/<timestamp> or https://server:host/path?para=<timestamp>
export const plugin = new PanelPlugin<TimestampImagePanelOptions>(TimestampImagePanel).setPanelOptions(builder => {
  return builder
    .addTextInput({
      path: 'imageUrl',
      name: 'Image Url',
      description:
        'URL to a folder (e.g. https://server:host/path/) containing images that follow the naming scheme [yyyy]-[mm]-[dd]T[HH]-[MM]-[SS].000Z.[extension]',
      defaultValue: undefined,
    })
    .addSelect({
      path: 'imageExtension',
      defaultValue: 'jpg',
      name: 'Image File Extension',
      settings: {
        options: [
          { value: 'gif', label: 'GIF' },
          { value: 'jpg', label: 'JPEG' },
          { value: 'png', label: 'PNG' },
          { value: 'svg', label: 'SVG' },
        ],
      },
    });
});
