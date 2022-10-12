import { Injectable } from '@angular/core';
import { Stock } from 'src/app/model/stock';
import { Observable } from 'rxjs';
import { of as ObservableOf } from 'rxjs';
import { throwError as ObservableThrow } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StockService {
  private stocks: Stock[];

  constructor() {
    this.stocks = [
      new Stock('Test Stock Company', 'TSC', 85, 80,'NASDAQ'),
      new Stock('Second Stock Company', 'SSC', 10, 20,'OTHER'),
      new Stock('Last Stock Company', 'LSC', 876, 765,'NYSE')];
   }
   getStocks(): Observable<Stock[]> {
    return ObservableOf(this.stocks);
   }
   createStock(stock: Stock): Observable<any> {
    let foundStock = this.stocks.find(each => each.code === stock.code);
    if(foundStock){
      return ObservableThrow({msg: 'Stock with code ' + stock.code + ' already exists'});
    }
    this.stocks.push(stock);
    return ObservableOf({msg: 'Stock with code ' + stock.code +' successfully created'});
   }
   toggleFavorite(stock: Stock): Observable<Stock>{
    let foundStock = this.stocks.find(each => each.code === stock.code);
    foundStock!.favorite= !foundStock!.favorite;
    return ObservableOf<any>(foundStock);
   }
}
