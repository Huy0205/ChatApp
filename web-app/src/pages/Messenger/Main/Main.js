import './Main.scss';
import Chat from './Chat/Chat';
import Aside from './Aside/Aside';
import Slider from './Slider/Slider';
import { useContext } from 'react';
import { ConversationContext } from '../../../providers/ConversationProvider/ConversationProvider';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import { PreviewContext } from '../../../providers/PreviewProvider/PreviewProvider';
import { ViewPortContext } from '../../../providers/ViewPort/ViewPortProvider';
import clsx from 'clsx';
function Main() {
    const { conversation } = useContext(ConversationContext);
    const { previewFile, setPreviewFile } = useContext(PreviewContext);
    const { view, isViewConversation } = useContext(ViewPortContext);
    console.log('conversation >>>>', conversation);
    return (
        <div id="main_container" className={clsx('d-flex', !view.chat ? 'd-none' : '')}>
            {previewFile && (
                <>
                    <DocViewer
                        theme={{
                            primary: '#5296d8',
                            secondary: '#ffffff',
                            tertiary: '#5296d899',
                            textPrimary: '#ffffff',
                            textSecondary: '#5296d8',
                            textTertiary: '#00000099',
                            disableThemeScrollbar: false,
                        }}
                        documents={[{ uri: previewFile }]}
                        pluginRenderers={DocViewerRenderers}
                    />
                    <button
                        onClick={() => {
                            setPreviewFile('');
                        }}
                        type="button"
                        className="button-close-previewFile"
                        aria-label="Close"
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </>
            )}
            {conversation._id ? (
                <>
                    <Chat />
                    {/* <Aside/> */}
                </>
            ) : (
                <Slider />
            )}
        </div>
    );
}

export default Main;
