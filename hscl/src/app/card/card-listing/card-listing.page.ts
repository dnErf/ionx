import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Observable, Subscription } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { CardService } from '../shared/card.service';
import { FavoriteCardStore } from '../shared/card-favorite.store';
import { LoaderService } from '../../shared/service/loader.service';
import { ToastService } from '../../shared/service/toast.service';

import { Card } from '../shared/card.model';

@Component({
  selector: 'card-listing',
  templateUrl: './card-listing.page.html',
  styleUrls: ['./card-listing.page.scss'],
})
export class CardListingPage {

  cardDeckGroup:string;
  cardDeck:string;
  cards:Card[] = [];
  cardsCopy:Card[] = [];
  favoriteCards:any = {};
  isLoading:boolean = false;
  favoriteCardSub: Subscription;

  constructor(
    private storage:Storage,
    private route:ActivatedRoute,
    private cardService:CardService,
    private favoriteCardStore:FavoriteCardStore,
    private loaderService:LoaderService,
    private toaster:ToastService,
  ) { 

    this.favoriteCardSub = this.favoriteCardStore.favoriteCards.subscribe(
      (favoriteCards:any) => {
        this.favoriteCards = favoriteCards;
      }
    )

  }

  async ionViewWillEnter() {
    this.loaderService.presentLoading();
    this.cardDeckGroup = this.route.snapshot.paramMap.get('cardDeckGroup');
    this.cardDeck = this.route.snapshot.paramMap.get('cardDeck');
    if (this.cards && this.cards.length === 0) {
      await this.getCards();
      this.cardsCopy = this.cards;
    }
  }

  ionViewDidLeave() {
    if (this.favoriteCardSub && !this.favoriteCardSub.closed) {
      this.favoriteCardSub.unsubscribe();
    }
  }

  doRefresh(event) {
    this.getCards();
    event.target.complete();
  }

  hydrateCards(cards:Card[]) {
    this.cards = cards;
    this.isLoading = false;
  }

  handleSearch() {
    this.isLoading = true;
  }

  favoriteCard(card:Card) {
    this.favoriteCardStore.toggleCard(card);
  }

  private async getCards() {

    await this.cardService
      .getCardsByDeck(this.cardDeckGroup, this.cardDeck)
      .pipe(
        take(1),
        finalize(() => this.loaderService.dismissLoading())
      )
      .subscribe(
        cards => {
          this.cards = cards.map((c) => {
            c.text = this.cardService.replaceCardTextLine(c.text);
            return c;
          });
          this.cardsCopy = Array.from(this.cards);
        }
      )

    // this.cardService.getCardsByDeck(this.cardDeckGroup, this.cardDeck)
    //   .subscribe(
    //     (cards:Card[]) => {
    //       this.cards = cards.map((card:Card) => {
    //         card.text = this.cardService.replaceCardTextLine(card.text);
    //         card.favorite = this.isCardFavorite(card.cardId);
    //         return card;
    //       });
    //       this.copyOfCards = Array.from(this.cards);
    //       this.loaderService.dismissLoading();
    //     },
    //     (err) => {
    //       this.loaderService.dismissLoading();
    //       this.toaster.presentErrorToast('card could not be loaded, try to refresh page');
    //     }
    //   )

  }
  
}
