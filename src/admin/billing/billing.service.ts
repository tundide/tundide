import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { SocketService } from '../../shared/socket.service';

interface CardInterface {
    first_six_digits: string;
}

/**
 * Manage billing.
 * @module BillingService
 */
@Injectable()
export class BillingService {
    constructor(private http: HttpClient
    ) { }

    /**
     * Associate card to customer
     */
    associateCard(cardId: string) {
        return this.http.post<CardInterface>('/billing/card/associate/', { 'cardId': cardId });
    }

    /**
     * Get customer cards
     */
    getCards() {
        return this.http.get('/billing/card/list/');
    }

    /**
     * Delete customer card
     */
    deleteCard(cardId) {
        return this.http.delete('/billing/card/delete/' + cardId);
    }

    /**
     * Get plans
     */
    getPlans() {
        return this.http.get('/billing/plan/');
    }

    /**
     * Update plan
     */
    updatePlan(id, plan) {
        return this.http.patch('/billing/plan/' + id, plan);
    }
}