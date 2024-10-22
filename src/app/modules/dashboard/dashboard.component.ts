import {
  Component,
  OnDestroy,
  ViewChild,
  ElementRef,
  Renderer2,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { Store } from '@ngrx/store';
import { decryptData } from '../../utils/datahelper';
import { environment } from '../../../environments/environment';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {
  Observable,
  Subject,
<<<<<<< HEAD
  catchError,
  combineLatest,
  of,
=======
  combineLatest,
>>>>>>> 6e196c37a875af5c32bcf97bb1aa569203ca8f02
  skip,
  switchMap,
  take,
  takeLast,
  takeUntil,
} from 'rxjs';
import { getGeneralUserProgress } from '../user/actions/user.actions';
import {
  selectGeneralUserProgress,
  selectHasAccess,
} from '../user/selectors/user.selectors';
import { openModal } from '../../utils/modal';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [CommonModule, SharedModule, MatIconModule, RouterModule],
})
export default class DashboardComponent implements OnDestroy, AfterViewInit {
  @ViewChild('progressBar', { static: true }) progressBar:
    | ElementRef
    | undefined;
  fullname: string = 'fullname';
  email: string = 'email';
  private ngUnsubscribe = new Subject();
  userImage: any = '';

  constructor(
    private readonly store: Store,
    private router: Router,
    private renderer: Renderer2,
    private dialog: MatDialog
  ) {
<<<<<<< HEAD
    console.log('dashboard');
=======
>>>>>>> 6e196c37a875af5c32bcf97bb1aa569203ca8f02
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(
        'throw_data_initializer',
        'dS@%Rwey)hCd5DZKP87jkVdm'
      );

      if (localStorage?.length !== 0) {
        const dataEncripted = localStorage.getItem('token');

        if (dataEncripted) {
          const dataDecrypted = decryptData(
            JSON.parse(dataEncripted),
            environment.secretKey
          );
          this.fullname =
            dataDecrypted.userLoggedIn.name +
            ' ' +
            dataDecrypted.userLoggedIn.surname;
          this.email = dataDecrypted.userLoggedIn.email;

          this.store.dispatch(
            getGeneralUserProgress({
              id: dataDecrypted.userLoggedIn.id,
              token: dataDecrypted.token,
            })
          );
        } else {
          console.warn('localStorage is empty.');
          window.location.href = '/login';
        }
      } else {
        console.warn('localStorage is not defined.');
        window.location.href = '/login';
      }
    }
<<<<<<< HEAD
    console.log('end of constructor');
  }
  ngAfterViewInit(): void {
    console.log('after view init');
=======
  }
  ngAfterViewInit(): void {
>>>>>>> 6e196c37a875af5c32bcf97bb1aa569203ca8f02
    combineLatest([
      this.store.select(selectGeneralUserProgress),
      this.store.select(selectHasAccess),
    ])
      .pipe(
        skip(1),
        take(1),
        takeUntil(this.ngUnsubscribe),
<<<<<<< HEAD
        switchMap(([progress, hasAccess]) => {
=======
        switchMap(([progress, hasAccess]): any => {
>>>>>>> 6e196c37a875af5c32bcf97bb1aa569203ca8f02
          if (hasAccess === false) {
            openModal(
              this.dialog,
              'UPS! 😱',
              'Al parecer tu sesión ha expirado. Vuelve a iniciar sesión🙄.',
              false,
              () => {
                localStorage.clear();
                sessionStorage.clear();
                window.location.href = '/login';
              }
            );
<<<<<<< HEAD
            // No necesitamos devolver un observable aquí, ya que solo se realiza una acción
            return [];
          } else {
            console.log('progress: ', progress);
=======
          } else {
>>>>>>> 6e196c37a875af5c32bcf97bb1aa569203ca8f02
            if (progress) {
              const percentage = this.calculateProgress(progress);
              this.setUserImage(percentage);
              this.createProgressBar(percentage);
            }
<<<<<<< HEAD
            // No necesitamos devolver un observable aquí, ya que solo se realiza una acción
            return [];
          }
        }),
        // Manejo de errores
        catchError((error) => {
          console.error('Error en ngAfterViewInit:', error);
          return of([]); // Retorna un observable vacío en caso de error
        })
      )
      .subscribe(() => {
        console.log('end of after view init');
      });
=======
          }
          return {};
        })
      )
      .subscribe();
>>>>>>> 6e196c37a875af5c32bcf97bb1aa569203ca8f02
  }

  ngOnDestroy(): void {
    //this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  goToActivities() {
    window.location.href = '/activity';
  }

  onSettingsClick() {
    this.router.navigate(['/settings']);
  }

  onLogoutClick() {
    if (localStorage.length !== 0) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  }

  calculateProgress(progress: any[]): number {
    let totalLevels = 0;
    let completedLevels = 0;
    progress.forEach((activity) => {
      totalLevels += activity.total_levels;
<<<<<<< HEAD
      completedLevels += Number(activity.completed_levels);
=======
      completedLevels += activity.completed_levels;
>>>>>>> 6e196c37a875af5c32bcf97bb1aa569203ca8f02
    });
    const rawPercentage = (completedLevels / totalLevels) * 100;
    const roundedPercentage = Number(rawPercentage.toFixed(2));
    return roundedPercentage;
  }

  createProgressBar(width: number) {
    const container = this.progressBar?.nativeElement;
    container.innerHTML = '';
    const bar = this.renderer.createElement('div');
    this.renderer.addClass(bar, 'progress-bar');
    this.renderer.setStyle(bar, 'width', width + '%');

    const progressTextContainer = this.renderer.createElement('p');
    this.renderer.addClass(progressTextContainer, 'progress-text');

    const progressText = this.renderer.createText(width + '%');
    this.renderer.appendChild(progressTextContainer, progressText);

    this.renderer.appendChild(bar, progressTextContainer);

    this.renderer.appendChild(container, bar);
  }

  getTierName(tier: number): string {
    const tiers = ['Bronce', 'Plata', 'Oro', 'Diamante'];
    return (
      tiers[Math.min(Math.floor((tier - 1) / 5), tiers.length - 1)] +
      (tier % 5 || 5)
    );
  }
  setUserImage(userPercentageProgress: number) {
<<<<<<< HEAD
    console.log('percentage: ', userPercentageProgress);
=======
>>>>>>> 6e196c37a875af5c32bcf97bb1aa569203ca8f02
    if (userPercentageProgress < 0 || userPercentageProgress > 100) {
      return;
    }

    const tier = Math.floor(userPercentageProgress / 5) + 1;
    const tierName = this.getTierName(tier);
<<<<<<< HEAD
    console.log('tier: ', tierName);
=======
>>>>>>> 6e196c37a875af5c32bcf97bb1aa569203ca8f02
    this.userImage = `../../../assets/badges/badge${tierName}.png`;
  }
}
