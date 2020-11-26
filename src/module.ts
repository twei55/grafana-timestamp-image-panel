import { PanelPlugin } from '@grafana/data';
import { TimestampImagePanelOptions } from './types';
import { TimestampImagePanel } from './TimestampImagePanel';

export const plugin = new PanelPlugin<TimestampImagePanelOptions>(TimestampImagePanel).setPanelOptions(builder => {
  return builder.addTextInput({
    path: 'imageUrl',
    name: 'Image Url',
    description: 'Should contain an URL representing a service that delivers images.',
    defaultValue: undefined,
  });
});
