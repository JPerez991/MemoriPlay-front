import {
  AfterViewInit,
  Component,
  ViewChild,
  OnInit,
  Renderer2,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemoryComponent } from '../games/memory/memory.component';
import { getDataFromLocalStorage } from '../../utils/data-from-storage';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-game-launcher',
  standalone: true,
  templateUrl: './game-launcher.component.html',
  styleUrl: './game-launcher.component.css',
  imports: [CommonModule, MemoryComponent, SharedModule],
})
export default class GameLauncherComponent implements AfterViewInit, OnInit {
  @ViewChild(MemoryComponent) memoryComponent: MemoryComponent | undefined;
  levelToPlay: number = 1;
  activityName: string = '';
  activityProgressId: number = 0;
  totalMoves = 0;
  targetMoves = 0;
  points = '0';
  targetPoints: number = 500;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    const data = getDataFromLocalStorage();
    if (!data?.token) {
      if(typeof window !== 'undefined'){
        window.location.href = '/login';
      }

    }
  }

  ngAfterViewInit(): void {}

  receiveMoves(moves: any) {
    this.totalMoves = moves.totalMoves;
    this.targetMoves = moves.targetMoves;
    if (this.totalMoves > 0) {
      this.points = this.calculatePuntuation(
        this.totalMoves,
        this.targetMoves
      ).toLocaleString();
    }
  }

  calculatePuntuation(totalMoves: number, targetMoves: number): number {
    const result = (targetMoves / totalMoves) * 1000;
    return Math.ceil(result);
  }

  launchActivity(activityName: string) {
    switch (activityName) {
      case 'MEMORAMA':
        break;
      case 'ARMONÍA DEL COLOR':
        break;

      default:
        break;
    }
  }

  goToActivity() {
    window.location.href = '/activity';
  }
}
