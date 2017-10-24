import { Http, Response, Headers } from '@angular/http';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../../@core/utils/http.service';
import { SocketService } from '../../shared/socket.service';

/**
 * Manage billing.
 * @module BillingService
 */
@Injectable()
export class BillingService {
    constructor(private httpService: HttpService
    ) { }

    /**
     * Associate card to customer
     */
    associateCard(cardId: string) {
        return this.httpService.post('/billing/card/associate/', { 'cardId': cardId })
            .map((response: Response) => {
                return this.httpService.response(response);
            })
            .catch((error: Response) => {
                return this.httpService.catch(error);
            });
    }

    /**
     * Get customer cards
     */
    getCards() {
        return this.httpService.get('/billing/card/list/')
            .map((response: Response) => {
                return this.httpService.response(response);
            })
            .catch((error: Response) => {
                return this.httpService.catch(error);
            });
    }

    /**
     * Delete customer card
     */
    deleteCard(cardId) {
        return this.httpService.delete('/billing/card/delete/' + cardId)
            .map((response: Response) => {
                return this.httpService.response(response);
            })
            .catch((error: Response) => {
                return this.httpService.catch(error);
            });
    }

    /**
     * Get plans
     */
    getPlans() {
        return this.httpService.get('/billing/plan/')
            .map((response: Response) => {
                return this.httpService.response(response);
            })
            .catch((error: Response) => {
                return this.httpService.catch(error);
            });
    }

    /**
     * Update plan
     */
    updatePlan(id, plan) {
        return this.httpService.patch('/billing/plan/' + id, plan)
            .map((response: Response) => {
                return this.httpService.response(response);
            })
            .catch((error: Response) => {
                return this.httpService.catch(error);
            });
    }
}