import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

/**
 * Manage FileUploads
 * @module FileUploadService
 */
@Injectable()
export class FileUploadService {
    constructor(private http: HttpClient) { }

    // TODO: Corregir documentacion
    /**
     * Upload file to database
     * @param  {Form} fileToUpload The file to upload to database
     */
    upload(fileToUpload: any) {
        let input = new FormData();
        input.append('file', fileToUpload);

        return this.http
            .post('/files', input);
    }

    /**
     * Delete file to database
     * @param  {String} id The Id of the file
     */
    delete(id: string) {
        return this.http
            .delete('/files/' + id);
    }
}