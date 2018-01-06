import * as _ from 'lodash';
import { Component, ElementRef, Input, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileUploadService } from './fileupload.service';

@Component({
    selector: 'file-upload',
    styleUrls: ['fileupload.component.scss'],
    templateUrl: './fileupload.component.html'
})
export class FileUploadComponent implements OnInit {
    @Input()
    public fileControl: FormControl;
    /**
     * Event fired when Upload is Complete
     * @event      onUploadComplete.
     */
    @Output() onUploadComplete: EventEmitter<any> = new EventEmitter();

    /**
     * Event fired where Delete is Complete
     * @event      onDeleteComplete.
     */
    @Output() onDeleteComplete: EventEmitter<any> = new EventEmitter();

    @ViewChild('fileInput') fileInput;

    constructor(public elementRef: ElementRef,
        public fileUploadService: FileUploadService) {
        this.onUploadComplete = new EventEmitter();
        this.onDeleteComplete = new EventEmitter();
    }

    // TODO: Agregar documentacion
    changeListener($event: any): void {
        let fi = this.fileInput.nativeElement;

        if (fi.files) {
            _.forEach(fi.files, (file, key) => {
                this.fileUploadService
                    .upload(file)
                    .subscribe(res => {
                        this.fileControl.value.push(res); // FIXME: estaba el _id quedo medio raro
                        this.onUploadComplete.emit();
                    });
            });
        }
    }

    // TODO: Agregar metodo de borrado y metodo http delete con delete de GridFs
    removeImage(id) {
        this.fileUploadService
            .delete(id)
            .subscribe(res => {
                _.remove(this.fileControl.value, (fileId) => {
                    return fileId === id;
                });
                this.onDeleteComplete.emit();
            });
    }

    ngOnInit() {
        this.fileControl.setValue(new Array<String>());
    }
}