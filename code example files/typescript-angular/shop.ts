import { Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { Router } from "@angular/router";
import { Product } from "../../core/models/product";
import { Stock } from "../../core/services/stock";
import { ProductDetails } from "../shop/productDetails";
import { ActivatedRoute } from '@angular/router';
import { User } from "../../core/interfaces/user.model";

import { AppState } from '../../core/interfaces/app.state';
import { select, Store } from '@ngrx/store';
import * as fromSharedActions from '../../core/state/actions';
import * as fromSharedSelectors from '../../core/state/selectors';
import * as fromThreadActions from '../../core/state/thread.actions';

@Component({
    selector: "shop",
    templateUrl: "shop.html",
    styleUrls: ["shop.css"]
})

export class Shop implements OnInit, OnDestroy {
    state$: Observable<AppState>;
    userstate$: Observable<User>;
    department: string;
    brand: string;
    pagenumber: number;
    p: number;
    height: string;

    constructor(private router: Router, private productDetails: ProductDetails, private stock: Stock, private currentlocation: CurrentLocation, private store: Store<AppState>, private activeroute: ActivatedRoute) {
        activeroute.params.subscribe(params => { this.id_sR = params['id_sR']; });
        this.error = false;
        activeroute.params.subscribe(params => { this.id = params['id']; });
        this.state$ = store.pipe(select(fromSharedSelectors.selectState));
        this.state$.subscribe(data => { this.department = data.department; this.brand = data.brand; this.pagenumber = data.pagenumber; this.p = data.p; this.height = data.height; });
    }


    getImageByGender(i_null: string, i_men: string, i_women: string, i_none: string) {
    	this.backgrImg = (this.selectedgender == (null || "Unisex")) ? i_null : (this.selectedgender == "Men") ? 
            i_men : (this.selectedgender == "Women") ? 
            i_women : i_none;
    }

    getSearchMode() {
    	return this.searchMode;
    }

    openSearchMode() {
    	this.searchMode = true;
        this.p_sR = 4;
    }

    getSearchArea() {
        return {
            "display": "block" 
        };
    }

    closeSearchMode() {
    	this.searchMode = false;
    }

    ngOnDestroy() {
        this.closeSearchMode();
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    onInput(e: any) {
    	this.searchMode = true;
        this.inputValue.next(e.target.value);
    }

    getFullName(id: number) {
        let imgUrl = this.getProduct(id).imageUrl2;
        let full = imgUrl.slice(24, imgUrl.length-4);
        let maxlength = 22;
        if (full.length > maxlength) {
            return full.slice(0, maxlength);
        }
        else {
            return full;
        }
    }

    getResults() {
        if (!this.searchtext) {
            return;
        }
        else {
            this.calcPages_sR();
            if (this.searchtext != undefined) {
                this.searchResults = this.stock.getProducts().filter(p => p.article.replace(' ','').toLowerCase().startsWith(this.searchtext.replace(' ','').toLowerCase()) || p.article.replace(' ','').toLowerCase() == this.searchtext.replace(' ','').toLowerCase() || p.brand.toLowerCase() == this.searchtext.toLowerCase() || p.imageUrl2.slice(24, p.imageUrl2.length-4).replace(' ','').toLowerCase().startsWith(this.searchtext.replace(' ','').toLowerCase()) || p.imageUrl2.slice(24, p.imageUrl2.length-4).replace(' ','').toLowerCase() == this.searchtext.replace(' ','').toLowerCase() || p.gender.toLowerCase() == this.searchtext.toLowerCase() || p.articleNr == this.searchtext.trim() || p.subdepartment.toLowerCase() == this.searchtext.toLowerCase() || p.department.toLowerCase() == this.searchtext.toLowerCase() ).slice(this.id1_sR, this.id2_sR);
            }
            return this.searchResults;
        }
    }

    getSpecifiedProducts(selectedgender: string = null, selecteddept: string = null, selectedbrand: string = null, selectedsort: string = null): Product[] {
        return this.getFullSortiment().filter(p => { return p.brand == selectedbrand || selectedbrand == null }).filter(p => { return p.gender == selectedgender || selectedgender == null } ).filter(p => { return p.department == selecteddept || selecteddept == null } );
    }
    
    getProduct(id: number) : Product {
        return this.getFullSortiment().find(p => p.id == id);
    }

    getSquares() {
        return this.squareImages;
    }

    getLogotypes() {
        return this.logoImages.map(i => {return this.logoUrl.concat(i).concat('.png')});
    }

    getFullSortiment() {
        return this.stock.getProducts();
    }

    onSelect(new_p : number) {
        this.setPageNumber(1);
        this.setP(Number(new_p));
        this.adjustHeight();
        this.calcPages();
    }

    adjustHeight() {
        switch(this.p) {
        case 5:
            this.setHeight("380px");
            break;
        case 10:
            this.setHeight("740px");
            break;
        case 15:
            this.setHeight("1100px");
            break;
        case 20:
            this.setHeight("1460px");
            break;
        }
    }

    setHeight(height: string) {
        this.store.dispatch(fromSharedActions.setHeight({new_height: height}));
    }

    setP(p: number) {
    	this.store.dispatch(fromSharedActions.setP({new_p: p}));
    }

    setPageNumber(nmbr: number) {
    	this.store.dispatch(fromSharedActions.setPageNumber({new_pagenumber: nmbr}));
    }

    setBrand(brnd: any) {
    	this.store.dispatch(fromSharedActions.setBrand({new_brand: brnd}));
    }

    setDepartment(dept: string) {
    	this.store.dispatch(fromSharedActions.setDepartment({new_department: dept}));
    }
    
    setShoes(answer: boolean) {
    	this.store.dispatch(fromSharedActions.setShoes({new_shoes: answer}));
    }
    
    setProductsFound(prdsfnd: number) {
    	this.store.dispatch(fromSharedActions.setProductsFound({new_productsfound: prdsfnd}));
    }

    setProductInterval(prdint: string) {
        this.store.dispatch(fromSharedActions.setProductInterval({new_productinterval: prdint }));
    }

    setCurrentState(product: Product) {
        this.store.dispatch(fromSharedActions.setState({shared: {department: product.department, pagenumber: this.pageNumber_sR}}));
    }
}