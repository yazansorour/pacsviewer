import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Icon, Thumbnail, Tooltip } from '@ohif/ui';

const ThumbnailTracked = ({
  className,
  imageSrc,
  imageAltText,
  description,
  seriesNumber,
  numInstances,
  dragData,
  onClick,
  viewportIdentificator,
  isTracked,
  isActive,
}) => {
  const trackedIcon = isTracked ? 'circled-checkmark' : 'dotted-circle';

  return (
    <div
      className={classnames(
        'flex flex-row flex-1 px-3 py-2 showExcludeButtonOnHover cursor-pointer outline-none',
        className
      )}
    >
      <div className="flex flex-col items-center flex-2">
        <div
          className={classnames(
            'flex flex-col items-center justify-start p-2 mb-2 relative cursor-pointer',
            isTracked && 'rounded-sm hover:bg-gray-900'
          )}
        >
          <Tooltip
            position="right"
            content={
              <div className="flex flex-row flex-1">
                <div className="flex flex-col flex-1 pr-4">
                  <span>
                    Series is <span className="text-white">tracked</span>
                  </span>
                  {viewportIdentificator && (
                    <span>
                      in viewport
                      <span className="ml-1 text-white">
                        {viewportIdentificator}
                      </span>
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-center flex-2">
                  <Icon name="info-link" className="text-primary-active" />
                </div>
              </div>
            }
          >
            <Icon name={trackedIcon} className="w-4 mb-2 text-primary-light" />
            <div className="h-5 text-xl leading-tight text-white">
              {viewportIdentificator}
            </div>
          </Tooltip>
        </div>
        {isTracked && (
          <Icon
            name="cancel"
            className="w-4 text-primary-active excludeButton"
          />
        )}
      </div>
      <Thumbnail
        imageSrc={imageSrc}
        imageAltText={imageAltText}
        dragData={dragData}
        description={description}
        seriesNumber={seriesNumber}
        numInstances={numInstances}
        isActive={isActive}
        onClick={onClick}
      />
    </div>
  );
};

ThumbnailTracked.propTypes = {
  /**
   * Data the thumbnail should expose to a receiving drop target. Use a matching
   * `dragData.type` to identify which targets can receive this draggable item.
   * If this is not set, drag-n-drop will be disabled for this thumbnail.
   *
   * Ref: https://react-dnd.github.io/react-dnd/docs/api/use-drag#specification-object-members
   */
  dragData: PropTypes.shape({
    /** Must match the "type" a dropTarget expects */
    type: PropTypes.string.isRequired,
  }),
  className: PropTypes.string,
  imageSrc: PropTypes.string,
  imageAltText: PropTypes.string,
  description: PropTypes.string.isRequired,
  seriesNumber: PropTypes.number.isRequired,
  numInstances: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  viewportIdentificator: PropTypes.string,
  isTracked: PropTypes.bool,
  isActive: PropTypes.bool.isRequired,
};

export default ThumbnailTracked;
