import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    $(document).ready(function () {
      $('.category-card').hide().each(function (this: any, i: number) {
        $(this).delay(i * 150).fadeIn(400);
      });

      $('.job-card').on('mouseenter', function (this: any) {
        $(this).find('a').css('background-color', '#2e7d32').css('color', '#fff');
      }).on('mouseleave', function (this: any) {
        $(this).find('a').css('background-color', '').css('color', '#4caf50');
      });
    });
  }
}