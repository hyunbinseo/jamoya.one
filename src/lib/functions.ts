let downloadCounter = 0;

const downloadFileWithAnchor = (file: File) => {
  const anchor = document.createElement('a');
  const objectUrl = URL.createObjectURL(new Blob([file]));
  anchor.href = objectUrl;
  anchor.download = file.name.normalize('NFC');
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(objectUrl);
};

export const downloadFile = (file: File) => {
  // Without timeout, Chromium limits simultaneous downloads to 10 files
  setTimeout(() => downloadFileWithAnchor(file), downloadCounter * 200);
  downloadCounter += 1;
};

export const downloadFiles = (files: FileList) => {
  downloadCounter = 0;
  for (let i = 0; i < files.length; i += 1) {
    downloadFile(files[i]);
  }
};

const isFile = (item: FileSystemEntry): item is FileSystemFileEntry => (item.isFile);
const isDirectory = (item: FileSystemEntry): item is FileSystemDirectoryEntry => (item.isDirectory);

const scanAndDownloadFiles = (item: FileSystemEntry) => {
  if (isFile(item)) {
    // Skip download of hidden files
    if (item.name.charAt(0) !== '.') item.file((file) => downloadFile(file));
  }
  if (isDirectory(item)) {
    const directoryReader = item.createReader();
    directoryReader.readEntries((entries) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      entries.forEach((entry) => scanAndDownloadFiles(entry));
    });
  }
};

export const downloadItems = (items: DataTransferItemList) => {
  downloadCounter = 0;
  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    if (item.webkitGetAsEntry) {
      scanAndDownloadFiles(item.webkitGetAsEntry());
    } else if (item.kind === 'file') {
      downloadFile(items[i].getAsFile());
    }
  }
};
