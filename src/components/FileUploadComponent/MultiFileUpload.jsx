import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import { Divider } from 'primereact/divider';
import axios from 'axios';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default function MultiFileUpload() {
    const toast = useRef(null);
    const [totalSize, setTotalSize] = useState(0);
    const [fileContents, setFileContents] = useState([]);
    const fileUploadRef = useRef(null);

    const formatSize = (size) => {
        if (size === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(size) / Math.log(k));
        return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        let files = e.files;

        Object.keys(files).forEach((key) => {
            _totalSize += files[key].size || 0;
        });

        setTotalSize(_totalSize);
    };

    const handleUploadAsDataURL = async () => {
        const files = fileUploadRef.current?.getFiles();
        if (!files) return;

        const promises = Array.from(files).map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    resolve({ name: file.name, type: file.type, content: reader.result });
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        try {
            const results = await Promise.all(promises);
            setFileContents(results);
            toast.current.show({ severity: 'info', summary: 'Success', detail: 'Files uploaded as Data URL' });

            // Send the data to the dummy API
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', { files: results });
            console.log(response.data);
            toast.current.show({ severity: 'success', summary: 'API Success', detail: 'Files submitted successfully' });
        } catch (error) {
            console.error('Error reading files', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to upload files' });
        }
    };

    const handleUploadAsText = async () => {
        const files = fileUploadRef.current?.getFiles();
        if (!files) return;

        const promises = Array.from(files).map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    resolve({ name: file.name, type: file.type, content: reader.result });
                };
                reader.onerror = reject;
                reader.readAsText(file);
            });
        });

        try {
            const results = await Promise.all(promises);
            setFileContents(results);
            toast.current.show({ severity: 'info', summary: 'Success', detail: 'Files uploaded as Text' });

            // Send the data to the dummy API
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', { files: results });
            console.log(response.data);
            toast.current.show({ severity: 'success', summary: 'API Success', detail: 'Files submitted successfully' });
        } catch (error) {
            console.error('Error reading files', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to upload files' });
        }
    };

    const onTemplateUpload = (e) => {
        let _totalSize = totalSize;

        e.files.forEach((file) => {
            _totalSize += file.size || 0;
        });

        setTotalSize(_totalSize);
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
    };

    const headerTemplate = (options) => {
        const { className, chooseButton, cancelButton } = options;
        const formattedValue = totalSize > 0 ? formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {cancelButton}
                <div className="flex align-items-center gap-3 ml-auto" style={{ padding: '0.5rem', backgroundColor: '#f4f4f4', borderRadius: '0.5rem' }}>
                    <span style={{ fontWeight: 'bold' }}>Total Size:</span>
                    <span>{formattedValue}</span>
                </div>
            </div>
        );
    };

    const itemTemplate = (file, props) => {
        return (
            <div style={{ width: '100%' }}>
                <div className="flex align-items-center flex-wrap" style={{ padding: '0.5rem 0' }}>
                    <div className="flex align-items-center" style={{ width: '40%' }}>
                        {file.type.startsWith('image/') ? (
                            <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                        ) : (
                            <span className="pi pi-file" style={{ fontSize: '2em', marginRight: '1em' }}></span>
                        )}
                        <span className="flex flex-column text-left ml-3">
                            {file.name}
                            <small>{new Date().toLocaleDateString()}</small>
                        </span>
                    </div>
                    <Tag value={formatSize(file.size)} severity="warning" className="px-3 py-2" />
                    <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
                </div>
                <Divider />
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                    Drag and Drop Image Here
                </span>
            </div>
        );
    };

    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

    return (
        <div>
            <Toast ref={toast}></Toast>

            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

            <FileUpload ref={fileUploadRef} name="demo[]" url="/api/upload" multiple accept="*" maxFileSize={10000000}
                onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                chooseOptions={chooseOptions} cancelOptions={cancelOptions} />

            <div className="flex justify-content-between" style={{ marginTop: '1rem' }}>
                <Button label="Upload as Data URL" icon="pi pi-cloud-upload" className="p-button-success" onClick={handleUploadAsDataURL} />
                <Button label="Upload as Text" icon="pi pi-cloud-upload" className="p-button-info" onClick={handleUploadAsText} />
            </div>

            <div style={{ maxHeight: '300px', overflowY: 'auto', marginTop: '1rem' }}>
                {fileUploadRef.current && fileUploadRef.current.getFiles() && Array.from(fileUploadRef.current.getFiles()).map((file, index) => (
                    <React.Fragment key={index}>
                        {itemTemplate(file, { onRemove: () => fileUploadRef.current.remove(file), formatSize })}
                    </React.Fragment>
                ))}
            </div>

            <div style={{ marginTop: '1rem' }}>
                <h5>File Contents</h5>
                <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ddd', padding: '1rem' }}>
                    {fileContents.map((file, index) => (
                        <div key={index} style={{ marginBottom: '1rem' }}>
                            <h6>{file.name}</h6>
                            {file.type.startsWith('image/') ? (
                                <img src={file.content} alt={file.name} style={{ maxWidth: '100%' }} />
                            ) : (
                                <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{file.content}</pre>
                            )}
                            <Divider />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
