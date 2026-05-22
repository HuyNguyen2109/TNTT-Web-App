import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FundService } from '../../services/fund.service';

@Component({
  standalone: false,
  selector: 'app-funds-list',
  templateUrl: './funds-list.component.html',
  styleUrl: './funds-list.component.scss',
  providers: [MessageService],
})
export class FundsListComponent implements OnInit {
  service = inject(FundService);

  ngOnInit(): void {
    this.service.getAll().subscribe();
  }
}
