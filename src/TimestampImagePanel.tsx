import React, { useRef } from 'react';
import { PanelProps } from '@grafana/data';
import { TimestampImagePanelOptions } from 'types';
import { css, cx } from 'emotion';
import { stylesFactory } from '@grafana/ui';
import { SystemJS } from '@grafana/runtime';

const PLACEHOLDER_IMAGEURL = 'public/plugins/fzj-grafana-timestamp-image/img/click-graph.svg';
const PROGRESS_IMAGEURL = 'public/plugins/fzj-grafana-timestamp-image/img/progress.svg';
const ERROR_IMAGEURL = 'public/plugins/fzj-grafana-timestamp-image/img/image-not-found.svg';

interface Props extends PanelProps<TimestampImagePanelOptions> {}

export const TimestampImagePanel: React.FC<Props> = ({ options, data, width, height }) => {
  let imageUrl: string;
  let imageExtension: string;
  let imageRef: any;

  const styles = getStyles();
  imageUrl = options.imageUrl;
  imageExtension = options.imageExtension;
  imageRef = useRef(null);
  initialize(imageUrl, imageRef, imageExtension);

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <img ref={imageRef} src={PLACEHOLDER_IMAGEURL} alt="Placeholder" width={width} height={height} />
    </div>
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
    `,
    img: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
  };
});

const initialize = (imageUrl: string, imageRef: any, imageExtension: string) => {
  SystemJS.load('app/core/app_events').then((appEvents: any) => {
    // @ts-ignore
    appEvents.on('graph-click', async (e: any) => {
      if (e.item) {
        imageRef.current.src = PROGRESS_IMAGEURL;
        const timestamp = new Date(e.item.datapoint[0]).toJSON();
        const url = `${imageUrl}${timestamp.replace(/:/g, '-')}.${imageExtension}`;

        const response = await fetch(url);
        const imageBlob = await response.blob();

        if (imageBlob.type && imageBlob.type.includes('image')) {
          imageRef.current.src = URL.createObjectURL(imageBlob);
        } else {
          imageRef.current.src = ERROR_IMAGEURL;
        }
      }
    });
  });
};
