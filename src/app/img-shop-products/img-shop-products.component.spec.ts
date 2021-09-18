import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgShopProductsComponent } from './img-shop-products.component';

describe('ImgShopProductsComponent', () => {
  let component: ImgShopProductsComponent;
  let fixture: ComponentFixture<ImgShopProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgShopProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgShopProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
