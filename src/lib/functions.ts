export const downloadFile = (file: File) => {
  const anchor = document.createElement('a');
  const objectUrl = URL.createObjectURL(new Blob([file]));
  anchor.href = objectUrl;
  anchor.download = file.name.normalize('NFC');
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(objectUrl);
};

export const downloadFiles = (files: FileList) => {
  for (let i = 0; i < files.length; i += 1) {
    downloadFile(files[i]);
  }
};

export const downloadItems = (items: DataTransferItemList) => {
  for (let i = 0; i < items.length; i += 1) {
    if (items[i].kind === 'file') {
      downloadFile(items[i].getAsFile());
    }
  }
};

export default {};
