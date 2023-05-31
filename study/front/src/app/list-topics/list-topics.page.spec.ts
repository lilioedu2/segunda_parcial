import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { MessageComponentModule } from '../message/message.module';

import { ListTopicsPage } from './list-topics.page';

describe('ListTopicsPage', () => {
  let component: ListTopicsPage;
  let fixture: ComponentFixture<ListTopicsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListTopicsPage],
      imports: [IonicModule.forRoot(), MessageComponentModule, RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ListTopicsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
