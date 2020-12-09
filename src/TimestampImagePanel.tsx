import React, { useRef } from 'react';
import { PanelProps } from '@grafana/data';
import { TimestampImagePanelOptions } from 'types';
import { css, cx } from 'emotion';
import { stylesFactory } from '@grafana/ui';
import { SystemJS } from '@grafana/runtime';

const PLACEHOLDER_IMAGEURL = 'public/plugins/fzj-grafana-timestamp-image/img/logo.svg';

interface Props extends PanelProps<TimestampImagePanelOptions> {}

export const TimestampImagePanel: React.FC<Props> = ({ options, data, width, height }) => {
  let imageUrl: string;
  let imageRef: any;

  const styles = getStyles();
  imageUrl = options.imageUrl;
  imageRef = useRef(null);
  initialize(imageUrl, imageRef);

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

const initialize = (imageUrl: string, imageRef: any) => {
  SystemJS.load('app/core/app_events').then((appEvents: any) => {
    // @ts-ignore
    appEvents.on('graph-click', async (e: any) => {
      if (e.item) {
        const timestamp = new Date(e.item.datapoint[0]).toJSON();
        try {
          const response = await fetch(`${imageUrl}/${timestamp}`);
          const imageBlob = await response.blob();
          const image = URL.createObjectURL(imageBlob);
          imageRef.current.src = image;
        } catch (exception) {
          console.log(exception);
        }
      }
    });
  });
};
