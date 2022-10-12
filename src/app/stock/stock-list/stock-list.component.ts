import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/model/stock';
import { StockService } from 'src/app/services/stock.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  //public stocks!: Stock[];
  public stocks$!: Observable<Stock[]>;

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    //this.stockService.getStocks().subscribe(stocks => {
    //this.stocks = stocks;
    this.stocks$ = this.stockService.getStocks();
  }
  onToggleFavorite(stock: Stock) {
    console.log('Favorite for stock ', stock, ' was triggered');
    this.stockService.toggleFavorite(stock);
  }
}
