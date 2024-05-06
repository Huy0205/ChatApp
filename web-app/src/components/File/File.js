import './file.scss';
import DownloadLink from 'react-download-link';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

import {
    extraTimeStamp,
    fileIcons,
    fileLink,
    extractFileName,
    extractFileSize,
    extractFileExtension,
} from '../../utils/fileUtil';
import { useContext, useState } from 'react';
import { PreviewContext } from '../../providers/PreviewProvider/PreviewProvider';
import OverLay from '../Overlay/Overlay';
import Loading from '../Loading/Loading';
export default function File({ messageTime, content }) {
    const FileName = extraTimeStamp(extractFileName(content));
    const fileExtension = extractFileExtension(FileName);
    const fileSize = extractFileSize(content);

    const iconFile = fileIcons.find((item) => item?.type.includes(fileExtension))?.icon;

    const { previewFile, setPreviewFile, filename, setFilename} =useContext(PreviewContext);
 
    return (
        <>

            <div
                onClick={() => {
                    setPreviewFile(fileLink(FileName))
                }}
                className=""
            >
                <div className="file_main d-flex">
                    <img src={iconFile} />
                    <div className="file_infor">
                        <div className="file_name mb-3">{FileName}</div>
                        <div className="file_size d-flex justify-content-between align-items-center">
                            <span className="file_size">{fileSize}</span>
                            <DownloadLink
                                label="Save"
                                filename={fileLink(FileName)}
                                exportFile={() => 'My cached data'}
                            />
                        </div>
                    </div>
                </div>
               
            </div>
        </>
    );
}
