import { Component, inject, OnDestroy, OnInit, ViewChildren, ViewEncapsulation } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { WikipediaArticle } from '../interfaces/wikipedia.interface';
import { HttpService } from '../services/http.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { WikipediaDialogComponent } from './wikipediaDialog/wikipedia-dialog/wikipedia-dialog.component';
import { TruncatePipe } from "../pipes/truncate.pipe";
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-wikipedia',
  standalone: true,
  imports: [
    MatSortModule,
    MatSort,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    CommonModule,
    TruncatePipe,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './wikipedia.component.html',
  styleUrl: './wikipedia.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class WikipediaComponent implements OnDestroy, OnInit {
  readonly dialog = inject(MatDialog);
  private wikiService = inject(HttpService);
  private wikiArticleArray: WikipediaArticle[] = [];
  private destroy$$ = new Subject<void>();
  @ViewChildren("snippet") table!: any[];

  filterValue: FormControl = new FormControl('');
  displayedColumns: string[] = ['title', 'pageid', 'snippet', 'timestamp'];
  dataSource!: MatTableDataSource<WikipediaArticle>;

  ngOnInit(): void {
    this.wikiService.getWikipediaInfo().pipe(
      takeUntil(this.destroy$$),
      tap((data: any) => {
        this.wikiArticleArray = data.query.search;
        this.dataSource = new MatTableDataSource(this.wikiArticleArray);
      })).subscribe();


    this.filterValue.valueChanges.pipe(
      takeUntil(this.destroy$$),
    ).subscribe((value) => {
      this.dataSource = new MatTableDataSource(this.wikiArticleArray.filter((article: WikipediaArticle) =>
        article.snippet.toLowerCase().includes(value.toLowerCase()) ||
        article.title.toLowerCase().includes(value.toLowerCase()) ||
        article.timestamp.toLowerCase().includes(value.toLowerCase()) ||
        article.pageid.toString().includes(value) ||
        article.sectionsnippet?.toLowerCase().includes(value.toLowerCase()) ||
        article.sectiontitle?.toLowerCase().includes(value.toLowerCase())));
    });
  }

  ngOnDestroy(): void {
    this.destroy$$?.next();
  }

  openDialog(snippet: string) {
    const dialogRef = this.dialog.open(WikipediaDialogComponent, {
      data: {
        snippet: snippet,
      },
    });
  }
}
