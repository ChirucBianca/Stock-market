import { Component } from '@angular/core';
import { Stock } from 'src/app/model/stock';
import { StockService } from 'src/app/services/stock.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.css'],
  providers: [MessageService]
})
export class CreateStockComponent {
  public stock: Stock;
  public confirmed = false;
  public message = '';
  public exchanges = ['NYSE', 'NASDAQ', 'OTHER'];
  constructor(private stockService: StockService, public messageService: MessageService) {
    this.stock =  new Stock('', '', 0, 0, 'NASDAQ');
    this.messageService.message = 'Component Level: Hello Message Service';
  }

  setStockPrice(price:any) {
    this.stock.price = price;
    this.stock.previousPrice = price;
  }

  createStock(stockForm:any) {
    if (stockForm.valid) {
      this.stockService.createStock(this.stock).subscribe((result: any) => { 
      this.message = result.msg;
      this.stock = new Stock('', '', 0, 0, 'NASDAQ');
     }, (err) => {
      this.message = err.msg;
     });
    } else {
      console.error('Stock form is in an invalid state');
     }
   }
  }
