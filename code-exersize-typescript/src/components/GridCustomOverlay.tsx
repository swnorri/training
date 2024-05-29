/**
 * Found this on the internet, wanted to use the customeLoadingOverlay.
 * Modified it somewhat to reduce the presentation to just a message
 */
import { 
    ICellRendererComp, 
    ICellRendererParams 
} from '@ag-grid-community/core';

export class CustomLoadingOverlay implements ICellRendererComp {
    eGui!: HTMLElement;

    init(params: ICellRendererParams & { message: string }) {
        this.eGui = document.createElement('div');
        this.eGui.innerHTML = `<div class="ag-overlay-loading-center" role="presentation"><div aria-live="polite" aria-atomic="true">${params.message}</div></div>`;
    }
    getGui() {
        return this.eGui;
    }
    refresh(): boolean {
        return false;
    }
}