export const downloadFile = (file: File) => {
  const anchor = document.createElement('a');
  anchor.href = URL.createObjectURL(new Blob([file]));
  anchor.download = file.name.normalize('NFC');
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
};

export const handleDragOver = (e: DragEvent) => {
  e.dataTransfer.dropEffect = 'copy';
};

export const handleDrop = ({ dataTransfer: { items, files } }: DragEvent) => {
  if (items) {
    // Use DataTransferItemList interface to access the file(s)
    for (let i = 0; i < items.length; i += 1) {
      // If dropped items aren't files, reject them
      if (items[i].kind === 'file') {
        downloadFile(items[i].getAsFile());
      }
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    for (let i = 0; i < files.length; i += 1) {
      downloadFile(files[i]);
    }
  }
};

export default {};
