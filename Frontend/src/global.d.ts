export {};

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        invoke: (channel: string, data?: any) => Promise<any>;
        on: (channel: string, func: (...args: any[]) => void) => void;
        removeListener: (channel: string, func: (...args: any[]) => void) => void;
        send: (channel: string, data?: any) => void;
      };
    };
  }
}
