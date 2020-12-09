import { PanelPlugin } from '@grafana/data';
import { TimestampImagePanelOptions } from './types';
import { TimestampImagePanel } from './TimestampImagePanel';

// supports url with param or without: https://server:host/path/<timestamp> or https://server:host/path?para=<timestamp>
export const plugin = new PanelPlugin<TimestampImagePanelOptions>(TimestampImagePanel).setPanelOptions(builder => {
  return builder.addTextInput({
    path: 'imageUrl',
    name: 'Image Url',
    description: 'Should contain an URL representing a service that delivers images (https://server:host/path/ or .../path?para=).',
    defaultValue: undefined,
  });
});
